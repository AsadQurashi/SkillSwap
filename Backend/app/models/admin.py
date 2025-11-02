from app.extensions import db
from datetime import datetime

class AdminLog(db.Model):
    __tablename__="adminlogs"

    id = db.Column(db.Integer , primary_key=True )
    admin_id = db.Column(db.Integer , db.ForeignKey("users.id"), nullable = False)
    action = db.Column(db.String(255), nullable = False)
    resource_type = db.Column(db.String(255) , nullable = False)
    resource_id = db.Column(db.Integer)
    details = db.Column(db.Text)
    ip_address = db.Column(db.String(45))
    created_at = db.Column(db.DateTime , default = datetime.utcnow)

    # RelationShip
    admin = db.relationship("User" , back_populates = "admin_actions" , foreign_keys=[admin_id])