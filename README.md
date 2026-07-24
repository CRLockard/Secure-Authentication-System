# MERN Authentication Application

## Overview

This project is a simple full-stack authentication app built with the MERN stack.
It allows users to sign up as either an admin or a customer, log in, and see a friendly welcome page based on their role.

## Features

- User registration with role selection
- Password hashing using bcrypt
- Secure sign-in flow
- Friendly success and error messages
- Simple React frontend with React Router
- Express backend with MongoDB and Mongoose

## Technologies Used

- React
- React Router
- Axios
- Vite
- Node.js
- Express
- MongoDB
- Mongoose
- bcrypt
- cors
- dotenv

## Folder Structure

```text
backend/
  config/
  controllers/
  models/
  routes/
  .env.example
  package.json
  server.js

frontend/
  src/
    components/
    pages/
    services/
    styles/
  index.html
  package.json
  vite.config.js
```

## Installation

1. Open a terminal in the backend folder and run:
   ```bash
   npm install
   ```
2. Open a terminal in the frontend folder and run:
   ```bash
   npm install
   ```

## MongoDB Setup

1. Install MongoDB locally or use a cloud MongoDB Atlas instance.
2. Make sure the MongoDB service is running before starting the backend.
3. Update the backend .env file with your MongoDB connection string.

If you see the message:

```json
{
  "success": false,
  "message": "Database connection is unavailable. Please start MongoDB and try again."
}
```

then MongoDB is not reachable from the backend.

## Environment Variables

Create a .env file inside the backend folder using the example below:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/auth-app
```

## How to Run Backend

From the backend folder:

```bash
npm run dev
```

## How to Run Frontend

From the frontend folder:

```bash
npm run dev
```

## API Endpoints

### POST /signup

Creates a new user account.

### POST /signin

Signs in an existing user.

## Example Requests

### Signup

```bash
curl -X POST http://localhost:5000/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"student@example.com","password":"secret123","role":"customer"}'
```

### Signin

```bash
curl -X POST http://localhost:5000/signin \
  -H "Content-Type: application/json" \
  -d '{"email":"student@example.com","password":"secret123"}'
```

## Example Responses

### Signup Success

```json
{
  "success": true,
  "message": "Registration successful. Please sign in.",
  "data": {
    "email": "student@example.com",
    "role": "customer"
  }
}
```

### Signin Success

```json
{
  "success": true,
  "message": "Sign in successful.",
  "data": {
    "email": "student@example.com",
    "role": "customer"
  }
}
```

## Future Improvements

- Add protected routes
- Add JWT-based authentication
- Add password reset support
- Add form validation enhancements

# Secure-Authentication-System

Block 7.02 Workshop
