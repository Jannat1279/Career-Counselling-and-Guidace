from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np
import pandas as pd

app = Flask(__name__)
CORS(app)


try:
    with open("10th_pred.pkl", "rb") as f:
        model_10th = pickle.load(f)
    
    
    feature_names = model_10th.feature_names_in_

    with open("label_encoder.pkl", "rb") as f:
        label_encoder = pickle.load(f)

except (FileNotFoundError, AttributeError) as e:
    print(f"Error loading model or encoder: {e}")
    model_10th = None
    feature_names = None
    label_encoder = None

@app.route("/predict", methods=["POST", "OPTIONS"])
def predict():
    if request.method == "OPTIONS":
        response = app.make_response(('', 204))
        response.headers["Access-Control-Allow-Origin"] = request.headers.get("Origin", "*")
        response.headers["Access-Control-Allow-Methods"] = "POST, OPTIONS"
        response.headers["Access-Control-Allow-Headers"] = request.headers.get("Access-Control-Request-Headers", "*")
        response.headers["Access-Control-Max-Age"] = "86400"
        return response
    
    if model_10th is None or feature_names is None or label_encoder is None:
        return jsonify({"error": "Model or encoder not loaded. Check server logs."}), 500

    try:
        data = request.get_json()
        if not data or "features" not in data or not isinstance(data["features"], list):
            return jsonify({"error": "Invalid request body. Expected 'features' as a list."}), 400
        
        # Check if the number of features matches
        if len(data["features"]) != len(feature_names):
             return jsonify({"error": f"Input features count mismatch. Expected {len(feature_names)}, got {len(data['features'])}."}), 400

        # Create a DataFrame with correct column names
        features_df = pd.DataFrame([data["features"]], columns=feature_names)

        # Make the numerical prediction
        numerical_prediction = model_10th.predict(features_df)
        
        # Use the label encoder to convert the number back to a career string
        # The .inverse_transform() method is used for this conversion
        recommended_career = label_encoder.inverse_transform(numerical_prediction)[0]
        
        return jsonify({"recommendation": str(recommended_career)})
    
    except Exception as e:
        return jsonify({"error": f"Prediction failed due to an internal server error: {str(e)}"}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5001)