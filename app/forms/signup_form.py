from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[Length(min=1, max=12, message='Username must be between 1 and 12 characters long'), username_exists])
    email = StringField('email', validators=[Length(min=1, max=40, message='Email must be valid and less than 40 characters long.'), user_exists])
    password = StringField('password', validators=[Length(min=8, max=60, message='Password must be between 8 and 60 characters long.')])
    icon_url = StringField('icon_url', validators=[DataRequired()])
    theme = BooleanField('Theme')
