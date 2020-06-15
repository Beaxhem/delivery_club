import os
import time

from flask import Blueprint, request, current_app
from flaskr.companies.models import Image
from flaskr.utils.other import allowed_file
from flaskr.utils.response import new_error_message, new_success_message


bp = Blueprint("Upload", __name__)


@bp.route('/upload', methods=["POST"])
def upload():
    if request.method == 'POST':
        if 'file' not in request.files:
            return new_error_message("No file"), 400

        file = request.files['file']

        if file.filename == '':
            return new_error_message('No selected file')

        if file and allowed_file(file.filename):
            ext = file.filename.split(".")[-1]
            filename = str(time.time_ns()) + "." + ext

            directory = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
            file.save(directory)

            url = "/static/" + filename

            image = Image(url=url)
            image.save()

            return new_success_message("Successfully uploaded", id=image.id)
