from .db import db
from sqlalchemy.sql import func

class Task(db.Model):
    __tablename__ = "tasks"

    id = db.Column(db.Integer, primary_key=True)
    ownerId = db.Column(db.Integer, db.ForeignKey("users.id", ondelete='CASCADE'), nullable=False)
    name = db.Column(db.String(30), nullable=False)
    description = db.Column(db.Text, nullable=True)
    position = db.Column(db.Integer, nullable=False)
    projectId = db.Column(db.Integer, db.ForeignKey("projects.id", ondelete='CASCADE'), nullable=False)
    priority = db.Column(db.Integer, nullable=False)
    due_date = db.Column(db.DateTime(timezone=True), nullable=True)
    completed = db.Column(db.Boolean, nullable=False)
    createdAt = db.Column(db.DateTime(timezone=True), nullable=False, server_default=func.now())
    updatedAt = db.Column(db.DateTime(timezone=True), nullable=False, server_default=func.now(), onupdate=func.now())

    
    def toDict(self):
        return dict(
            id=self.id,
            ownerId=self.ownerId,
            name=self.name,
            description=self.description,
            position=self.position,
            projectId=self.projectId,
            priority=self.priority,
            due_date=self.due_date,
            completed=self.completed,
            createdAt=self.createdAt,
            updatedAt=self.updatedAt,
        )