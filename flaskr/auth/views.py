import datetime

from bcrypt import checkpw
from flask import Blueprint, request, jsonify
from flaskr import jwt
from flaskr.utils.response import new_error_message, new_success_message
from flask_jwt_extended import create_access_token, get_jwt_claims

from .models import User


bp = Blueprint("auth", __name__, url_prefix="/auth")


@bp.route("/register", methods=["POST"])
def register():
    if not request.is_json:
        return new_error_message("Missing JSON in request"), 400

    req = request.json

    if not req["email"]:
        return new_error_message("Missing email parameter"), 400
    if not req["number"]:
        return new_error_message("Missing phone number parameter"), 400
    if not req["username"]:
        return new_error_message("Missing username parameter"), 400
    if not req["password"]:
        return new_error_message("Missing password parameter"), 400

    u = User(**req)
    u.save()

    return new_success_message("You have successfully registered!"), 200


@bp.route('/login', methods=["POST"])
def login():
    if not request.is_json:
        return new_error_message("Missing JSON in request"), 400

    email = request.json.get('email', None)
    password = request.json.get('password', None)

    if not email:
        return new_error_message("Missing email parameter"), 400
    if not password:
        return new_error_message("Missing password parameter"), 400

    user = User.get_one({"email": email})
    if user is None:
        return new_error_message("No user found"), 400

    try:
        checkpw(password.encode('utf8'), user.password.encode("utf8"))

        access_token = create_access_token(identity=user, expires_delta=datetime.timedelta(hours=4))
        return jsonify(access_token=access_token), 200
    except ValueError:
        return new_error_message("Bad email or password"), 400


@jwt.user_claims_loader
def add_claims_to_access_token(user):
    if isinstance(user, User):
        return {"username": user.username}
    else:
        return {"slug": user.slug}


@jwt.user_identity_loader
def user_identity_lookup(user):
    if isinstance(user, User):
        return user.username
    else:
        return user.slug


def admin_access(fn):
    def wrapper(*args, **kwargs):
        user = get_jwt_claims()
        if user["role"] != "admin":
            return new_success_message("Not allowed"), 403
        ret = fn(*args, **kwargs)
        return ret

    return wrapper
