

# from flask import Flask, request, jsonify
# from flask_cors import CORS
# from model.predict import predict_fire_occurrence

# app = Flask(__name__)
# CORS(app)

# @app.route('/predict', methods=['POST'])
# def predict():
#     data = request.get_json()
#     temperature = data['temperature']
#     humidity = data['humidity']
#     wind_speed = data['windSpeed']
#     rainfall = data['rainfall']

#     prediction = predict_fire_occurrence(temperature, humidity, wind_speed, rainfall)
#     return jsonify({'prediction': prediction})

# if __name__ == '__main__':
#     app.run(host='0.0.0.0', port=5001, debug=True)
    




from flask import Flask, request, jsonify
from flask_cors import CORS
from model.predict import predict_fire_occurrence
import os

app = Flask(__name__)
CORS(app)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    temperature = data['temperature']
    humidity = data['humidity']
    wind_speed = data['windSpeed']
    rainfall = data['rainfall']

    prediction = predict_fire_occurrence(temperature, humidity, wind_speed, rainfall)
    return jsonify({'prediction': prediction})


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=int(os.environ.get('PORT', 5001)))
    

