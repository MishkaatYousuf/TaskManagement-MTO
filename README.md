Task Management System (MERN Stack):

A simple Task Management Web Application built using the MERN stack.
The application supports user authentication and task CRUD operations, with additional usability features like search, filtering, and pagination.

Tech Stack:

Frontend

React (Hooks)

Axios

React Router

CSS (custom styling)

Backend

Node.js

Express.js

MongoDB (Atlas)

JWT Authentication

bcrypt (password hashing)

Setup Instructions:
1️⃣ Clone the repository
git clone <your-repository-url>
cd <repository-folder>

2️⃣ Backend Setup
cd server
npm install


Create a .env file inside the server folder:

PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret_key


Start the backend server:

npm run dev


Backend will run on:

http://localhost:5000

3️⃣ Frontend Setup
cd ../client
npm install
npm start


Frontend will run on:

http://localhost:3000

Authentication Flow:

User registers via the Register page

Password is hashed using bcrypt

User logs in and receives a JWT

JWT is stored in localStorage

Protected routes use JWT for authorization

 API Routes:
 Authentication Routes
POST	/api/auth/register ->	Register a new user; 
POST	/api/auth/login	-> Login user and return JWT; 
  
  Task Routes (Protected):
Method	Endpoint	Description
GET	/api/tasks	-> Get logged-in user’s tasks
POST	/api/tasks	-> Create a new task
PUT	/api/tasks/:id	-> Update an existing task
DELETE	/api/tasks/:id	-> Delete a task

All task routes require a valid JWT token in the Authorization header.

Features Implemented:

User Registration & Login

JWT-based Authentication

Task CRUD Operations

Task Status Management (Pending / In Progress / Completed)

User-specific task visibility

Search tasks by title

Filter tasks by status

Client-side pagination

Logout functionality

Input validation & edge-case handling

Clean, consistent UI

 Notes:

MongoDB collections are created automatically via Mongoose

Client-side pagination and filtering are used for simplicity

Environment variables are used for sensitive data

🏁 Conclusion

This project demonstrates full-stack development, authentication, RESTful APIs, and clean UI practices.
