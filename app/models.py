import uuid
from app import db
from hashlib import sha256
from datetime import datetime


class User(db.Model):
    __tablename__ = "users"

    id = db.Column(
        db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()), unique=True
    )
    username = db.Column(db.String(150), nullable=False, unique=True)
    email = db.Column(db.String(150), nullable=False, unique=True)
    password = db.Column(db.String(200), nullable=False)

    def __init__(self, username, email, password):
        self.id = str(uuid.uuid4())  # Automatically generate a UUID
        self.username = username
        self.email = email
        self.password = sha256(password.encode("utf-8")).hexdigest()

    def check_password(self, password):
        """Verify the provided password against the hashed password stored in the database."""
        hashed_password = sha256(password.encode("utf-8")).hexdigest()
        return self.password == hashed_password

    def __repr__(self):
        return f"<User {self.username}>"


class TokenBlockList(db.Model):
    __tablename__ = "token_block_list"

    id = db.Column(db.Integer(), primary_key=True)
    jti = db.Column(db.String(), nullable=False)
    created_at = db.Column(db.DateTime(), default=datetime.now())

    def __init__(self, jti) -> None:
        self.jti = jti

    def __repr__(self) -> str:
        return f"<Token {self.jti}>"

    def save(self):
        try:
            db.session.add(self)
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            print(f"Error saving token to database: {e}")
