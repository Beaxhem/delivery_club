"""empty message

Revision ID: 5d0aa5bc0b51
Revises: 0d235d6dfbda
Create Date: 2020-04-21 22:39:06.154292

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '5d0aa5bc0b51'
down_revision = '0d235d6dfbda'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('company', sa.Column('email', sa.String(), nullable=True))
    op.add_column('company', sa.Column('number', sa.String(), nullable=True))
    op.add_column('company', sa.Column('password', sa.String(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('company', 'password')
    op.drop_column('company', 'number')
    op.drop_column('company', 'email')
    # ### end Alembic commands ###
