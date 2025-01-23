import joblib
import numpy as np
import os


model_path = os.path.join(os.path.dirname(__file__), 'forest_fire_model.pkl')
model = joblib.load(model_path)

def predict_fire_occurrence(temperature, humidity, wind_speed, rainfall):
    input_data = np.array([[temperature, humidity, wind_speed, rainfall]])
    prediction = model.predict(input_data)
    return int(prediction[0])  