from flask import Blueprint, request, jsonify, session
from app.utils.predictor import generate_response

# chatbot_routes.py
chatbot_bp = Blueprint('chatbot_bp', __name__, url_prefix='/api/chat')



@chatbot_bp.route('/', methods=['POST'])
def chat():
    data = request.get_json()
    user_message = data.get('message')

    # Get or initialize conversation context from session
    conversation_context = session.get('conversation_context', {})
    
    # Use the ML model for prediction with context
    result = generate_response(user_message, conversation_context)
    
    # Update session with new context
    session['conversation_context'] = result['conversation_context']
    
    return jsonify({
        "user_message": user_message,
        "predicted_label": result['top1_class'],
        "predicted_confidence": result['top1_score'],
        "bot_response": result['response_text'],
        "all_predictions": result['all_predictions'],
        "options_to_show": result['options_to_show'],
        "conversation_context": result['conversation_context']
    })
