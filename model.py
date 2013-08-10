from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine
from sqlalchemy import Column, Integer, String, Text
from sqlalchemy.orm import sessionmaker, scoped_session
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship, backref
from sqlalchemy.orm.exc import NoResultFound


ENGINE = None
Session = None

ENGINE = create_engine("postgresql://localhost/hipster", echo=True)

session = scoped_session(sessionmaker(bind=ENGINE, autocommit=False, autoflush=False))

Base = declarative_base()
Base.query = session.query_property()
Base.metadata.create_all(ENGINE)

class User(Base):
	__tablename__= "users"

	id = Column(Integer, primary_key=True)
	nickname = Column(String(64), nullable=True)
	email = Column(String(64), nullable=True)
	password_hash = Column(String(64), nullable=True)
	salt = Column(String(64), nullable=True)

	def is_authenticated(self):
		return True

	def is_active(self):
		return True

	def is_anonymous(self):
		return False

	def get_id(self):
		return unicode(self.id)

class Image(Base):
	__tablename__= "images"

	id = Column(Integer, primary_key=True)
	user_id = Column(Integer, ForeignKey('users.id'))
	url = Column(Text, nullable=True)

	user = relationship("User", backref=backref("images", order_by=id))