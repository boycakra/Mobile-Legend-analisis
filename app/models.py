import uuid
from app import db
from hashlib import sha256

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()), unique=True)
    username = db.Column(db.String(150), nullable=False, unique=True)
    email = db.Column(db.String(150), nullable=False, unique=True)
    password = db.Column(db.String(200), nullable=False)

    def __init__(self, username, email, password):
        self.id = str(uuid.uuid4())  # Automatically generate a UUID
        self.username = username
        self.email = email
        self.password = sha256(password.encode('utf-8')).hexdigest()

    def check_password(self, password):
        """Verify the provided password against the hashed password stored in the database."""
        hashed_password = sha256(password.encode('utf-8')).hexdigest()
        return self.password == hashed_password

    def __repr__(self):
        return f"<User {self.username}>"
