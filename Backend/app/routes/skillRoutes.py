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
        "video": save_file(request.files.get('video'), 'videos'),
        "image": save_file(request.files.get('image'), 'images'),
        "document": save_file(request.files.get('document'), 'documents')
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
    
    print("Image path",skill.image)

    # pushing to database
    db.session.add(skill)
    db.session.commit()
    return skill_Schema.dump(skill),201


# Skill Get Methods
@skill_bp.route('/GetAllSkills', methods=['GET'])
@jwt_required()
def GetSkills():
    # Its for current user only for themself
    data = Skill.query.all()
    # data = data['image'].replace("\\","/") wrong way to convert list to web friendly
    
    # Right way is to use for
    for skill in data:
        if skill.image:
            skill.image = f"/uploads/skills/{skill.image.replace('\\','/')}"
            # skill.image = f"/uploads{clean_path}"
            print("Skill Images : ",skill.image)
        if skill.video:
            skill.video = f"/uploads/skills/{skill.video.replace("\\","/")}"
            print("Skill Video : ",skill.video)
        
        if skill.document:
            skill.document = f"/uploads/skills/{skill.document.replace("\\","/")}"
            print("Skill document : ",skill.document)
            
    # data = Skill.query.all()
    return skills_Schema.dump(data) , 200


# By id
@skill_bp.route('/GetById/<int:skill_id>', methods= ['GET'])
@jwt_required()

def GetById(skill_id):
    user_id = get_jwt_identity()
    skill = Skill.query.filter_by(id=skill_id , user_id = user_id).first()
    if not skill:
        return jsonify("Skill not found"), 404
    
    return skill_Schema.dump(skill), 200

# Update Skill
@skill_bp.route('/UpdateSkill/<int:skill_id>', methods = ['PUT'])
@jwt_required()
def UpdateSkill(skill_id):
    user_id = get_jwt_identity()
    skill = Skill.query.filter_by(id = skill_id , user_id = user_id).first()

    if not skill:
        return jsonify("Skill not found"),404
    
    update_data = {
        "name" : request.form.get('name' , skill.name),
        "description" : request.form.get('description', skill.description),
        "link" : request.form.get('link', skill.link),
        "level" : request.form.get('level', skill.level)
    }

    try:
        validate_data = skill_Schema.load(update_data , partial=True)
    except ValidationError as error:
        return jsonify(error.messages),400 
    
    # Update file
    if "video" in request.files:
        skill.video = save_file(request.files.get('video'), 'videos')
    if "image" in request.files:
        skill.image = save_file(request.files.get('image'), 'images')
    if "document" in request.files:
        skill.document = save_file(request.files.get('document'), "documents")


    # Update Fields
    for key , value in validate_data.items():
        setattr(skill , key , value)
        
    db.session.commit()
    return skill_Schema.dump(skill),200

# Delete Skills
@skill_bp.route('/DeleteById/<int:skill_id>', methods=['DELETE'])
@jwt_required()
def DeleteById(skill_id):
    user_id = get_jwt_identity()
    skill = Skill.query.filter_by(id = skill_id , user_id = user_id).first()

    if not skill:
        return jsonify("Skill not found"), 404
    
    db.session.delete(skill)
    db.session.commit()
    return jsonify({"message":"Skill deleted successfuly"}),200