from app import db, login
from flask_login import UserMixin # Only use UserMixin for the User Model
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash

'''User table'''
class User(UserMixin, db.Model):
    # attributes
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False)
    password = db.Column(db.String)
    created_on = db.Column(db.DateTime, default=datetime.utcnow)

    # hashes our password
    def hash_password(self, original_password):
        return generate_password_hash(original_password)

    # checks the hashed password
    def check_hash_password(self, login_password):
        return check_password_hash(self.password, login_password)
    
    # register user attributes
    def from_dict(self, data):
        self.username = data['username']
        self.password = self.hash_password(data['password'])

    # update user attributes without prompting for password
    def update_dict(self, data):
        self.username = data['username']
    
    # save the user to db
    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    # update user in db
    def update_to_db(self):
        db.session.commit()

    # delete from db
    def delete_user(self):
        db.session.delete(self)
        db.session.commit()

'''Load user'''
@login.user_loader
def load_user(user_id):
    return User.query.get(user_id)