import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
import joblib


data = pd.read_csv('../data/historical_data.csv')


features = data[['temperature', 'humidity', 'wind_speed', 'rainfall']]
labels = data['fire_occurrence']


X_train, X_test, y_train, y_test = train_test_split(features, labels, test_size=0.2, random_state=42)


model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)


joblib.dump(model, 'forest_fire_model.pkl')