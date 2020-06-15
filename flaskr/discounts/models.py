from flaskr import db


class Discount(db.Model):
    __tablename__ = "discounts"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)

