from flask import Flask, request, jsonify
import pickle
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load model and label encoder
try:
    with open("12th_future_pred.pkl", "rb") as f:
        model = pickle.load(f)
    with open("label_encoder.pkl", "rb") as f:
        label_encoder = pickle.load(f)
except FileNotFoundError:
    print("Error: Model or Label Encoder file not found.")

# Detect expected feature size
try:
    expected_features = model.n_features_in_
except AttributeError:
    expected_features = 24  # fallback (standard size for this quiz type)

@app.route("/predict", methods=["POST"])
def predict():
    try:
        # Use force=True to handle potential missing Content-Type header on client
        data = request.get_json(force=True, silent=True) 

        if data is None:
            return jsonify({"error": "Invalid or empty JSON body received."}), 400

        # ✅ CRITICAL CORRECTION: Expect 'answers' key to match Quiz12.jsx
        if "answers" not in data:
            return jsonify({"error": "Missing 'answers' key in request body. Expected 'answers' as a list."}), 400

        answers = data["answers"]

        if not isinstance(answers, list) or len(answers) == 0:
            return jsonify({"error": "Invalid or empty 'answers' list. Expected a list of numbers (0s and 1s)."}), 400

        # Convert to numpy array
        answers = np.array(answers, dtype=float)

        # Adjust input safely (padding or truncating)
        if len(answers) > expected_features:
            answers = answers[:expected_features]
        elif len(answers) < expected_features:
            answers = np.pad(answers, (0, expected_features - len(answers)))

        # Predict
        prediction = model.predict([answers])[0]
        career = label_encoder.inverse_transform([prediction])[0]

        # Send back the 'career' key as expected by Quiz12.jsx
        return jsonify({"career": career})

    except Exception as e:
        print("❌ Server Error:", str(e))
        return jsonify({"error": f"Internal server error: {str(e)}"}), 500


if __name__ == "__main__":
    app.run(debug=True, host='127.0.0.1', port=5000)