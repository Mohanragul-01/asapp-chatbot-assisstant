# app/models.py
from app.extensions import db
from datetime import datetime

class IncorrectPrediction(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_message = db.Column(db.Text, nullable=False)
    predicted_label = db.Column(db.String(100), nullable=False)
    correct_label = db.Column(db.String(100), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
