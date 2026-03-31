
# 🚀 ExpenseAI — AI-Powered Expense Tracker

An intelligent full-stack expense tracking web application that automatically categorizes user expenses using Machine Learning.

---

## ✨ Features

- 🔐 User Authentication (Signup/Login)
- 💸 Add & manage expenses
- 🤖 AI-powered automatic category prediction
- 📊 Dashboard with analytics (charts & insights)
- 🧠 Machine Learning integration (TF-IDF + model)
- ☁️ MongoDB cloud database
- ⚡ FastAPI backend + React frontend

---

## 🧠 How It Works

1. User enters expense (e.g., "pizza from dominos")
2. Backend sends text to ML model
3. Model predicts category (e.g., **food**)
4. Expense is stored in MongoDB
5. Dashboard updates with analytics

---

## 🏗️ Tech Stack

### 🔹 Frontend
- React.js
- Tailwind CSS
- Chart.js (for analytics)

### 🔹 Backend
- FastAPI
- Pydantic
- Uvicorn

### 🔹 Database
- MongoDB Atlas

### 🔹 Machine Learning
- Scikit-learn
- TF-IDF Vectorizer
- Trained classification model

---

## 📂 Project Structure

expense-tracker/
│
├── backend/
│   ├── app/
│   ├── model/
│   ├── main.py
│   ├── requirements.txt
│
├── frontend/
│   ├── src/
│   ├── public/
│
├── .gitignore
└── README.md

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/ExpenseAI.git
cd ExpenseAI


⸻

2️⃣ Backend Setup

cd backend
pip install -r requirements.txt

Create .env file:

MONGO_URL=your_mongodb_url
SECRET_KEY=your_secret_key

Run backend:

uvicorn main:app --reload


⸻

3️⃣ Frontend Setup

cd frontend
npm install
npm start


⸻

📊 API Documentation

After running backend:

👉 http://127.0.0.1:8000/docs

⸻

🔐 Security Note
	•	.env file is not included for security reasons
	•	Use your own MongoDB credentials

⸻

🚀 Future Improvements
	•	JWT Authentication
	•	Budget tracking system
	•	Export reports (PDF/CSV)
	•	Mobile responsive UI
	•	Deployment (Render + Vercel)

⸻

👨‍💻 Author

Bishnuprasad Tripathy

⸻

⭐ If you like this project

Give it a ⭐ on GitHub!

