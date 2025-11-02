# create_admin.py
import sys
import os

# Add this to fix import issues
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app import createApp
from app.extensions import db
from app.models.user import User

def create_admin():
    app = createApp()
    
    with app.app_context():
        # Check if admin already exists
        existing_admin = User.query.filter_by(email='admin@gmail.com').first()
        
        if existing_admin:
            print("⚠️  Admin user already exists!")
            print(f"📧 Email: {existing_admin.email}")
            print(f"🎯 Role: {existing_admin.role}")
            return
        
        # Create new admin user
        admin = User(
            name='Super Admin',
            email='admin@skillswap.com',
            role='super_admin'
        )
        admin.setPassword('admin123')
        
        db.session.add(admin)
        db.session.commit()
        
        print("✅ Super Admin created successfully!")
        print("📧 Email: admin@skillswap.com")
        print("🔑 Password: admin123")
        print("🎯 Role: super_admin")
        print("💡 You can now login to the admin dashboard!")

if __name__ == "__main__":
    create_admin()