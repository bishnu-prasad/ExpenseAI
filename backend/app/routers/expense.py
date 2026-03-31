from fastapi import APIRouter, Depends, HTTPException
from app.schemas.expense import ExpenseCreate, ExpenseResponse
from app.core.dependencies import get_current_user
from app.db.database import expense_collection
from bson import ObjectId
from datetime import datetime
from app.ml.model import predict_category

router = APIRouter()


# 1️⃣ Create Expense
@router.post("/expenses", response_model=ExpenseResponse)
def create_expense(expense: ExpenseCreate, user: str = Depends(get_current_user)):
    data = expense.dict()
    data["user"] = user
    data["created_at"] = datetime.utcnow()
    # Auto predict category using ML model
    predicted_category = predict_category(data["title"])
    data["category"] = predicted_category

    try:
        result = expense_collection.insert_one(data)
    except Exception:
        raise HTTPException(status_code=500, detail="Database error while creating expense")

    return {
        "id": str(result.inserted_id),
        "title": data["title"],
        "amount": data["amount"],
        "category": data["category"],
        "user": data["user"]
    }


# 2️⃣ Get Expenses (only current user)
@router.get("/expenses", response_model=list[ExpenseResponse])
def get_expenses(user: str = Depends(get_current_user)):
    expenses = []

    try:
        for exp in expense_collection.find({"user": user}):
            exp["id"] = str(exp["_id"])
            del exp["_id"]
            expenses.append(exp)
    except Exception:
        raise HTTPException(status_code=500, detail="Database error while fetching expenses")

    return expenses


# 3️⃣ Delete Expense
@router.delete("/expenses/{expense_id}")
def delete_expense(expense_id: str, user: str = Depends(get_current_user)):
    try:
        result = expense_collection.delete_one({
            "_id": ObjectId(expense_id),
            "user": user
        })
    except Exception:
        raise HTTPException(status_code=500, detail="Database error while deleting expense")

    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Expense not found")

    return {"message": "Expense deleted"}
  
@router.get("/analytics")
def get_analytics(user: str = Depends(get_current_user)):
    expenses = expense_collection.find({"user": user})

    total = 0
    category_data = {}

    for exp in expenses:
        amount = exp["amount"]
        category = exp["category"].lower()

        total += amount

        if category in category_data:
            category_data[category] += amount
        else:
            category_data[category] = amount

    return {
        "total_spent": total,
        "category_breakdown": category_data
    }
  
@router.put("/expenses/{expense_id}", response_model=ExpenseResponse)
def update_expense(expense_id: str, expense: ExpenseCreate, user: str = Depends(get_current_user)):
    
    updated_data = expense.dict()

    try:
        result = expense_collection.update_one(
            {
                "_id": ObjectId(expense_id),
                "user": user
            },
            {
                "$set": updated_data
            }
        )
    except Exception:
        raise HTTPException(status_code=500, detail="Database error while updating expense")

    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Expense not found")

    updated_expense = expense_collection.find_one({
        "_id": ObjectId(expense_id),
        "user": user
    })

    return {
        "id": str(updated_expense["_id"]),
        "title": updated_expense["title"],
        "amount": updated_expense["amount"],
        "category": updated_expense["category"],
        "user": updated_expense["user"]
    }

@router.get("/analytics/monthly")
def monthly_analytics(user: str = Depends(get_current_user)):
    expenses = expense_collection.find({"user": user})

    monthly_data = {}

    for exp in expenses:
        date = exp.get("created_at")

        if date:
            month = date.strftime("%B")  # e.g., March

            if month in monthly_data:
                monthly_data[month] += exp["amount"]
            else:
                monthly_data[month] = exp["amount"]

    return monthly_data
  
@router.get("/insights")
def get_insights(user: str = Depends(get_current_user)):
    expenses = list(expense_collection.find({"user": user}))

    total = 0
    category_data = {}

    for exp in expenses:
        amount = exp["amount"]
        category = exp["category"].lower()

        total += amount

        if category in category_data:
            category_data[category] += amount
        else:
            category_data[category] = amount

    insights = []

    if total == 0:
        return {"insights": ["No expenses found"]}

    # Rule 1: Food spending high
    if category_data.get("food", 0) / total > 0.3:
        insights.append("You spend too much on food. Try reducing takeout.")

    # Rule 2: Travel spending high
    if category_data.get("travel", 0) / total > 0.25:
        insights.append("Travel expenses are high. Consider budgeting trips.")

    # Rule 3: Rent check
    if category_data.get("rent", 0) / total < 0.2:
        insights.append("Your rent spending is under control. Good job!")

    if not insights:
        insights.append("Your spending looks balanced. Keep it up!")

    return {"insights": insights}
  
@router.post("/predict-category")
def predict(data: dict):
    description = data["description"]
    category = predict_category(description)

    return {
        "description": description,
        "predicted_category": category
    }