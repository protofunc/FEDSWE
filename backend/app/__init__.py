from flask import Flask
from config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_login import LoginManager
from flask_moment import Moment
from flask_cors import CORS

# Init packages
login = LoginManager()
db = SQLAlchemy()
migrate = Migrate()
moment = Moment()

# Create app
def create_app():
    # Init app
    app = Flask(__name__)
    
    # Config link
    app.config.from_object(Config)

    # Register packages
    login.init_app(app)
    db.init_app(app)
    migrate.init_app(app, db)
    moment.init_app(app)

    # Add CORS support
    CORS(app, resources={r'/api/*': {'origins': 'http://localhost:3000'}})

    # Import blueprints
    from app.blueprints.api import api

    # Register blueprints
    app.register_blueprint(api)

    return app
