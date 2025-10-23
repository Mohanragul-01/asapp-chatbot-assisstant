from flask import Blueprint, request, jsonify
from app import db
from app.models import IncorrectPrediction
from app.utils.predictor import generate_response

feedback_bp = Blueprint('feedback_bp', __name__, url_prefix='/api/feedback')

@feedback_bp.route('/report_incorrect', methods=['POST'])
def report_incorrect():
    data = request.get_json()
    incorrect = IncorrectPrediction(
        user_message=data.get('user_message'),
        predicted_label=data.get('predicted_label'),
        correct_label=data.get('correct_label')
    )
    db.session.add(incorrect)
    db.session.commit()
    return jsonify({"message": "Feedback recorded successfully"}), 201

@feedback_bp.route('/get_response', methods=['POST'])
def get_response():
    data = request.get_json()
    user_message = data.get("message")
    result = generate_response(user_message)
    return jsonify(result), 200
