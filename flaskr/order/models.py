import json
import datetime

from flaskr import db, ma
from flaskr.companies.models import ProductSchema
from marshmallow import fields


class Order(db.Model):
    __tablename__ = "orders"

    id = db.Column(db.Integer, primary_key=True)
    number = db.Column(db.String)
    address = db.Column(db.String)
    comment = db.Column(db.String)
    name = db.Column(db.String)
    email = db.Column(db.String)
    items = db.relationship("CartItem")
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    def __init__(self, name, email, number, address, comment, items):
        self.name = name
        self.email = email
        self.number = number
        self.address = address
        self.comment = comment
        self.items = items

    @staticmethod
    def get_all():
        return orders_schema.jsonify(Order.query.all())

    @staticmethod
    def load(obj):
        return order_schema.loads(json.dumps(obj))

    def save(self):
        db.session.add(self)
        db.session.commit()


class CartItem(db.Model):
    __tablename__ = "cart_items"
    id = db.Column(db.Integer, primary_key=True)
    qty = db.Column(db.Integer)
    item = db.relationship("Product", uselist=False)

    order_id = db.Column(db.Integer, db.ForeignKey("orders.id"))

    def __init__(self, qty, item):
        self.qty = qty
        self.item = item


class CartItemSchema(ma.ModelSchema):
    class Meta:
        model = CartItem

    item = fields.Nested(ProductSchema)


class OrderSchema(ma.ModelSchema):
    class Meta:
        model = Order

    items = fields.Nested(CartItemSchema, many=True)


order_schema = OrderSchema()
orders_schema = OrderSchema(many=True)
