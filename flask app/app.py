from flask import Flask, jsonify, request
from flask_uploads import UploadSet, configure_uploads, IMAGES
from flask_cors import CORS, cross_origin
from flask_pymongo import PyMongo

import os
app = Flask(__name__)
cors = CORS(app)

app.config['CORS_HEADERS'] = 'Content-Type'
photos = UploadSet('photos', IMAGES)

#specifying temporary location to save timetable photos
app.config['UPLOADED_PHOTOS_DEST'] = 'static/img'
configure_uploads(app, photos)


@app.route('/')
@cross_origin()
def main():
    return 'There is someone behind Inf1n8.....'


@app.route('/upload', methods=['POST'])
@cross_origin()
def upload():
    print('hi')
    print(os.getcwd())
    filename = photos.save(request.files['timetable'])     
    return 'Uploaded successfully'


    

if __name__ == '__main__':
    app.run()
