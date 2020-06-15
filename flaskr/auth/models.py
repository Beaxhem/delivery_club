import uuid
import bcrypt

from flaskr import db
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm.exc import NoResultFound


def generate_uuid():
    return str(uuid.uuid4())


class User(db.Model):
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=generate_uuid)
    email = db.Column(db.String, nullable=False)
    number = db.Column(db.String, unique=True, nullable=False)
    username = db.Column(db.String, unique=True, nullable=False)
    password = db.Column(db.String, nullable=False)

    @staticmethod
    def get_one(query):
        try:
            u = User.query.filter_by(**query).one()
        except NoResultFound:
            return None

        return u

    def save(self):
        db.session.add(self)
        db.session.commit()

    def __init__(self, email, number, username, password):
        self.email = email
        self.username = username
        self.number = number
        self.password = bcrypt.hashpw(
            password.encode("utf8"), bcrypt.gensalt(14)
        ).decode("utf8")

    def __repr__(self):
        return "<User %s>" % self.username
