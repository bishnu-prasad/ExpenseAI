from pydantic import BaseModel,Field

# For creating expense (input)
class ExpenseCreate(BaseModel):
    title: str
    amount: float = Field(gt=0)


# For response (output)
class ExpenseResponse(BaseModel):
    id: str   
    title: str
    amount: float
    category: str
    user: str