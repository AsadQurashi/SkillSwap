from app import createApp
from app.extensions import socketio

app = createApp()

if __name__ == "__main__":
    socketio.run(app,debug=True)


