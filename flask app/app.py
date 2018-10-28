from flask import Flask, jsonify, request, session, send_file
from flask_uploads import UploadSet, configure_uploads, IMAGES
from flask_cors import CORS, cross_origin

import os
import time

app = Flask(__name__)
cors = CORS(app)

app.config['CORS_HEADERS'] = 'Content-Type'
photos = UploadSet('photos', IMAGES)

#specifying temporary location to save timetable photos
app.config['UPLOADED_PHOTOS_DEST'] = 'static/img'

app.secret_key = 'supposed to be a secret'

global file_to_retrieve

configure_uploads(app, photos)


@app.route('/')
@cross_origin()
def main():
    return 'There is someone behind Inf1n8.....'


@app.route('/upload', methods=['POST'])
@cross_origin()
def upload():

        print('hi')
        all_image = os.listdir('static/img/')
        for image in all_image:
            os.unlink('static/img/'+image)
        file = photos.save(request.files['timetable'], name="example_{}.png".format(time.time()))
        return 'Uploaded successfully'


@app.route('/download/')
@cross_origin()
def download():

    all_images_dwn = os.listdir('static/img/')[0]
    print(all_images_dwn)
    return send_file('static/img/{}'.format(all_images_dwn), as_attachment=True)


    

if __name__ == '__main__':
    app.run()
