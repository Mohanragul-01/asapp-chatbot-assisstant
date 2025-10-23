import os

class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv(
        "DATABASE_URL",
        "postgresql://postgres:1234@localhost:5432/support_bot"
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False
