from flask import request
from flask_socketio import join_room , leave_room , emit
from flask_jwt_extended import decode_token

def init_socket_handlers(socketio):

    # Join room
    @socketio.on("join")
    def handle_join(data):
        """
        Client sends { token } (JWT). We decode to get user id (identity).
        Then server adds the socket to room "user_<id>" so we can emit to that user.
        """
        token = data.get("token")
        if not token:
            return
        try :
            payload = decode_token(token)
            user_id = payload.get("sub")
        except Exception as e:
            print("Socket join decode failed", e)
            return

        join_room(f"user_{user_id}")
        emit("joined",{"user_id" : user_id}, room=request.sid)

        # Leave room
        @socketio.on("leave")
        def handle_leave(data):
            user_id = data.get("user_id")
            if user_id:
                leave_room(f"user_{user_id}")

        # Disconnet Socket
        @socketio.on("disconnect")
        def handle_disconnet(data):
            print("Socket disconnected :", request.sid)