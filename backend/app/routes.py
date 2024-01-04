from flask import Blueprint, jsonify, request
import jwt
import secrets
import string
import sqlite3
from config import DB_FILE

main_routes = Blueprint('main', __name__)

# Generate a random string of 32 characters using ascii_letters and digits
secret_key = ''.join(secrets.choice(string.ascii_letters + string.digits) for _ in range(32))

@main_routes.route('/users', methods=['GET'])
def get_users():
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()

    # Query to fetch all users
    query = 'SELECT * FROM users;'
    cursor.execute(query)
    users = cursor.fetchall()

    cursor.close()
    conn.close()

    # Return fetched users as JSON
    return jsonify({'users': users})

@main_routes.route('/signup', methods=['POST'])
def signup():
    data = request.json
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')

    if not name or not email or not password:
        return jsonify({'message': 'Name, email, and password are required'}), 400

    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()

    # Query to fetch all users
    check_query = 'SELECT id FROM users WHERE email = ?;'
    cursor.execute(check_query, (email,))
    existing_user = cursor.fetchone()

    if existing_user:
        cursor.close()
        conn.close()
        return jsonify({'message': 'Email already exists'}), 400

    # Insert new user
    insert_query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?);'
    cursor.execute(insert_query, (name, email, password))
    conn.commit()

    cursor.close()
    conn.close()

    return jsonify({'message': 'Signup successful'}), 201

@main_routes.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')


    if not email or not password:
        return jsonify({'message': 'Email and password are required'}), 400


    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()

    # Query to fetch all users
    query = 'SELECT id FROM users WHERE email = ? AND password = ?;'
    cursor.execute(query, (email, password))
    user = cursor.fetchone()

    cursor.close()
    conn.close()


    # Validate the login credentials
    if user:
        payload = {'email': email}

        # Generate a JWT token
        token = jwt.encode(payload, secret_key, algorithm='HS256')

        # Return a success message if the login is successful
        return jsonify({'token': token}), 200
    else:
        # Return an error message if the login is unsuccessful
        return jsonify({'message': 'Invalid credentials'}), 401