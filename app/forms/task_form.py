from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateTimeField, BooleanField
from wtforms.validators import DataRequired, Length


class TaskForm(FlaskForm):
    name = StringField('name', validators=[Length(min=1, max=500, message='Name must be between 1 and 500 characters long.')])
    ownerId = IntegerField('ownerId', validators=[DataRequired(), ])
    description = StringField('description', validators=[Length(min=0, max=2000, message='Description must be less than 2000 characters long.')])
    position = IntegerField('position', validators=[DataRequired()])
    priority = IntegerField('priority', validators=[DataRequired()])
    projectId = IntegerField('projectId', validators=[DataRequired()])
    due_date = StringField('due_date')
    completed = BooleanField('completed')