from flask import Blueprint , request , jsonify
from app.models.session import Session
from app.extensions import db
from app.schemas.SessionSchema import SessionSchema
from flask_jwt_extended import jwt_required , get_jwt_identity

session_bp = Blueprint('session', __name__, url_prefix='/session')
create_session = SessionSchema()
list_session = SessionSchema(many=True)

# CreateSession

@session_bp.route('/CreateSession' , methods=['POST'])
@jwt_required()
def CreateSession():
    data = request.get_json()
    store_user_id = get_jwt_identity()
    data['user_id'] = store_user_id
    errors = create_session.validate(data)
    if errors:
        return jsonify(errors),400
    
    
    session = Session(**data)
    db.session.add(session)
    db.session.commit()

    return create_session.dump(session),201

# Get Session List
@session_bp.route('/GetSessionList', methods=['GET'])
@jwt_required()
def GetSessionList():
    # session = Session.query.all()
    data = get_jwt_identity()
    session = Session.query.filter_by(user_id = data).all()
    return list_session.dump(session), 200