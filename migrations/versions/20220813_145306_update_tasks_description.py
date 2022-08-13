"""empty message

Revision ID: d9fa5521a8b1
Revises: e676dc775bcd
Create Date: 2022-08-13 14:53:06.805304

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd9fa5521a8b1'
down_revision = 'e676dc775bcd'
branch_labels = None
depends_on = None


def upgrade():
    op.alter_column('tasks', 'description', existing_type=sa.Text(), type_=sa.String(2000))


def downgrade():
    op.alter_column('tasks', 'description', existing_type=sa.String(2000), type_=sa.Text())
