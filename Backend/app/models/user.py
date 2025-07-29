from app.extensions import db
from werkzeug.security import generate_password_hash , check_password_hash

class User(db.Model):

    # assigning Table name for accessing table attributes
    __tablename__ = 'users'

    id = db.Column(db.Integer , primary_key = True)
    name = db.Column(db.String(64), nullable = False)
    email = db.Column(db.String(128), unique = True, nullable = False)
    password_hash = db.Column(db.String(512), nullable = False)

    # Relational attributes
    skills = db.relationship('Skill' , backref = 'user' , lazy = True )
    sessions = db.relationship('Session' , backref='user' , lazy = True)

    def setPassword(self , password):
        self.password_hash = generate_password_hash(password)

    def checkPassword(self , password):
        return check_password_hash(self.password_hash , password)
    
    def __repr__(self):
        return f"<User {self.id} - {self.email}"