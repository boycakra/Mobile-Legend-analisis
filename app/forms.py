from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField, BooleanField
from wtforms.validators import DataRequired, Length, Email, EqualTo, ValidationError
from app.models import User


class RegistrationFrom(FlaskForm):
    username = StringField('Username', 
                            validators = [DataRequired(), Length(min = 2, max = 20)])
    email = StringField('Email', 
                            validators = [DataRequired(), Email()])
    password = PasswordField('Password', 
                            validators = [DataRequired(), Length(min = 6)])
    confirm_password = PasswordField('confirm_password', 
                            validators = [DataRequired(), EqualTo('password')])
    submit = SubmitField('Sign Up')

    def validate_username(self, username):
        user = User.query.filter_by(username = username.data).first()
        
        if user:
            raise ValidationError('Username Already Taken')


    def validate_email(self, email):
        email = User.query.filter_by(username = email.data).first()
        
        if email:
            raise ValidationError(message='Email Already Taken')

class LoginFrom(FlaskForm):
    email = StringField('Email', 
                            validators = [DataRequired(), Email()])
    password = PasswordField('Password', 
                            validators = [DataRequired(), Length(min = 6)])
    remember = BooleanField('Remember me')
    submit = SubmitField('Login')