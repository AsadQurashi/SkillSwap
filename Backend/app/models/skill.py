from app.extensions import db

class Skill(db.Model):

    __tablename__ = 'skill'

    id = db.Column(db.Integer , primary_key = True)
    name = db.Column(db.String(100), nullable= False)
    level = db.Column(db.String(50), default = 'Beginner') #Beginner / Intermediate / Expert

    # Getting user id by using foreign key of the given table name
    user_id = db.Column(db.Integer , db.ForeignKey('users.id'))

    # Relationship to user
    user = db.relationship('User' , back_populates= 'skills')