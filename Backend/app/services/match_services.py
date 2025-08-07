from app.models.skill import Skill
from app.extensions import db

def find_user_by_skill(skillname):
    matched_skill = db.session.query(Skill).filter(Skill.name.ilike(f"{skillname}%"))/all()

    return [Skill.user for skill in matched_skill]