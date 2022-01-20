from flask import Flask, request, jsonify, render_template, current_app
import util
import pickle
import pandas as pd

app = Flask(__name__)


@app.route('/get_location_names')
def get_location_names():
    util.load_saved_artifacts()
    response = jsonify({
        'locations': util.get_location_names()
    })

    response.headers.add('Access-Control-Allow-Origin', '*')

    return response


@app.route('/predict_home_price', methods=['POST'])
def predict_home_price():

    total_sqft = int(request.form['total_sqft'])
    location = request.form['location']
    bhk = int(request.form['bhk'])
    bath = int(request.form['bath'])

    util.load_saved_artifacts()

    response = jsonify({
        'estimated_price': util.get_estimated_price(location, total_sqft, bhk, bath)
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response




if __name__ == "__main__":
    # print(get_location_names())
    app.run(debug=True)