from flask import jsonify


class Json:
    def to_json(self):
        return jsonify(self.__dict__)


class SuccessMessage(Json):
    def __init__(self, message, **kwargs):
        self.ok = True
        self.message = message
        self.data = kwargs


class ErrorMessage(Json):
    def __init__(self, message):
        self.ok = False
        self.message = message
