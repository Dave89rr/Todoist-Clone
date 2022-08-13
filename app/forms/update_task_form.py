from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateTimeField, BooleanField
from wtforms.validators import DataRequired, Length


class UpdateTaskForm(FlaskForm):
    id = IntegerField('id', validators=[DataRequired()])
    name = StringField('name', validators=[Length(min=1, max=30, message='Name must be between 1 and 30 characters long.')])
    ownerId = IntegerField('ownerId', validators=[DataRequired()])
    description = StringField('description', validators=[Length(min=0, max=2000, message='Description must be less than 2000 characters long.')])
    position = IntegerField('position', validators=[DataRequired()])
    priority = IntegerField('priority', validators=[DataRequired()])
    projectId = IntegerField('projectId', validators=[DataRequired()])
    due_date = StringField('due_date')
    completed = BooleanField('completed')