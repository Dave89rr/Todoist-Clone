from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField
from wtforms.validators import DataRequired, Length


class ProjectForm(FlaskForm):
    name = StringField('name', validators=[Length(min=1, max=50, message='Name must be between 1 and 50 characters long.')])
    ownerId = IntegerField('ownerId', validators=[DataRequired(), ])
    color = StringField('nolor', validators=[DataRequired()])
    view = BooleanField('view')