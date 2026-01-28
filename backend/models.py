from sqlalchemy import Column, Integer, String
from database import Base

# Define o modelo de usuario com id, email e senha (hash)
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
