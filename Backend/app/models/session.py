from app.extensions import db
from datetime import datetime

class Session(db.Model):
    __tablename__ = 'session'

    id = db.Column(db.Integer , primary_key = True)
    skillName = db.Column(db.String(64) , nullable = False)
    scheduleTime = db.Column(db.DateTime , nullable = False , default = datetime.utcnow)
    status = db.Column(db.String(20) , default = 'pending')

    user_id = db.Column(db.Integer , db.ForeignKey('users.id'), nullable = False)