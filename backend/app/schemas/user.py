from pydantic import BaseModel, EmailStr

# Signup schema
class UserCreate(BaseModel):
    email: EmailStr
    password: str

# Login schema
class UserLogin(BaseModel):
    email: EmailStr
    password: str