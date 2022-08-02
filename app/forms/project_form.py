from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField
from wtforms.validators import DataRequired, Length


class ProjectForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired(), Length(min=1, max=50, message='Name must be between 1 and 50 characters long.')])
    ownerId = IntegerField('ownerId', validators=[DataRequired(), ])
    color = StringField('Color', validators=[DataRequired(), Length(min=1,max=15, message='Color must be between 1 and 15 characters long.')])
    view = BooleanField('View', validators=[DataRequired()])