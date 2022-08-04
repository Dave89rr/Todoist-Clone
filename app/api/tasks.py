from flask import Blueprint, request
from ..models import db, Task
from ..forms import TaskForm
from .auth_routes import validation_errors_to_error_messages
from datetime import datetime

task = Blueprint("task", __name__, url_prefix='/api/tasks')

@task.route('/all/<ownerId>')
def getEverything(ownerId):
    tasks = Task.query.filter_by(ownerId=ownerId).all()

    data = [task.toDict() for task in tasks]

    return {'tasks': data}

@task.route('/create', methods=['POST'])
def create():
    form = TaskForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    due_date = datetime.strptime(form.data['due_date'], '%Y-%m-%dT%H:%M:%S')
    if form.validate_on_submit():
        newtask = Task(
            ownerId=form.data['ownerId'],
            name=form.data['name'],
            description=form.data['description'],
            position=form.data['position'],
            projectId=form.data['projectId'],
            priority=form.data['priority'],
            due_date=due_date,
        )
        db.session.add(newtask)
        db.session.commit()
        return newtask.toDict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400



@task.route('/update', methods=['PATCH'])
def update():
    form = TaskForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        task = Task.query.get(form.data['id'])
        task.ownerId = form.data['ownerId'],
        task.name = form.data['name'],
        task.description = form.data['description'],
        task.position = form.data['position'],
        task.projectId = form.data['projectId'],
        task.priority = form.data['priority'],
        task.due_date = form.data['due_date'],
        db.session.commit()
        return task.toDict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

@task.route('/delete', methods=['DELETE'])
def delete():
    data = request.json
    Task.query.filter_by(id=data['id']).delete()
    db.session.commit()
    return data
