from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY') 
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'  # or other DB config
db = SQLAlchemy(app)

from app import routes  # Ensure you import your routes after initializing app and db
