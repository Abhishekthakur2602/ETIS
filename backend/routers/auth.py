from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from passlib.hash import bcrypt

from database import conn
from auth import create_token

router = APIRouter()


# ======================
# Request Models
# ======================

class SignupRequest(BaseModel):
    name: str
    email: str
    password: str
    role: str


class LoginRequest(BaseModel):
    email: str
    password: str


# ======================
# Signup
# ======================

@router.post("/signup")
def signup(data: SignupRequest):

    try:
        cursor = conn.cursor()

        cursor.execute(
            """
            SELECT id
            FROM users
            WHERE email=%s
            """,
            (data.email,)
        )

        if cursor.fetchone():
            raise HTTPException(
                status_code=400,
                detail="User already exists"
            )

        hashed_password = bcrypt.hash(
            data.password
        )

        cursor.execute(
            """
            INSERT INTO users(
                name,
                email,
                password,
                role
            )
            VALUES(%s,%s,%s,%s)
            """,
            (
                data.name,
                data.email,
                hashed_password,
                data.role
            )
        )

        conn.commit()

        return {
            "message": "User Created Successfully"
        }

    except Exception as e:
        print("Signup Error:", e)

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )

    finally:
        if "cursor" in locals():
            cursor.close()


# ======================
# Login
# ======================

@router.post("/login")
def login(data: LoginRequest):

    try:
        cursor = conn.cursor()

        cursor.execute(
            """
            SELECT
                id,
                name,
                email,
                password,
                role
            FROM users
            WHERE email=%s
            """,
            (data.email,)
        )

        user = cursor.fetchone()

        if not user:
            raise HTTPException(
                status_code=401,
                detail="Invalid Email"
            )

        user_id = user[0]
        name = user[1]
        email = user[2]
        hashed_password = user[3]
        role = user[4]

        if not bcrypt.verify(
            data.password,
            hashed_password
        ):
            raise HTTPException(
                status_code=401,
                detail="Invalid Password"
            )

        token = create_token(email)

        return {
            "token": token,
            "user_id": user_id,
            "name": name,
            "email": email,
            "role": role
        }

    except HTTPException:
        raise

    except Exception as e:
        print("Login Error:", e)

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )

    finally:
        if "cursor" in locals():
            cursor.close()