from app.extensions import db
from werkzeug.security import generate_password_hash , check_password_hash
from datetime import datetime

class User(db.Model):

    # assigning Table name for accessing table attributes
    __tablename__ = 'users'

    id = db.Column(db.Integer , primary_key = True)
    name = db.Column(db.String(64), nullable = False)
    email = db.Column(db.String(128), unique = True, nullable = False)
    password_hash = db.Column(db.String(512), nullable = False)
    # For role admin/user
    role = db.Column(db.String(20), nullable = False , default = 'user')
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime , default = datetime.utcnow)
    last_login = db.Column(db.DateTime)

    # Relational attributes
    skills = db.relationship('Skill' , back_populates = 'user' , lazy = True )
    # sessions = db.relationship('Session' , backref='user' , lazy = True)
    requester_sessions = db.relationship("Session", back_populates="requester", foreign_keys="Session.requester_id")
    reciever_sessions = db.relationship("Session", back_populates="reciever", foreign_keys= "Session.reciever_id")
    admin_actions = db.relationship("AdminLog" ,back_populates="admin", foreign_keys="AdminLog.admin_id" )

    # referenced in Report model
    # There was error of backref by mistakenly creating again backref in user model as one is created in report model
    # reports_made = db.relationship("Report" , foreign_keys='Report.reporter_id' , backref='reporter')
    # reports_against = db.relationship('Report', foreign_keys='Report.reported_user_id', backref='reported_user')

    # COMPUTED PROPERTIES

    @property
    def skills_count(self):
        return len(self.skills)
    
    @property
    def sessions_count(self):
        return len(self.requester_sessions) + len(self.reciever_sessions)
    
    @property 
    def reports_made_count(self):
        return len(self.reports_made)
    
    @property
    def reports_against_count(self):
        return len(self.reports_against)
    
    def setPassword(self , password):
        self.password_hash = generate_password_hash(password)
        
    def checkPassword(self , password):
        return check_password_hash(self.password_hash , password)
    
    def is_admin(self):
        return self.role in ['admin' , 'super_admin']
    
    def is_super_admin(self):
        return self.role == "super_admin"
    
    def __repr__(self):
        return f"<User {self.id} - {self.email} - {self.role}>"