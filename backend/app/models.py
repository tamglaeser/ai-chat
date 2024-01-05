from app import db

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)

class Chat(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    thread = db.Column(db.JSON)
    share_id = db.Column(db.String(36), unique=True)
    share_url = db.Column(db.String(100), unique=True)

    def __repr__(self):
        return f'<Chat {self.id}>'

    def as_dict(self):
        return {
            'id': self.id,
            'thread': self.thread,
            'share_id': self.share_id,
            'share_url': self.share_url
        }
