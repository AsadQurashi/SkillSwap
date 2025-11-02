from marshmallow import Schema , validate , fields

# 1 AdminLogSchema
class AdminLogSchema(Schema):
    id = fields.Int(dump_only=True)
    admin_name = fields.Method("get_admin_name")
    action = fields.Str()
    resource_type = fields.Str()
    resource_id = fields.Int()
    details = fields.Str()
    created_at = fields.DateTime(dump_only=True)

    def get_admin_name(self, obj):
        return obj.admin.name if obj.admin else None
    
# 2 Recent Activity
class RecentActivitySchema(Schema):
    id = fields.Int(dump_only=True)
    admin_id = fields.Int(required=True)
    admin_name = fields.Method("get_admin_name")
    action = fields.Str()
    resource_type = fields.Str()
    resource_id = fields.Int()
    details = fields.Str()
    ip_address = fields.Str()
    created_at = fields.DateTime(dump_only=True)

    def get_admin_name(self, obj):
        return obj.admin.name if obj.admin else None
    

# 3 Admin User Schmea
class AdminUserSchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str(required=True)
    email = fields.Email(required=True)
    role = fields.Str(validate=validate.OneOf(['user' , 'admin' , 'super_admin']))
    is_active = fields.Bool()
    created_at = fields.DateTime(dump_only=True)
    last_login = fields.DateTime(dump_only=True)
    skills_count = fields.Method('get_skills_count')
    sessions_count = fields.Method('get_sessions_count')

    def get_skills_count(self , obj):
        return len(obj.skills)
    
    def get_sessions_count(self , obj):
        return len(obj.requester_sessions) + len(obj.reciever_sessions)
    
# 4 Admin Skill Schema
class AdminSkillSchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str(required=True)
    description = fields.Str()
    level = fields.Str()
    user_id = fields.Int(required=True)
    user_name = fields.Method("get_user_name")
    is_featured = fields.Bool()
    status = fields.Str(validate=validate.OneOf(['pending','approved','rejected']))
    view_count = fields.Int(dump_only=True)
    session_count = fields.Int(dump_only=True)
    created_at = fields.DateTime(dump_only=True)
    updated_at = fields.DateTime(dump_only=True)
    video = fields.Str()
    image = fields.Str()
    link = fields.Str()
    document = fields.Str()

    def get_user_name(self , obj):
        return obj.user.name if obj.user else None
    
# 5 Admin Report Schema
class AdminReportSchema(Schema):
    id = fields.Int(dump_only=True)
    reporter_id = fields.Int(required=True)
    reported_user_id = fields.Int()
    reported_skill_id = fields.Int()
    report_type = fields.Str(required=True)
    description = fields.Str(required=True)
    status = fields.Str(validate=validate.OneOf(['pending', 'resolved' , 'rejected']))
    admin_notes = fields.Str()
    created_at = fields.DateTime(dump_only=True)
    resolved_by = fields.Int(required=True)
    resolved_at = fields.DateTime(dump_only=True)
    resolver_name = fields.Method("get_resolver_name")
    reporter_name = fields.Method("get_reporter_name")
    reported_user_name = fields.Method("get_reported_user_name")
    reported_skill_name = fields.Method("get_reported_skill_name")

    def get_resolver_name(self , obj):
        return obj.resolver.name if obj.resolver else None
    
    def get_reporter_name(self , obj):
        return obj.reporter.name if obj.reporter else None
    
    def get_reported_user_name(self , obj):
        return obj.reported_user.name if obj.reported_user else None
    
    def get_reported_skill_name(self, obj):
        return obj.reported_skill.name if obj.reported_skill else None
    
# 6 Dashboard Schema
class DashBoardSchema(Schema):
    total_users = fields.Int()
    total_skills = fields.Int()
    total_sessions = fields.Int()
    pending_skills = fields.Int()
    pending_reports = fields.Int()
    active_users_today = fields.Int()
    peak_hours = fields.Dict()
