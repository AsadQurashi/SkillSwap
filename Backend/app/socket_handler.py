# from flask import request
# from flask_socketio import join_room , leave_room , emit
# from flask_jwt_extended import decode_token

# def init_socket_handlers(socketio):

#     # Join room
#     @socketio.on("join")
#     def handle_join(data):
#         """
#         Client sends { token } (JWT). We decode to get user id (identity).
#         Then server adds the socket to room "user_<id>" so we can emit to that user.
#         """
#         token = data.get("token")
#         if not token:
#             return
#         try :
#             payload = decode_token(token)
#             user_id = payload.get("sub")
#         except Exception as e:
#             print("Socket join decode failed", e)
#             return

#         join_room(f"user_{user_id}")
#         print(f"✅ user {user_id} joined room {user_id}")
#         emit("joined",{"user_id" : user_id}, room=request.sid)

#     # Leave room
#     @socketio.on("leave")
#     def handle_leave(data):
#         user_id = data.get("user_id")
#         if user_id:
#             leave_room(f"user_{user_id}")
#             print(f"👋 User {user_id} left room {user_id}")

#     # Disconnet Socket
#     @socketio.on("disconnect")
#     def handle_disconnet(data):
#         print("⚠️ Socket disconnected:", request.sid)

from flask import request
from flask_socketio import join_room, leave_room, emit
from flask_jwt_extended import decode_token

# Global dictionary to track sockets per user
connected_users = {}  # { user_id: set(socket_ids) }

def init_socket_handlers(socketio):

    # Join room
    @socketio.on("join")
    def handle_join(data):
        token = data.get("token")
        if not token:
            return
        try:
            payload = decode_token(token)
            user_id = payload.get("sub")
            if not user_id:
                return
        except Exception as e:
            print("Socket join decode failed:", e)
            return

        # Track socket
        if user_id not in connected_users:
            connected_users[user_id] = set()
        connected_users[user_id].add(request.sid)

        # Join a room per user
        join_room(f"user_{user_id}")
        print(f"✅ user {user_id} joined room | sockets: {connected_users[user_id]}")
        
        # Confirm to the client
        emit("joined", {"user_id": user_id}, room=request.sid)

    # Leave room manually
    @socketio.on("leave")
    def handle_leave(data):
        user_id = data.get("user_id")
        if user_id and user_id in connected_users:
            leave_room(f"user_{user_id}")
            connected_users[user_id].discard(request.sid)
            if not connected_users[user_id]:
                del connected_users[user_id]
            print(f"👋 User {user_id} left room | remaining sockets: {connected_users.get(user_id, set())}")

    # Disconnect socket
    @socketio.on("disconnect")
    def handle_disconnect():
        # Remove this socket from any user's socket list
        for user_id, sockets in list(connected_users.items()):
            if request.sid in sockets:
                sockets.discard(request.sid)
                if not sockets:
                    del connected_users[user_id]
                print(f"⚠️ Socket disconnected for user {user_id} | remaining sockets: {connected_users.get(user_id, set())}")
