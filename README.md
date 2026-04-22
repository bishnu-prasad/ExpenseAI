<img width="2940" height="1640" alt="Image 05-04-26 at 7 09 PM" src="https://github.com/user-attachments/assets/1986b826-23ce-4391-ab25-acf85b8ed8c6" />
<img width="2920" height="1624" alt="Image 22-04-26 at 10 43 PM (1)" src="https://github.com/user-attachments/assets/9e121d02-1f92-4f35-87e5-43b3489970d1" />
<img width="2892" height="1658" alt="Image 22-04-26 at 10 53 PM" src="https://github.com/user-attachments/assets/a88ce445-c150-4b98-81fe-f541da6bad13" />
<img width="2893" height="1639" alt="Image 22-04-26 at 10 53 PM (1)" src="https://github.com/user-attachments/assets/c5589380-3b06-4f30-a94d-810ed0fd5997" />
<img width="2903" height="1646" alt="Image 22-04-26 at 10 54 PM" src="https://github.com/user-attachments/assets/f2fbc579-a904-44f1-ad7c-55855af278cb" />






# 🚀 Velora — Smart Expense Tracking for Modern India

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

