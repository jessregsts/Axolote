# Arquivo de autenticacao e autorizacoes

from passlib.context import CryptContext
from datetime import datetime, timedelta
from jose import jwt

SECRET_KEY = "sua_chave_secreta" # Chave privada para o JWT 
ALGORITHM = "HS256" # Algoritmo de criptografia usado

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Funcoes de hash e verificacao de senha
def hash_password(password: str):
    return pwd_context.hash(password)

def verify_password(password: str, hashed_password: str):
    return pwd_context.verify(password, hashed_password)

def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=30)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
