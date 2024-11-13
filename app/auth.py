from app.models import User
from app import db


def is_email_taken(email):
    """Check if a user with the given email already exists."""
    return db.session.query(User).filter_by(email=email).first()


def validate_register(username: str, email: str, password: str, confirm_password: str) -> list:
    """
    Validate user input before register
    return is_valid_and_errors -> list
    is_valid_and_errors[0] is boolean
    is_valid_and_errors[1] is dict error
    """

    errors: dict[str, str] = {
        "username": "",
        "email": "",
        "password": "",
        "confirm_password": ""
    }
    
    is_valid = True

    if len(username) < 3:
        is_valid = False
        errors["username"] = "username should contains atleast 3 characters"

    if is_email_taken(email):
        is_valid = False
        errors["email"] = "email already taken"

    if len(password) < 6:
        is_valid = False
        errors["password"] = "password should contains atleast 6 character"
    
    print(f"{password} != {confirm_password} = {password != confirm_password}")
    if password != confirm_password:
        is_valid = False
        errors["confirm_password"] = "confirm password did not match with password"

    return [is_valid, errors] 
