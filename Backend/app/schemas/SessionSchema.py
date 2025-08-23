from marshmallow import Schema, validate , fields

class SessionSchema(Schema):
    id = fields.Int(dump_only=True)
    skillName = fields.Str(required=True)
    scheduleTime = fields.DateTime(required=True)
    status = fields.Str(validate= validate.OneOf(['pending', 'accept' , 'reject' , 'complete']))
    reciever_id = fields.Int(required=True)
    requester_id = fields.Int(dump_only=True)