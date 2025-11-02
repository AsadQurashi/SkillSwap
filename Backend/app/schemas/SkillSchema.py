from marshmallow import Schema , fields , validate

class SkillSchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str(required=True)
    description = fields.Str()
    video = fields.Str(dump_only=True)
    image = fields.Str(dump_only=True)
    document = fields.Str(dump_only=True)
    link = fields.Url(required=False)
    level = fields.Str(validate=validate.OneOf(['Beginner', 'Intermediate' , 'Expert' , 'Advanced']))
    user_id = fields.Int(required=True)