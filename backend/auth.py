from jose import jwt
from datetime import datetime, timedelta

SECRET_KEY = "mysecretkey"
ALGORITHM = "HS256"


def create_token(email: str):
    payload = {
        "sub": email,
        "exp": datetime.utcnow() + timedelta(days=1)
    }

    return jwt.encode(
        payload,
        SECRET_KEY,
        algorithm=ALGORITHM
    )