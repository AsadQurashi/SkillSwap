from flask import Blueprint , request , jsonify
from flask_jwt_extended import jwt_required , get_jwt_identity
from app.services.admin_services import AdminServices
from app.schemas.admin_schmeas import (AdminUserSchema , AdminSkillSchema , AdminReportSchema , AdminLogSchema , RecentActivitySchema , DashBoardSchema)
from app.models.reportmodel import Report
from app.models.session import Session
from app.models.skill import Skill
from app.models.user import User
from app.extensions import db

admin_bp = Blueprint("admin" , __name__ , url_prefix="/admin")

# Initialize Schemas
user_schema = AdminUserSchema()
users_schema = AdminUserSchema(many=True)

skill_schmea = AdminSkillSchema()
skills_schema = AdminSkillSchema(many=True)

report_schema = AdminReportSchema()
reports_schema = AdminReportSchema(many=True)

admin_log_schema = AdminLogSchema(many=True)
recent_activity_schema = RecentActivitySchema(many=True)
stats_schema = DashBoardSchema()

# Check if user is admin
def require_admin():
    """Check if user is admin"""
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    if not user or not user.is_admin():
        return None
    return user

# DASHBOARD ROUTES
@admin_bp.route("/dashboard/stats", methods=['GET'])
@jwt_required()
def get_dashboard_stats():
    admin = require_admin()
    if not admin:
        return jsonify({"message":"admin access require"}) , 403
    stats = AdminServices.get_dashboard_stats()
    return jsonify(stats_schema.dump(stats))


# Dashboard Acivity
@admin_bp.route("/dashboard/activity", methods = ['GET'])
@jwt_required()
def get_recent_activity():
    admin = require_admin()
    if not admin:
        return jsonify({"message":"admin access is require"}), 403
    
    recent_actvity = AdminServices.get_recent_activity(limit=10)
    return jsonify(recent_activity_schema.dump(recent_actvity))

# Dashboard Analytics
@admin_bp.route("/dashboard/analytics", methods=['GET'])
@jwt_required()
def get_analytics():
    admin = require_admin()
    if not admin:
        return jsonify({"message":"admin access require"}),403
    
    days = request.args.get('days' , 30 , type=int)
    analytics = AdminServices.get_user_analytics(days)
    return jsonify(analytics)

#  USER MANAGEMENT
@admin_bp.route("/users", methods=['GET'])
@jwt_required()
def get_users():
    admin = require_admin()
    if not admin:
        return jsonify({"message":"Admin access is required"}), 403
    page = request.args.get('page', 1 , type=int)
    per_page = request.args.get('per_page',10, type=int)
    search = request.args.get('search', '')
    role = request.args.get('role', '')

    query = User.query

    if search:
        query = query.filter(User.name.ilike(f'%{search}%') | User.email.ilike(f'%{search}%'))
    
    if role:
        query = query.filter(User.role == role)

    users = query.paginate(page=page , per_page=per_page, error_out=False)

    return jsonify({
        'users' : users_schema.dump(users.items),
        'total' : users.total,
        'pages' : users.pages,
        'current_page' : users.page
    })

# Update user role
@admin_bp.route("users/<int:user_id>/role", methods = ['PUT'])
@jwt_required()
def update_user_role(user_id):
    admin = require_admin()
    if not admin:
        return jsonify({"message":"Admin access is required"}), 403
    
    data = request.get_json()
    new_role = data.get('role')

    if not new_role or new_role not in ['user' , 'admin' , 'super_admin']:
        return jsonify({"message":"Invalid role"}) , 400
    
    success , message = AdminServices.update_user_role(
        user_id , new_role , admin.id , request.remote_addr
    )

    if success:
        return jsonify({"message":message}) ,200
    else:
        return jsonify({"message":message}) , 404
    
# Toggle user
@admin_bp.route("/users/<int:user_id>/status",methods = ['PUT'])
@jwt_required()
def toggle_user_status(user_id):
    admin = require_admin()
    if not admin:
        return jsonify({"message":"Admin access is require"}), 403
    
    success , message = AdminServices.toggle_user_status(
        user_id , admin.id , request.remote_addr
    )

    if success:
        return jsonify({"message" : message}) , 200
    else:
        return jsonify({"messaage" : message}) , 404
    
# SKILL MANAGEMENT
@admin_bp.route('/skills', methods=['GET'])
@jwt_required()
def get_skills():
    admin = require_admin()
    if not admin:
        return jsonify({"message":"Admin access is require"}), 403
    
    page = request.args.get('page',1,type=int)
    per_page = request.args.get('per_page', 10 , type=int)
    status = request.args.get('status','')

    query = Skill.query
    
    if status:
        query = query.filter(Skill.status == status)
    
    skills = query.paginate(page=page , per_page=per_page , error_out=False)

    return jsonify({
        'skills' : skills_schema.dump(skills.items),
        'total' : skills.total,
        'pages' : skills.pages,
        'current_page' : skills.page
    })

# Approve Skill
@admin_bp.route('/skills/<int:skill_id>/approve', methods = ['PUT'])
@jwt_required()
def approve_skill(skill_id):
    admin = require_admin()
    if not admin:
        return jsonify({"message":"Admin access is require"}), 403
    data = request.get_json()
    admin_notes = data.get('admin_notes', '')
    success , message = AdminServices.approve_skill(
        skill_id , admin.id , admin_notes,  request.remote_addr 
    )

    if success:
        return jsonify({"message" : message}), 200
    else:
        return jsonify({"message": message}), 404

# Reject Skill
@admin_bp.route('/skills/<int:skill_id>/reject', methods = ['PUT'])
@jwt_required()
def reject_skill(skill_id):
    admin = require_admin()
    if not admin:
        return jsonify({"message":"Admin access is require"}), 403
    
    data = request.get_json()
    admin_notes = data.get('admin_notes', '')

    if not admin_notes:
        return jsonify({"message":"Admin notes are required when rejecting a skill"}), 400
    
    success , message = AdminServices.reject_skill(
        skill_id ,admin.id , admin_notes , request.remote_addr
    )

    if success:
        return jsonify({"messagae" : message}), 200
    else:
        return jsonify({"messgage":message}),404


# Report Management
# get report
@admin_bp.route("/reports", methods = ['GET'])
@jwt_required()
def get_reports():
    admin = require_admin()
    if not admin:
        return jsonify({"message":"Admin access is require"}), 403
    
    page = request.args.get('page' , 1 , type=int)
    per_page = request.args.get('per_page' , 10 , type=int)
    status = request.args.get('status' , '')

    query = Report.query

    if status:
        query = query.filter(Report.status == status)
    
    reports = query.paginate(page=page , per_page=per_page , error_out=False)

    return jsonify({
        'reports' : reports_schema.dump(reports.items),
        'total' : reports.total,
        'pages' : reports.pages,
        'current_page' : reports.page
    })
# Resolve Reports
@admin_bp.route('/reports/<int:report_id>/resolve', methods=['PUT'])
@jwt_required()
def resolve_reports(report_id):
    admin = require_admin()
    if not admin:
        return jsonify({"message":"Admin access is require"}) , 403
    
    data = request.get_json()
    status = data.get('status')
    admin_notes = data.get('admin_notes' , '')

    if status not in ['resolved', 'rejected']:
        return jsonify({"message":"invalid status"}), 400
    
    success , message = AdminServices.resolve_report(
        report_id , admin.id , status , admin_notes , request.remote_addr
    )

    if success:
        return jsonify({"message":message}),200
    else:
        return jsonify({"message":message}), 404

