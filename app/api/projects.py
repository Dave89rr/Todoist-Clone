from flask import Blueprint, request
from ..forms import ProjectForm
from ..models import db, Project
from .auth_routes import validation_errors_to_error_messages

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
    if form.validate_on_submit():
        newProject = Project(
            ownerId=form.data['ownerId'],
            name=form.data['name'],
            color=form.data['color'],
            view=form.data['view']
        )
        db.session.add(newProject)
        db.session.commit()
        return newProject.toDict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@project.route('/update', methods=['PATCH'])
def update():
    form = ProjectForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        project = Project.query.get(form.data['id'])
        project.ownerId = form.data['ownerId']
        project.name = form.data['name']
        project.color = form.data['color']
        project.view = form.data['view']
        db.session.commit()
        return project.toDict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

@project.route('/delete', methods=['DELETE'])
def delete():
    data = request.json
    Project.query.filter_by(id=data['id']).delete()
    db.session.commit()
    return data
