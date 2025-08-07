from marshmallow import Schema , fields , validate

class UserSchema(Schema):
    id = fields.Int(dump_only=True) #only include in output
    name = fields.Str(required=True , validate= validate.Length(min=1))
    email = fields.Email(required=True)
    role = fields.Str(dump_only=True)
    password= fields.Str(required=True, load_only=True, validate=validate.Length(min=6))