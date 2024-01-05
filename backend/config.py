import os

# Define the path to the database file
BASE_DIR = os.path.abspath(os.path.dirname(__file__))
SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(BASE_DIR, 'app', 'database', 'mydatabase.db')
SQLALCHEMY_TRACK_MODIFICATIONS = False

JWT_SECRET_KEY = 'your_secret_key'
DB_USERNAME = 'your_db_username'
DB_PASSWORD = 'your_db_password'
DB_HOST = 'localhost'
DB_NAME = 'your_db_name'


