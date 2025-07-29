from app import createApp
from app.extensions import db
from app.models.session import Session
from app.models.skill import Skill
from app.models.user import User

app = createApp()

if __name__ == "__main__":
    app.run(debug=True)


