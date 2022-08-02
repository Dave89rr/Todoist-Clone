from flask import Blueprint
from ..models import Project

project = Blueprint("project", __name__, url_prefix='/api/projects')

@project.route('/all/<ownerId>')
def getEverything(ownerId):
    projects = Project.query.filter_by(ownerId=ownerId).all()

    data = [proj.toDict() for proj in projects]

    return {'projects': data}