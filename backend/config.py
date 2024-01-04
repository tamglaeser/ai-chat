import os

# Define the path to the database file
BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DB_FILE = os.path.join(BASE_DIR, 'app', 'database', 'mydatabase.db')

SECRET_KEY = 'your_secret_key_here'
DB_USERNAME = 'your_db_username'
DB_PASSWORD = 'your_db_password'
DB_HOST = 'localhost'
DB_NAME = 'your_db_name'


