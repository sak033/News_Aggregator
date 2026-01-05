## News Aggregator

A full-stack MERN application that aggregates news from multiple sources and allows users to subscribe and send messages via a contact form, with email notifications handled using Resend.

## 🚀 Features

🗞️ Fetches latest news and top headlines

🌍 Country-wise and category-wise news

📬 Contact form with MongoDB storage

✉️ Email notifications using Resend API

📧 Newsletter subscription feature

🗂️ E-paper style categorized news

⚡ Fast frontend built with Vite + React

☁️ MongoDB Atlas for cloud database

## 🛠️ Tech Stack
# Frontend

React (Vite)

JavaScript

CSS / Tailwind

Font Awesome

# Backend

Node.js

Express.js

MongoDB Atlas

Resend (Transactional Emails)

## Project Structure
News-Aggregator/
│
├── client/              # React frontend
│   ├── src/
│   ├── package.json
│
├── server/              # Node backend
│   ├── models/
│   ├── routes/
│   ├── utils/
│   │   ├── sendEmail.js
│   │   └── sendContactEmail.js
│   ├── server.js
│   ├── .env
│
└── README.md

## ⚙️ Environment Variables

Create a .env file inside the server folder.

PORT=3000
MONGO_URI=your_mongodb_atlas_uri
GNEWS_API_KEY=your_gnews_api_key
RESEND_API_KEY=your_resend_api_key
OWNER_EMAIL=your_email@gmail.com

## ▶️ Running the Project Locally
# Clone the repository
git clone https://github.com/your-username/news-aggregator.git
cd News-Aggregator

# Start Backend
cd server
npm install
node server.js


# You should see:

Server is running on port 3000
MongoDB connected ✅

# Start Frontend
cd client
npm install
npm run dev


# Open browser at:

http://localhost:5173

## 📬 Email Functionality 

Emails are sent using Resend

In development (sandbox mode):

Emails are delivered only to the admin email

User confirmation emails are blocked by Resend (security rule)

In production:

Verifying a domain enables emails to all users

## API Endpoints
Subscribe
POST /subscribe

{
  "email": "user@example.com"
}

Contact
POST /contact

{
  "name": "User",
  "email": "user@example.com",
  "inquiryType": "feedback",
  "subject": "Appreciation",
  "message": "Great work!"
}

## Demo Video

https://drive.google.com/xxxx

## Key Learnings

Full-stack MERN architecture

REST API design with Express

MongoDB schema design

Handling environment variables

Debugging ES Modules and async flows

Implementing transactional email systems

Understanding sandbox vs production email rules
