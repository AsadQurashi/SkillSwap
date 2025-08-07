from flask import Flask
from app.config import Config
from app.extensions import db , ms , jwt
from app.routes.authRoutes import auth_bp
from app.routes.skillRoutes import skill_bp
from app.routes.SessionRoutes import session_bp
from flask_cors  import CORS


def createApp():
    app = Flask(__name__)
    CORS(app) #this allows all origin by default
    app.config.from_object(Config)
    db.init_app(app)
    ms.init_app(app)
    jwt.init_app(app)


    # with app.app_context():
    #     db.create_all()
    #     print("Databse is created")

    # Register all Routes
    app.register_blueprint(auth_bp)
    app.register_blueprint(skill_bp)
    app.register_blueprint(session_bp)
    return app