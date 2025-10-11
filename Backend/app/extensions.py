from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_jwt_extended import JWTManager
from flask_socketio import SocketIO

db = SQLAlchemy()
ms = Marshmallow()
jwt = JWTManager()
socketio = SocketIO(cors_allowed_origins="*" , logger=False , engineio_logger=False)
