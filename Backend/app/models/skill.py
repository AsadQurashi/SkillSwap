from app.extensions import db
from datetime import datetime

class Skill(db.Model):

    __tablename__ = 'skill'

    id = db.Column(db.Integer , primary_key = True)
    name = db.Column(db.String(100), nullable= False)
    description = db.Column(db.String(250))
    video = db.Column(db.String(255))
    link = db.Column(db.String(255))
    image = db.Column(db.String(255))
    document = db.Column(db.String(255))
    level = db.Column(db.String(50), default = 'Beginner') #Beginner / Intermediate / Expert

    # Admin management
    is_featured = db.Column(db.Boolean , default = False)
    status = db.Column(db.String(20) , default = "pending")
    admin_notes = db.Column(db.Text)
    featured_priority = db.Column(db.Integer , default = 0) #Sorting featured skill

    # Statistics
    view_count = db.Column(db.Integer , default = 0)
    session_count = db.Column(db.Integer , default = 0)

    # TimeStamps
    created_at = db.Column(db.DateTime , default = datetime.utcnow)
    updated_at = db.Column(db.DateTime , default = datetime.utcnow , onupdate = datetime.utcnow)

    # Getting user id by using foreign key of the given table name
    user_id = db.Column(db.Integer , db.ForeignKey('users.id'))

    # Relationship to user
    user = db.relationship('User' , back_populates= 'skills')

    def to_dict(self):
        return {
            "id" : self.id,
            "name": self.name,
            "description" : self.description,
            "video" : self.video,
            "link" : self.link,
            "image" : self.image,
            "document" : self.document,
            "level" : self.level,
            "user_id" : self.user_id,
            "user_name" : self.user.name if self.user else None,
            "is_featured" : self.is_featured,
            "status" : self.status,
            "view_count" : self.view_count,
            "session_count" : self.session_count,
            "created_at" : self.created_at.isoformat() if self.created_at else None,
            "updated_at" : self.updated_at.isoformat() if self.updated_at else None
        }
    
    @classmethod
    def get_approved(cls):
        """Get all approved skills"""
        return cls.query.filter_by(status="approved").all()
    
    @classmethod
    def get_pending(cls):
        """Get all pending skills"""
        return cls.query.filter_by(status="pending").all()
    
    @classmethod
    def get_by_user(cls, user_id):
        """Get all skills for a specific user"""
        return cls.query.filter_by(user_id = user_id).all()
    
    @classmethod
    def get_featured(cls):
        """Get all featured and approved skills"""
        return cls.query.filter_by(is_featured = True , status = "approved").all()
    
    def approve(self):
        """Approve this skill"""
        self.status = 'approved'
        db.session.commit()

    def reject(self, notes=None):
        """Reject this skill with optional notes"""
        self.status = 'rejected'
        if notes:
            self.admin_notes = notes
        db.session.commit()

    def increment_views(self):
        """Increment view count by 1"""
        self.view_count += 1
        db.session.commit()

    def __repr__(self):
        return f"<Skill {self.id}: {self.name} by User {self.user_id}>"