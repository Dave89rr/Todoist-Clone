"""empty message

Revision ID: e676dc775bcd
Revises: a44ec5a3688a
Create Date: 2022-08-12 16:47:40.818158

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e676dc775bcd'
down_revision = 'a44ec5a3688a'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('tasks', sa.Column('due_date', sa.DateTime(timezone=True), nullable=True))
    op.add_column('tasks', sa.Column('completed', sa.Boolean(), nullable=False))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('tasks', 'due_date')
    op.drop_column('tasks', 'completed')
    # ### end Alembic commands ###
