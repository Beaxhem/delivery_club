import sqlalchemy
import json
import bcrypt

from flaskr import db, ma, admin
from flask_admin.contrib.sqla import ModelView
from marshmallow import fields
from slugify import slugify
from sqlalchemy.orm import joinedload


def create_slug(column_name):
    def default_function(context):
        if context:
            return slugify(context.current_parameters.get(column_name))

    return default_function


def hash_password(context):
    if context:
        password = context.current_parameters.get("password")
        return bcrypt.hashpw(password.encode("utf8"), bcrypt.gensalt(14)).decode("utf8")


class Company(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, unique=True, nullable=False)
    specialization = db.Column(db.String(30))
    image_id = db.Column(db.Integer, db.ForeignKey("images.id"))
    image = db.relationship("Image", lazy=True, uselist=False)
    products = db.relationship("Product",  back_populates='company', lazy="joined")
    slug = db.Column(db.String, default=create_slug("name"))
    password = db.Column(db.String, default=hash_password)
    email = db.Column(db.String)
    number = db.Column(db.String)

    @staticmethod
    def paginate(last_id, per_page=2, to_json=True):
        result = Company.query.filter(Company.id >= last_id).limit(per_page+1)

        if to_json:
            return companies_schema.jsonify(obj=result)

        return result

    @staticmethod
    def get_one(query=None, to_json=True):
        try:
            company = Company.query.filter_by(**query).options(joinedload(Company.products)).one()
        except sqlalchemy.orm.exc.NoResultFound:
            return None

        if to_json:
            return company_schema.jsonify(obj=company)

        return company

    @staticmethod
    def load(obj):
        return company_schema.loads(json.dumps(obj))

    def save(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def __init__(self, name, specialization,   password, number, email, image_id=None):
        self.name = name
        self.specialization = specialization
        self.password = bcrypt.hashpw(
            password.encode("utf8"), bcrypt.gensalt(14)
        ).decode("utf8")
        self.number = number
        self.email = email
        self.image_id = image_id

    def __repr__(self):
        return "<Company %s>" % self.name


class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(40))
    category = db.Column(db.String(40))
    price = db.Column(db.Float)
    company_id = db.Column(db.Integer, db.ForeignKey("company.id", ondelete="cascade",), nullable=True)
    company = db.relationship("Company")
    image_id = db.Column(db.Integer, db.ForeignKey("images.id"))
    image = db.relationship("Image", lazy=True, uselist=False)
    slug = db.Column(db.String, default=create_slug("title"))
    cart_item_id = db.Column(db.Integer, db.ForeignKey("cart_items.id"))

    @staticmethod
    def get_one(query=None, to_json=True):
        try:
            post = Product.query.filter_by(**query).options().one()
        except sqlalchemy.orm.exc.NoResultFound:
            return None

        if to_json:
            return product_schema.jsonify(obj=post)

        return post

    @staticmethod
    def paginate(last_id, per_page=2, to_json=True):
        result = Product.query.filter(Product.id >= last_id).limit(per_page+1)

        if to_json:
            return products_schema.jsonify(obj=result)

        return result

    @staticmethod
    def load(obj):
        return product_schema.loads(json.dumps(obj))

    def save(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def __init__(self, title, price, category, image_id, company_id):
        self.title = title
        self.price = price
        self.category = category
        self.image_id = image_id
        self.company_id = company_id

    def __repr__(self):
        return "<Product %s>" % self.title


class Image(db.Model):
    __tablename__ = "images"
    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String, nullable=False)

    def save(self):
        db.session.add(self)
        db.session.commit()

    def __init__(self, url):
        self.url = url

    def __repr__(self):
        return "<Image %s>" % self.url


class ImageSchema(ma.ModelSchema):
    class Meta:
        model = Image


class ProductSchema(ma.ModelSchema):
    image = fields.Nested(ImageSchema)

    class Meta:
        include_fk = True
        model = Product


product_schema = ProductSchema()
products_schema = ProductSchema(many=True)


class CompanySchema(ma.ModelSchema):
    products = fields.Nested(ProductSchema, many=True, exclude=("company",))
    image = fields.Nested(ImageSchema)

    class Meta:
        model = Company
        include_fk = True


company_schema = CompanySchema()
companies_schema = CompanySchema(many=True)

admin.add_view(ModelView(Company, db.session))
admin.add_view(ModelView(Product, db.session))
