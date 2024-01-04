from flask import Flask
from flask_cors import CORS
import sqlite3
from config import DB_FILE

def create_app():
    app = Flask(__name__)

    CORS(app)  # Allow all origins for simplicity; adjust to your needs in production

    # Configuration settings (can be loaded from config.py)
    app.config['SECRET_KEY'] = 'your_secret_key_here'

    # Database creation function
    def create_db():
        conn = sqlite3.connect(DB_FILE)
        cursor = conn.cursor()

        # SQL create users table
        create_users_table_query = '''
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY,
                name CHAR(25) NOT NULL,
                email VARCHAR(255) NOT NULL,
                password CHAR(25) NOT NULL
            );
        '''

        # SQL create chats table
        create_chats_table_query = '''
            CREATE TABLE IF NOT EXISTS chats (
                id INTEGER PRIMARY KEY,
                messages JSON
            );
        '''
        cursor.execute(create_users_table_query)
        cursor.execute(create_chats_table_query)
        conn.commit()

        cursor.close()
        conn.close()

    # Call the create_db function to initialize the database when the app starts
    create_db()

    # Register blueprints or import routes here
    from app.routes import main_routes
    app.register_blueprint(main_routes)

    return app


