from turtle import color
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
    return 400