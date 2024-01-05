from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from config import SQLALCHEMY_DATABASE_URI, SQLALCHEMY_TRACK_MODIFICATIONS, JWT_SECRET_KEY, GOOGLE_CLIENT_ID

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = SQLALCHEMY_DATABASE_URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = SQLALCHEMY_TRACK_MODIFICATIONS
app.config['JWT_SECRET_KEY'] = JWT_SECRET_KEY
app.config['GOOGLE_CLIENT_ID'] = GOOGLE_CLIENT_ID

db = SQLAlchemy(app)
CORS(app)
jwt = JWTManager(app)

from app import routes

# Import models after db is defined
from app.models import User, Chat

# Create tables
with app.app_context():
    db.create_all()