# 🧠 AI Work Scheduler  

An AI-powered work scheduler that integrates with **Google Calendar** to help users manage tasks more efficiently.  
Built with **React, Node.js, Express.js, MongoDB, and OAuth2** for Google authentication.  

---

## ✨ Features
- 🔑 **Google OAuth Login** – Secure sign-in with your Google account  
- 📅 **Google Calendar Integration** – Sync tasks directly to your calendar  
- 📌 **Task Management** – Add, edit, and delete tasks with deadlines and priorities  
- 🖼️ **Interactive Calendar (FullCalendar)** – Visualize and organize tasks with drag & drop  
- ⚡ **Smart Suggestions (AI)** – Recommends optimal scheduling based on availability  
- ⏰ **Reminders & Notifications** – Stay on track with timely reminders  

---

## 🛠️ Tech Stack
**Frontend:** React, FullCalendar, TailwindCSS  
**Backend:** Node.js, Express.js, Passport.js (OAuth2)  
**Database:** MongoDB (Mongoose)  
**APIs & Tools:** Google Calendar API, JWT Auth, REST API  

---

## 🚀 Getting Started  

### 1. Clone the repository  
```bash
git clone https://github.com/Ayush-rawat25/Work-Scheduler.git
cd Work-Scheduler
```
Install dependencies  
```bash
npm install
```
Set up environment variables:
Create a .env file in the root with:
```bash
PORT=5000  
MONGO_URI=your_mongodb_connection  
GOOGLE_CLIENT_ID=your_google_client_id  
GOOGLE_CLIENT_SECRET=your_google_client_secret  
SESSION_SECRET=your_secret
```
Run the app
```bash
npm run dev
```
