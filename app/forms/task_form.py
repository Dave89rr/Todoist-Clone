from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateTimeField, BooleanField
from wtforms.validators import DataRequired, Length


class TaskForm(FlaskForm):
    name = StringField('name', validators=[Length(min=1, max=30, message='Name must be between 1 and 30 characters long.')])
    ownerId = IntegerField('ownerId', validators=[DataRequired(), ])
    description = StringField('description')
    position = IntegerField('position', validators=[DataRequired()])
    priority = IntegerField('priority', validators=[DataRequired()])
    projectId = IntegerField('projectId', validators=[DataRequired()])
    due_date = StringField('due_date')
    completed = BooleanField('completed')