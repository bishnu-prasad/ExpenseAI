from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import OAuth2PasswordRequestForm
from app.schemas.user import UserCreate
from app.core.security import hash_password, verify_password, create_access_token

router = APIRouter()

# TEMP storage (later DB)
fake_users_db = {}

@router.post("/signup")
def signup(user: UserCreate):
    if user.email in fake_users_db:
        raise HTTPException(status_code=400, detail="User already exists")

    hashed_pwd = hash_password(user.password)

    fake_users_db[user.email] = hashed_pwd

    return {
        "message": "User registered successfully",
        "email": user.email
    }


@router.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends()):
    email = form_data.username
    password = form_data.password

    if email not in fake_users_db:
        raise HTTPException(status_code=400, detail="User not found")

    stored_password = fake_users_db[email]

    if not verify_password(password, stored_password):
        raise HTTPException(status_code=400, detail="Invalid password")

    token = create_access_token({"sub": email})

    return {
        "access_token": token,
        "token_type": "bearer"
    }