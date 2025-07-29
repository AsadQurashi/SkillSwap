from flask import Blueprint , request , jsonify
from app.models.user import User
from app.extensions import db
from werkzeug.security import check_password_hash
from app.schemas.UserSchema import UserSchema
from flask_jwt_extended import create_access_token

auth_bp = Blueprint('auth', __name__ , url_prefix='/auth')
user_schema = UserSchema()

# SignUp Function
@auth_bp.route('/SignUp', methods=['POST'])
def SignUp():
    data = request.get_json() #get data from frontend in json format
    error = user_schema.validate(data) #validate data from Schema(Marshmallow)
    if error:
        return jsonify(error),400
    
    # Check if Email already exist
    if User.query.filter_by(email = data['email']).first():
        return jsonify({"message" : "Email already exist"}),409
    
    # Send data to Databse
    user = User(name = data['name'], email = data['email'])
    user.setPassword(data['password'])

    # Now add user in Database
    db.session.add(user)
    db.session.commit()

    return user_schema.dump(user), 201

# Signin Route
@auth_bp.route('/SignIn', methods=['POST'])
def SignIn():
    data = request.get_json()
    user = User.query.filter_by(email = data.get('email')).first()

    if user and check_password_hash(user.password_hash, data['password']):
        access_token = create_access_token(identity= str(user.id))
        return jsonify(message="Login successfully", access_token = access_token),200
    return jsonify({"message": "Invalid credentials"}),401

