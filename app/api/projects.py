from flask import Blueprint, request
from ..forms import ProjectForm
from ..models import db, Project

project = Blueprint("project", __name__, url_prefix='/api/projects')

@project.route('/all/<ownerId>')
def getEverything(ownerId):
    projects = Project.query.filter_by(ownerId=ownerId).all()

    data = [proj.toDict() for proj in projects]

    return {'projects': data}

@project.route('/create', methods=['POST'])
def create():
    form = ProjectForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    # if form.validate_on_submit():
    data = request.json
    newProject = Project(
        ownerId=data['ownerId'],
        name=data['name'],
        color=data['color'],
        view=data['view']
        # ownerId=form.data['ownerId'],
        # name=form.data['name'],
        # color=form.data['color'],
        # view=form.data['view']
    )
    db.session.add(newProject)
    db.session.commit()
    return newProject.toDict()
    # return 400


@project.route('/update', methods=['PATCH'])
def update():
    data = request.json
    project = Project.query.get(data['id'])

    project.ownerId = data['ownerId']
    project.name = data['name']
    project.color = data['color']
    project.view = data['view']

    db.session.commit()
    return project.toDict()

@project.route('/delete', methods=['DELETE'])
def delete():
    data = request.json
    Project.query.filter_by(id=data['id']).delete()
    db.session.commit()
    return data
