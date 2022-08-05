from flask import Blueprint, request
from ..forms import SignUpForm
from .auth_routes import validation_errors_to_error_messages
from ..models import db, User

user = Blueprint("user", __name__, url_prefix='/api/users')

@user.route('/update-theme', methods=['PATCH'])
def update():
    data = request.json
    # form['csrf_token'].data = request.cookies['csrf_token']
    # if form.validate_on_submit():
    print('**************************')
    print('**************************')
    print('**************************')
    print('**************************')
    print('**************************')
    print('**************************')
    print(bool(data['theme']))
    user = User.query.get(data['id'])
    user.username = data['username']
    user.email = data['email']
    user.theme = bool(data['theme'])
    user.icon_url = data['icon_url']
    db.session.commit()
    return user.to_dict()
    # return {'errors': validation_errors_to_error_messages(form.errors)}, 400