from flask import Blueprint , request , jsonify
from app.models.skill import Skill
from app.extensions import db
from app.schemas.SkillSchema import SkillSchema
from flask_jwt_extended import jwt_required , get_jwt_identity

skill_bp = Blueprint('Skill', __name__ , url_prefix='/Skill')
skill_Schema = SkillSchema()
skills_Schema = SkillSchema(many=True) #For list or more than one data

# Skill Post Method
@skill_bp.route('/PostSkill', methods=['POST'])
@jwt_required() #Decorator/ Required jwt token
def SkillPostMehtod():
    data = request.get_json()
    fetch_user_id = get_jwt_identity()
    data['user_id'] = fetch_user_id

    errors = skill_Schema.validate(data)
    if errors:
        return jsonify(errors),400
    
    
    
    # Adding to database after validation
    skill = Skill(name = data['name'] , level = data.get('level'), user_id = fetch_user_id)

    # pushing to database
    db.session.add(skill)
    db.session.commit()
    return skill_Schema.dump(skill),201


# Skill Get Method
@skill_bp.route('/GetSkills', methods=['GET'])
@jwt_required()
def GetSkills():
    # Its for current user only for themself
    stored_user_id = get_jwt_identity()
    data = Skill.query.filter_by(user_id=stored_user_id).all()

    # data = Skill.query.all()
    return skills_Schema.dump(data) , 200
