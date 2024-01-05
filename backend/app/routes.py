from flask import jsonify, request
from app import app, db
from app.models import User, Chat
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, unset_jwt_cookies
from google.oauth2 import id_token
from google.auth.transport import requests
import string
import random
import uuid

@app.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()

    # Return fetched users as JSON
    return jsonify({'users': users})

@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')

    if not name or not email or not password:
        return jsonify({'message': 'Name, email, and password are required'}), 400

    # Check if the user already exists
    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({'message': 'Email already exists'}), 400

    # Create a new user
    new_user = User(name=name, email=email, password=password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'Signup successful'}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')


    if not email or not password:
        return jsonify({'message': 'Email and password are required'}), 400

    user = User.query.filter_by(email=email, password=password).first()
    if not user:
        return jsonify({'message': 'Invalid email or password'}), 401

    token = create_access_token(identity=user.id)
    return jsonify({'token': token}), 200

@app.route('/login-with-google', methods=['POST'])
def login_with_google():
    token = request.json.get('tokenId')
    try:
        # Verify Google OAuth token
        idinfo = id_token.verify_oauth2_token(token, requests.Request(), app.config['GOOGLE_CLIENT_ID'])

        # Extract user information from verified token
        user_email = idinfo.get('email')
        user_id = idinfo.get('sub')  # 'sub' is the unique user ID in Google

        # Generate JWT for the authenticated user
        access_token = create_access_token(identity=user_email)  # Adjust identity as needed

        return jsonify({'access_token': access_token}), 200
    except Exception as e:
        return jsonify({'message': 'Token verification failed'}), 401

@app.route('/logout', methods=['POST'])
def logout():
    resp = jsonify({'logout': True})
    unset_jwt_cookies(resp)
    return resp, 200

@app.route('/respond', methods=['POST'])
def respond():
    data = request.json
    question = data.get('inputText')

    bot_response = ''.join(random.choices(string.ascii_letters + string.digits, k=200))
    return jsonify({'userQuestion': question, 'botResponse': bot_response})

@app.route('/create-chat', methods=['POST'])
def create_chat():
    data = request.json
    messages = data.get('messages')
    new_uuid = uuid.uuid4()

    # Check if the chat already exists
    existing_chat = Chat.query.filter_by(thread=messages).first()
    if existing_chat:
        return jsonify({'message': 'Chat thread already exists'}), 400

    new_chat = Chat(thread=messages, share_id=str(new_uuid), share_url=f'http://localhost:3000/chat/share/{new_uuid}')  # Assuming 'messages' is a list

    # Add the new chat to the session
    db.session.add(new_chat)
    db.session.commit()

    return jsonify({ 'chat': new_chat.as_dict() }), 200

@app.route('/chat/<uuid>', methods=['GET'])
@jwt_required()
def get_chat_by_uuid(uuid):
    chat = Chat.query.filter_by(share_id=uuid).first()
    if chat:
        return jsonify({ 'chat': chat.as_dict() })
    return jsonify({'message': 'Chat not found'}), 404
