from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import User


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    userId = form.data['id']
    user = User.query.filter(User.username == username).first()
    if user and userId != user.id:
        raise ValidationError('Username is already in use.')


class UpdateUserThemeForm(FlaskForm):
    id = IntegerField('id')
    username = StringField(
        'username', validators=[username_exists, Length(min=1, max=12, message='Username must be between 1 and 12 characters long')])
    email = StringField('email', validators=[Length(
        min=1, max=40, message='Email must be valid and less than 40 characters long.')])
    icon_url = StringField('icon_url', validators=[DataRequired()])
    theme = BooleanField('Theme')
