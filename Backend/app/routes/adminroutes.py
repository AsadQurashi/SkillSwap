from flask import Blueprint , request , jsonify
from app.extensions import db
from app.models.user import User
from app.schemas.UserSchema import UserSchema
from flask_jwt_extended import jwt_required , get_jwt_identity

admin_route_bp = Blueprint('/Admin' , __name__, url_prefix='/Admin')
user_schema = UserSchema()
@jwt_required(optional=True)
def create_admin():
    data = request.get_json()
    errors = user_schema.validate(data)

    if errors:
        return jsonify(errors),400
    
    if User.query.filter_by(email= data['email']).first():
        return jsonify({"message":"email already exist"}),409
    
    exist_admin = User.query.filter_by(role = 'admin').first()

    if exist_admin:
        current_user = User.query.get(get_jwt_identity())

    if not current_user or current_user.role != 'admin':
        return jsonify({"message":" Unauhorized - Admin only"}),403
    
    new_admin = User(
        name = data['name'],
        email = data['email'],
        role = data['admin']
    )

    new_admin.setPassword(data['password'])

    db.session.add(new_admin)
    db.session.commit()

    return jsonify({"mesasge" : "Admin created successfully"}), 201