from app.extensions import db
from datetime import datetime

class Report(db.Model):
    __tablename__ = "reports"
    id = db.Column(db.Integer , primary_key = True)
    reporter_id = db.Column(db.Integer , db.ForeignKey("users.id"), nullable = False)
    reported_user_id = db.Column(db.Integer , db.ForeignKey("users.id") , nullable= False)
    reported_skill_id = db.Column(db.Integer, db.ForeignKey("skill.id") , nullable = False)
    report_type = db.Column(db.String(50) , nullable = False) #scam , inappropriate , spam etc
    description = db.Column(db.Text , nullable = False)
    status = db.Column(db.String(20) , default = "pending") # pending , rejected , resolved , 
    admin_notes = db.Column(db.Text)
    resolved_by = db.Column(db.Integer , db.ForeignKey("users.id"))
    resolved_at = db.Column(db.DateTime)
    created_at = db.Column(db.DateTime, default = datetime.utcnow)

    # RelationShip
    reporter = db.relationship("User" , foreign_keys=[reporter_id] , backref="reports_made")
    reported_user = db.relationship("User" , foreign_keys = [reported_user_id] , backref = "reports_against")

    # SkillRelationShip
    reported_skill = db.relationship("Skill" , backref = "reports")
    resolver = db.relationship("User" , foreign_keys = [resolved_by])
