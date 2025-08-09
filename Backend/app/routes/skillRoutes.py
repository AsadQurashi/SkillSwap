from flask import Blueprint , request , jsonify
from app.models.skill import Skill
from app.extensions import db
from app.schemas.SkillSchema import SkillSchema
from flask_jwt_extended import jwt_required , get_jwt_identity
from app.utils.Utils_Save import save_file
from marshmallow import ValidationError

skill_bp = Blueprint('Skill', __name__ , url_prefix='/Skill')
skill_Schema = SkillSchema()
skills_Schema = SkillSchema(many=True) #For list or more than one data

# Skill Post Method
@skill_bp.route('/PostSkill', methods=['POST'])
@jwt_required() #Decorator/ Required jwt token
def SkillPostMehtod():
    # data = request.get_json()  ignoring this because now we getting form different type of data
    user_id = get_jwt_identity()
    print(f"Received request from user ID: {user_id}")  # Debugging
    if not user_id:
            return jsonify({"error": "Invalid user ID in token"}), 400

    form_data={
        "name" : request.form.get("name"),
        "description" : request.form.get("description"),
        "link" : request.form.get("link"),
        "level" : request.form.get("level"),
        "user_id" : user_id
    }

    print("Form data being validated:", form_data)  # Debug

    # errors = skill_Schema.validate(form_data)
    # if errors:
    #     return jsonify(errors),400
    
    # insteaed this we using try except
    try:
        validate_data = skill_Schema.load(form_data)
        print("Validated data:", validate_data)  # Debug successful validation
    except ValidationError as err:
        print("Validation errors:", err.messages)  # Debug validation failures
        return jsonify(err.messages),400

    file_path = {
        "video" : save_file(request.files.get("video") , "videos"),
        "image" : save_file(request.files.get("image") , "images"),
        "document" : save_file(request.files.get("document") , "documents")
    }
    # Adding to database after validation
    skill = Skill(name = validate_data['name'],
                description =validate_data.get('description'),
                link = validate_data.get('link'),
                level = validate_data.get('level'),
                video = file_path['video'],
                image = file_path['image'],
                document = file_path['document'],
                user_id = user_id)

    # pushing to database
    db.session.add(skill)
    db.session.commit()
    return skill_Schema.dump(skill),201


# Skill Get Methods
@skill_bp.route('/GetAllSkills', methods=['GET'])
@jwt_required()
def GetSkills():
    # Its for current user only for themself
    stored_user_id = get_jwt_identity()
    data = Skill.query.filter_by(user_id=stored_user_id).all()

    # data = Skill.query.all()
    return skills_Schema.dump(data) , 200


# By id
@skill_bp.route('/GetBtId', methods= ['GET'])
@jwt_required()

def GetById():
     pass