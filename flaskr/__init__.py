import click
import os

from flask import Flask
from flask.cli import with_appcontext
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_jwt_extended import JWTManager
from flask_admin import Admin
from flask_cors import CORS
from flask_migrate import Migrate


db = SQLAlchemy()
ma = Marshmallow()
jwt = JWTManager()
admin = Admin()
cors = CORS()
migrate = Migrate(db=db)

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', "webp"}


def create_app():
    app = Flask(__name__)

    app.config.from_mapping(
        # default secret that should be overridden in environ or config
        SECRET_KEY=os.environ.get("SECRET_KEY", "dev"),
        SQLALCHEMY_DATABASE_URI="postgres://ilya:b1a0EPy8@localhost/delivery_club",
        SQLALCHEMY_TRACK_MODIFICATIONS=False,
        CORS_HEADERS="Content-Type",
        STATIC_URL="",
        STATIC_FOLDER="/static",
        UPLOAD_FOLDER=os.path.join(app.root_path, "static")
    )

    db.init_app(app)
    ma.init_app(app)
    jwt.init_app(app)
    admin.init_app(app)
    cors.init_app(app)
    migrate.init_app(app)
    app.cli.add_command(init_db_command)

    from flaskr import auth, companies, upload, order

    app.register_blueprint(auth.bp)
    app.register_blueprint(companies.product_bp)
    app.register_blueprint(companies.company_bp)
    app.register_blueprint(upload.bp)
    app.register_blueprint(order.bp)

    return app


def init_db():
    db.drop_all()
    db.create_all()


@click.command("init_db")
@with_appcontext
def init_db_command():
    init_db()
    click.echo("Initialized the database.")

