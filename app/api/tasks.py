from flask import Blueprint, request
from ..models import db, Task
from ..forms import TaskForm
from .auth_routes import validation_errors_to_error_messages


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
    if form.validate_on_submit():
    # data = request.json
        newtask = Task(
            ownerId=form.data['ownerId'],
            name=form.data['name'],
            description=form.data['description'],
            position=form.data['position'],
            projectId=form.data['projectId'],
            priority=form.data['priority'],
            due_date=form.data['due_date'],
            # ownerId=form.data['ownerId'],
            # name=form.data['name'],
            # color=form.data['color'],
            # view=form.data['view']
        )
        db.session.add(newtask)
        db.session.commit()
        return newtask.toDict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400



@task.route('/update', methods=['PATCH'])
def update():
    data = request.json
    print('************************')
    print('************************')
    print('************************')
    print(data)
    task = Task.query.get(data['id'])

    task.ownerId = data['ownerId'],
    task.name = data['name'],
    task.description = data['description'],
    task.position = data['position'],
    task.projectId = data['projectId'],
    task.priority = data['priority'],
    task.due_date = data['due_date'],

    db.session.commit()
    return task.toDict()

@task.route('/delete', methods=['DELETE'])
def delete():
    data = request.json
    Task.query.filter_by(id=data['id']).delete()
    db.session.commit()
    return data
