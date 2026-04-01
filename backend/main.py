from fastapi import FastAPI, Depends
from app.routers import auth
from app.core.dependencies import get_current_user, oauth2_scheme
from fastapi.middleware.cors import CORSMiddleware

from app.routers import expense

app = FastAPI()


from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 🔥 FORCE ALLOW EVERYTHING
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(expense.router)

@app.get("/")
def home():
    return {"message": "Backend is running "}





@app.get("/protected")
def protected_route(
    user: str = Depends(get_current_user),
    token: str = Depends(oauth2_scheme)
):
    return {
        "message": "You are authorized",
        "user": user
    }
    
@app.get("/test-db")
def test_db():
    return {"message": "MongoDB connected successfully 🚀"}