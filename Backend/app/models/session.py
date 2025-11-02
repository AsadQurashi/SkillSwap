from app.extensions import db
from datetime import datetime
from sqlalchemy import or_

class Session(db.Model):
    __tablename__ = 'session'

    id = db.Column(db.Integer , primary_key = True)
    skillName = db.Column(db.String(64) , nullable = False)
    scheduleTime = db.Column(db.DateTime , nullable = False , default = datetime.utcnow)
    status = db.Column(db.String(20) , default = 'pending')
    requester_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable = False)
    reciever_id = db.Column(db.Integer , db.ForeignKey('users.id'), nullable = False)
    # RelationShip
    requester = db.relationship("User", back_populates="requester_sessions" , foreign_keys=[requester_id])
    reciever = db.relationship("User", back_populates="reciever_sessions", foreign_keys=[reciever_id])

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        """
        Flexible initialization.
        Allows creating a Session with a dictionary (e.g., from request.json).
        Default values handled here if not passed.
        """
        if "status" not in kwargs:
            self.status = "pending"
        
    def to_dict(self):
        return{
            "id" : self.id,
            "name" : self.skillName,
            "scheduleTime" : self.scheduleTime.isoformat() if self.scheduleTime else None,
            "status": self.status,
            "requester_id" : self.requester_id,
            "reciever_id" : self.reciever_id
        }
    
    @classmethod
    def get_by_user(cls, user_id):
        """Get all sessions where user is either requester or receiver"""
        return cls.query.filter(or_(cls.requester_id == user_id , cls.reciever_id==user_id)).all()
    
    @classmethod
    def get_pending(cls):
        """Get all pending sessions"""
        return cls.query.filter_by(status="pending").all()
    
    def update_status(self , new_status):
        """Update session status safely"""
        self.status = new_status
        db.session.commit()

    
    def __repr__(self):
        return f"<Session id={self.id} skill={self.skillName} status={self.status}>"

    