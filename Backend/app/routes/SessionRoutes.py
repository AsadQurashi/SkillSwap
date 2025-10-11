from flask import Blueprint , request , jsonify
from app.models.session import Session
from app.extensions import db , socketio
from app.schemas.SessionSchema import SessionSchema
from flask_jwt_extended import jwt_required , get_jwt_identity
from sqlalchemy import or_


session_bp = Blueprint('session', __name__, url_prefix='/session')
create_session = SessionSchema()
list_session = SessionSchema(many=True)

# CreateSession

@session_bp.route('/CreateSession' , methods=['POST'])
@jwt_required()
def CreateSession():
    data = request.get_json() or {}
    store_user_id = get_jwt_identity()

    print("JWT identity:", store_user_id)
    print("Incoming data:", data)
    # data['requester_id'] = store_user_id
    errors = create_session.validate(data)
    if errors:
        return jsonify(errors),400
    
    session = Session( **data, requester_id=store_user_id)
    db.session.add(session)
    db.session.commit()

    # --- NEW: real-time notify the receiver ---
    try:
        payload = create_session.dump(session)
        # emit only to receiver's room
        socketio.emit("new_session", payload, room=f"user{session.reciever_id}")
    
    except Exception as e:
        print("Socket emit failed : ",e)
    # ------------------------------------------

    return create_session.dump(session),201

# Response session

@session_bp.route("/ResponseSession/<int:session_id>" , methods=['POST'])
@jwt_required()
def ResponseSession(session_id):
    user_id = int(get_jwt_identity())
    data = request.get_json() or {}
    action = data.get('action') #accept | reject


    if action not in ['accept' , 'reject']:
        return jsonify({"error":"Invalid action"}),400
    
    session = Session.query.get_or_404(session_id)
    
    if session.reciever_id != user_id:
        return jsonify({"error":"Only reciever can respond"}),403

    if session.status != 'pending':
        return({"error":"Session already responded"}), 400
    
    new_status = 'accept' if action == 'accept' else 'reject'
    session.update_status(new_status)

    return jsonify({"message":f"Session {new_status}", "session" : create_session.dump(session)}),200


# Get Session List
@session_bp.route('/GetSessionList', methods=['GET'])
@jwt_required()
def GetSessionList():
    # session = Session.query.all()
    user_id = get_jwt_identity()
    # sessions = Session.query.filter(
    #     or_(
    #         Session.requester_id == user_id,
    #         Session.reciever_id == user_id
    #     )
    # ).all()
    sessions = Session.get_by_user(user_id)
    return list_session.dump(sessions), 200


# Update Session Status
@session_bp.route("/UpdateSession/<int:session_id>", methods=['POST'])
@jwt_required()
def UpdateSession(session_id):
    user_id = get_jwt_identity()

    session = Session.query.get_or_404(session_id)

    # Only requester or reciever can update
    if user_id not in [session.reciever_id , session.requester_id]:
        return jsonify({"error": "Not authorized"}),403
    
    if session.status != 'accept':
        return({"error":"Only accepted sessions can be completed"}), 400
    

    session.update_status("complete")
    return jsonify({"message":f"Status update to completed" , "session": create_session.dump(session)}),200