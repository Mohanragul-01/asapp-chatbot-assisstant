from flask import Flask
from flask_cors import CORS
from app.extensions import db, migrate
from app.models import IncorrectPrediction
import os
from app.routes.chatbot_routes import chatbot_bp
from app.routes.feedback_routes import feedback_bp
def create_app():
    app = Flask(__name__)

    # Use your environment variable DATABASE_URL if set, otherwise fallback
    app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get(
        'DATABASE_URL',
        'postgresql://postgres:1234@localhost:5432/support_bot'
    )
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    # Configure session
    app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'dev-secret-key-change-in-production')
    
    # Configure CORS to support sessions
    CORS(app, supports_credentials=True)

    db.init_app(app)
    migrate.init_app(app, db)
    app.register_blueprint(chatbot_bp)
    app.register_blueprint(feedback_bp)

    # Default test route
    @app.route('/')
    def home():
        return {"message": "Airline Support Bot Backend is running!"}

    return app

app = create_app()

if __name__ == '__main__':
    app.run(debug=True)
