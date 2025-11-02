from flask import Blueprint , request , jsonify
from app.models.user import User
from app.extensions import db
from werkzeug.security import check_password_hash
from app.schemas.UserSchema import UserSchema
from flask_jwt_extended import create_access_token
from sqlalchemy.exc import SQLAlchemyError



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
    
    # # Check role
    # role = data.get('role' , 'user')
    
    # Send data to Databse
    user = User(name = data['name'], email = data['email'] , role = 'user')
    user.setPassword(data['password'])

    # Now add user in Database
    db.session.add(user)
    db.session.commit()

    return user_schema.dump(user), 201

# Signin Route
@auth_bp.route('/SignIn', methods=['POST'])
def SignIn():
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')

        
        if not email or not password:
            return jsonify({"message":"Email and password are required"}),400
        try:
            user = User.query.filter_by(email=email).first()

        except SQLAlchemyError as db_err:
            return jsonify({"message":"Database error ","error":str(db_err)}),500
        if not user:
            return jsonify({"message": "User dosen't exist"}),404

        if not check_password_hash(user.password_hash, password):
            return jsonify({"message":"Password is incorrect"}),401
        
        access_token = create_access_token(identity= str(user.id))
        return jsonify({"message":"Login successfully",
                        "access_token" : access_token ,
                        'user': {
                            "id" : user.id,
                            "name": user.name,
                            "email":user.email,
                            "role":user.role
                            }
                        }),200
    except Exception as e:
        return jsonify({"message": "An unexpected error occured ", "error":str(e)}),500

