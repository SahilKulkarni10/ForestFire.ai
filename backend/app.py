# from flask import Flask, request, jsonify
# from model.predict import predict_fire_occurrence

# app = Flask(__name__)

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
#     app.run(debug=True)



import os
from flask import Flask, request, jsonify
from model.predict import predict_fire_occurrence

app = Flask(__name__)

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
    port = int(os.environ.get('PORT', 5000)) 
    app.run(host='0.0.0.0', port=port, debug=False)  