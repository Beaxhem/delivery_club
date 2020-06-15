import datetime

from bcrypt import checkpw
from flask import Blueprint, request
from flaskr.companies.models import Product, Company
from flaskr.utils.response import new_error_message, new_success_message
from flask_jwt_extended import create_access_token


company_bp = Blueprint("companies", __name__, url_prefix="/companies")
product_bp = Blueprint("products", __name__, url_prefix="/products")


@company_bp.route('/new', methods=["POST"])
def create_company():
    json = request.json

    company = Company.load(json)
    company.save()

    return new_success_message("New company was successfully created")


@company_bp.route('/')
def get_companies():
    last_id = request.args.get("last_id", 0)
    per_page = int(request.args.get("per_page", 2))

    companies = Company.paginate(last_id=last_id, per_page=per_page)

    return companies


@company_bp.route("/company/<slug>")
def get_company(slug):

    product = Company.get_one(query={"slug": slug}, to_json=True)
    if product is None:
        return new_error_message("Not found"), 404
    return product


@company_bp.route("/login", methods=["POST"])
def login():
    if not request.is_json:
        return new_error_message("Missing JSON in request"), 400

    email = request.json.get('email', None)
    password = request.json.get('password', None)

    if not email:
        return new_error_message("Missing email parameter"), 400
    if not password:
        return new_error_message("Missing password parameter"), 400

    user = Company.get_one({"email": email}, to_json=False)
    if user is None:
        return new_error_message("No user found"), 400

    try:
        checkpw(password.encode('utf8'), user.password.encode("utf8"))
    except ValueError:
        return new_error_message("Bad email or password"), 400

    access_token = create_access_token(identity=user, expires_delta=datetime.timedelta(hours=4))
    return new_success_message("You have successfully logged in", access_token=access_token), 200


@product_bp.route("/")
def get_products():
    last_id = request.args.get("last_id", 0)
    products = Product.paginate(last_id=last_id)

    return products


@product_bp.route("/new", methods=["POST"])
def create_product():
    content = request.json

    product = Product.load(content)
    product.save()

    return new_success_message("New product has been successfully created")
