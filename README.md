Learnato Discussion Forum - Microservice

Empower learning through conversation.
This microservice provides a responsive browser-based discussion forum where learners and instructors can post questions, share insights, and reply in real time.
Built using Node.js, React, Tailwind CSS, and Vite.

Project Structure
project/
 ├─ server/            # Backend (Node.js + Express + MongoDB)
 │   ├─ controllers/
 │   ├─ models/
 │   ├─ routes/
 │   ├─ .env.example
 │   └─ index.js
 │
 ├─ src/               # Frontend (React + Vite + Tailwind)
 │   ├─ components/
 │   ├─ pages/
 │   ├─ api/
 │   └─ App.tsx
 │
 ├─ tailwind.config.js
 ├─ package.json
 └─ vite.config.ts

- Features

Create and view posts

Comment & participate in discussion threads

Clean UI powered by Tailwind

Microservice ready — easy plug-and-play into Learnato ecosystem

Fully API-driven separation of client/server

Requirements

Ensure you have installed:

Tool	Version
Node.js	>= 18.x
npm / yarn / pnpm	any
MongoDB	Local or Cloud (Atlas)
Setup Instructions
1️ Clone the Repository
git clone <repo-url>
cd project

2️ Setup Backend
cd server
npm install


Create the environment configuration:

cp .env.example .env


Open .env and set:

MONGO_URI=your-mongodb-connection-string
PORT=5000


Start server:

npm start


Server runs at: http://localhost:5000

3️ Setup Frontend

Open a new terminal:

cd project
npm install


Start the development server:

npm run dev


Frontend runs at: http://localhost:5173

 API Endpoints Overview
Method	Endpoint	Description
GET	/posts	Fetch all posts
POST	/posts	Create post
GET	/posts/:id	Get post by ID
POST	/posts/:id/comment	Add com
