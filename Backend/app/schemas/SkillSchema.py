from marshmallow import Schema , fields , validate

class SkillSchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str(required=True)
    level = fields.Str(validate=validate.OneOf(['Beginner', 'Intermediate' , 'Expert']))
    user_id = fields.Int(dump_only=True)