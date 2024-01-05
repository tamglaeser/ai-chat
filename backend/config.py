import os

# Define the path to the database file
BASE_DIR = os.path.abspath(os.path.dirname(__file__))
SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(BASE_DIR, 'app', 'database', 'mydatabase.db')
SQLALCHEMY_TRACK_MODIFICATIONS = False

JWT_SECRET_KEY = 'your_secret_key'
GOOGLE_CLIENT_ID = '667185241621-egahaca17p5707g8790ld8d794toh16v.apps.googleusercontent.com'
DB_USERNAME = 'your_db_username'
DB_PASSWORD = 'your_db_password'
DB_HOST = 'localhost'
DB_NAME = 'your_db_name'


