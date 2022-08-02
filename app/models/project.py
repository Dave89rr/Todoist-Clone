from .db import db
from sqlalchemy.sql import func

class Project(db.Model):
    __tablename__ = "projects"

    id = db.Column(db.Integer, primary_key=True)
    ownerId = db.Column(db.Integer, db.ForeignKey("users.id", ondelete='CASCADE'), nullable=False)
    name = db.Column(db.String(30), nullable=False)
    color = db.Column(db.String(15), nullable=False)
    view = db.Column(db.Boolean, nullable=False)
    createdAt = db.Column(db.DateTime(timezone=True), nullable=False, server_default=func.now())
    updatedAt = db.Column(db.DateTime(timezone=True), nullable=False, server_default=func.now(), onupdate=func.now())

    
    def toDict(self):
        return dict(
            id=self.id,
            ownerId=self.ownerId,
            name=self.name,
            createdAt=self.createdAt,
            updatedAt=self.updatedAt,
        )