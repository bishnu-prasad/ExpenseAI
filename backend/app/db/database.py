from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

MONGO_URL = os.getenv("MONGO_URL")


if not MONGO_URL:
    raise Exception("MONGO_URL is not set")

client = MongoClient(MONGO_URL)

db = client["expense_db"]
expense_collection = db["expenses"]
users_collection = db["users"]