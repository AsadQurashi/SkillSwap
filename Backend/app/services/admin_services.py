from app.extensions import db
from app.models.admin import AdminLog
from app.models.reportmodel import Report
from app.models.session import Session
from app.models.skill import Skill
from app.models.user import User
from datetime import datetime , timedelta
from sqlalchemy import func , extract

class AdminServices:
    
    @staticmethod
    def log_admin_action(admin_id , action , resource_type=None , resource_id = None , details = None , ip_address = None):
        """Log admin actions for audit trail"""
        log = AdminLog(
            admin_id = admin_id,
            action = action,
            resource_type = resource_type,
            resource_id = resource_id,
            details = details,
            ip_address = ip_address
        )
        db.session.add(log)
        db.session.commit()
    
    # Dashboard stats
    @staticmethod
    def get_dashboard_stats():
        """Get dashboard statistics"""
        total_users = User.query.count()
        total_skills = Skill.query.count()
        total_sessions = Session.query.count()
        pending_skills = Skill.query.filter_by(status="pending").count()
        pending_reports = Report.query.filter_by(status="pending").count()

        # Active user today
        today = datetime.utcnow().date()
        active_user_today = User.query.filter(User.last_login>= today).count()

        # Peak hours calculation (last 7 days)
        week_ago = datetime.utcnow() - timedelta(days=7)
        hourly_active = db.session.query(
            extract('hour' , User.last_login).label("hour"),
            func.count(User.id).label('count')).filter(
                User.last_login >= week_ago).group_by('hour').all()
        peak_hours = {str(hour) : count for hour , count in hourly_active }

        return {
            "total_users" : total_users,
            "total_skills" : total_skills,
            "total_sessions" : total_sessions,
            "pending_skills" : pending_skills,
            "pending_reports" : pending_reports,
            "active_user_today" : active_user_today,
            "peak_hours" : peak_hours
        }
    
    # """Get user analytics for charts"""
    @staticmethod
    def get_user_analytics(days=30):
        """Get user analytics for charts"""
        end_date = datetime.utcnow()
        start_date = end_date - timedelta(days=days)

        # User registration trend
        daily_registrations = db.session.query(
            func.date(User.created_at).label("date"),
            func.count(User.id).label("count")
        ).filter(User.created_at >= start_date).group_by("date").all()

        # User activity
        active_users = db.session.query(
            func.date(User.last_login).label("date"),
            func.count(User.id).label("count")
        ).filter(User.last_login >= start_date).group_by("date").all()

        return {
            "registrations" : [{'date' : str(date) , 'count' : count} for date , count in daily_registrations],
            "active_user" : [{'date' : str(date) , 'count' : count} for date , count in active_users]
        }

    # """Update user role with admin logging"""
    @staticmethod 
    def update_user_role(user_id , new_role , admin_id , ip_address = None):
        """Update user role with admin logging"""
        user = User.query.get(user_id)
        if not user:
            return False, "User not found"
        old_role = user.role
        user.role = new_role
        
        AdminServices.log_admin_action(
            admin_id=admin_id,
            action=f"Update user role from {old_role} to {new_role}",
            resource_type="User",
            resource_id=user_id,
            details=f"User : {user.email}",
            ip_address=ip_address
        )

        db.session.commit()
        return True, "User role updated successfully"
    
    # """Activate/Deactivate user with admin logging"""
    @staticmethod
    def toggle_user_status(user_id , admin_id , ip_address = None):
        """Activate/Deactivate user with admin logging"""
        user = User.query.get(user_id)
        if not user:
            return False, "User not found"
        
        new_status = not user.is_active
        user.is_active = new_status

        action ="activated" if new_status else "deactivated"
        AdminServices.log_admin_action(
            admin_id=admin_id,
            action=f"User {action}",
            resource_type="User",
            resource_id=user_id,
            details=f"User : {user.email}",
            ip_address=ip_address
        )

        db.session.commit()
        return True , f"User {action} successfully"
    
    # Approve a skill with admin logging
    @staticmethod
    def approve_skill(skill_id , admin_id , admin_notes = None , ip_address = None):
        """Approve a skill with admin logging"""
        skill = Skill.query.get(skill_id)
        if not skill:
            return False, "Skill not found"
        
        skill.status = "approved"
        if admin_notes:
            skill.admin_notes = admin_notes

        AdminServices.log_admin_action(
            admin_id=admin_id,
            action="Skill approved",
            resource_type="skill",
            resource_id=skill_id,
            details=f"Skill {skill.name}",
            ip_address=ip_address
        )
        db.session.commit()
        return True, "Skill approved successfully"
    

    # Rejecting skill
    @staticmethod
    def reject_skill(skill_id , admin_id , admin_notes , ip_address = None):
        """Reject a skill with admin logging"""
        skill = Skill.query.get(skill_id)
        if not skill:
            return False, "Skill not found"
        
        skill.status = "rejected"
        skill.admin_notes = admin_notes

        AdminServices.log_admin_action(
            admin_id= admin_id,
            action="Skill rejected",
            resource_type="Skill",
            resource_id=skill_id,
            details=f"Skill {skill.name}",
            ip_address=ip_address
        )

        db.session.commit()
        return True, "Skill rejected successfully"
    
    # Toggle skill featured status with admin logging
    @staticmethod
    def toggle_skill_featured(skill_id , admin_id , ip_address=None):
        """Toggle skill featured status with admin logging"""
        skill = Skill.query.get(skill_id)
        if not skill:
            return False, "Skill not found"
        
        skill.is_featured = not skill.is_featured
        action = "featured" if skill.is_featured else "unfeatured"

        AdminServices.log_admin_action(
            admin_id=admin_id,
            action=f"Skill {action}",
            resource_type='skill',
            resource_id=skill_id,
            details=f"Skill: {skill.name}",
            ip_address=ip_address
        )

        db.session.commit()
        return True , f"Skill {action} successfully"
    
    # Resolve a report with admin logging
    @staticmethod
    def resolve_report(report_id , admin_id , status , admin_notes=None , ip_address=None):
        """Resolve a report with admin logging"""

        report = Report.query.get(report_id)
        if not report:
            return False , "Report not found"

        if status not in ["resolved","rejected"]:
            return False, "Invalid Status"
        report.status = status
        report.admin_notes = admin_notes
        report.resolved_by = admin_id
        report.resolved_at = datetime.utcnow()

        AdminServices.log_admin_action(
            admin_id=admin_id,
            action=f"Report marked as {status}",
            resource_type='report',
            resource_id=report_id,
            details=f"Report type: {report.report_type}",
            ip_address=ip_address
        )
        db.session.commit()
        return True , f"Report {status} successfully"
    

    # Get most popular skills based on views and sessions
    @staticmethod
    def get_popular_skills(limit=10):
        """Get most popular skills based on views and sessions"""
        skills = Skill.query.filter_by(status="approved").order_by(
            Skill.view_count.desc(),
            Skill.session_count.desc()
            ).limit(limit).all()
        
        return skills
    
    # Get recent admin activities
    @staticmethod
    def get_recent_activity(limit=20):
        """Get recent admin activities"""
        activities = AdminLog.query.order_by(AdminLog.created_at.desc()).limit(limit).all()
        return activities
    
    # Get session analytics for charts
    @staticmethod
    def get_session_analytics(days=30):
        """Get session analytics for charts"""
        end_date = datetime.utcnow()
        start_date = end_date - timedelta(days=days)

        # Session trend
        daily_sessions = db.session.query(
            func.date(Session.created_at).label('date'),
            func.count(Session.id).label('count'),
        ).filter(
            Session.created_at >= start_date
        ).group_by('date').all()

        # Session status distribution

        status_distribution = db.session.query(
            Session.status,
            func.count(Session.id).label('count')
        ).group_by(Session.status).all()

        return {
            'daily_sessions': [{'date': str(date), 'count': count} for date, count in daily_sessions],
            'status_distribution': {status: count for status, count in status_distribution}
        }