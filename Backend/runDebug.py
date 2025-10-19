from app import createApp
from app.extensions import socketio

app = createApp()

if __name__ == "__main__":
    socketio.run(app,
                host="127.0.0.1",
                debug=True,
                )


