from flask import Flask
from app.config import Config
from app.extensions import db , ms , jwt , socketio
from app.routes.authRoutes import auth_bp
from app.routes.skillRoutes import skill_bp
from app.routes.SessionRoutes import session_bp
from app.routes.adminroutes import admin_bp
from flask_cors  import CORS
from app.socket_handler import init_socket_handlers

# 
from flask import send_from_directory
import os



def createApp():
    app = Flask(__name__)
    CORS(app) #this allows all origin by default
    app.config.from_object(Config)
    db.init_app(app)
    ms.init_app(app)
    jwt.init_app(app)
    socketio.init_app(app)

    # initialize socket
    init_socket_handlers(socketio)

    @app.route('/uploads/skills/<path:filename>')
    def uploaded_file(filename):
        uploads_path = os.path.join(app.root_path, '..', 'uploads', 'skills')
        return send_from_directory(os.path.abspath(uploads_path), filename)

    with app.app_context():
        db.create_all()
        print("Databse is created")

    # Register all Routes
    app.register_blueprint(auth_bp)
    app.register_blueprint(skill_bp)
    app.register_blueprint(session_bp)
    app.register_blueprint(admin_bp)

    
    return app