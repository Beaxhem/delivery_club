from flask import Blueprint, request
from flaskr.utils.response import new_success_message
from .models import Order


bp = Blueprint("orders", __name__, url_prefix="/orders")


@bp.route("/create", methods=["POST"])
def create():
    json = request.json

    order = Order.load(json)
    order.save()

    return new_success_message("New order has been successfully created!")


@bp.route("/get_all")
def get_all():
    orders = Order.get_all()
    return orders
