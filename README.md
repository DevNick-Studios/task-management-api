# Task Management API

This project is a RESTful API built with Node.js, Express, TypeScript, and MongoDB, designed to manage users, projects, and tasks in a task management system. Users can register, log in, create and manage their projects, and organize tasks within those projects. Advanced features include task filtering, bulk status updates and soft delete functionality.

## Features

- **User Authentication**: Secure user registration and login with JWT-based authentication.
- **Project Management**: Users can create, view, update, and delete projects.
- **Task Management**: Manage tasks within projects, filter by status or due date, and bulk update task statuses.
- **Soft Deletes**: Soft delete functionality for projects and tasks to allow data recovery.
- **Pagination and Sorting**: For task lists to optimize data retrieval and enhance user experience.
- **Global Error Handling**: Custom error responses for improved debugging and user feedback.
- **Security**: Only authenticated users can access specific routes; JWT protects all routes except registration and login.

## Requirements

- **Node.js** >= 14.x
- **MongoDB**
- **TypeScript**
- **Docker** (for containerization)

## Technologies Used

- **Node.js & Express** for the API server
- **MongoDB & Mongoose** for database and schema modeling
- **TypeScript** for type safety and error prevention
- **JWT** for secure user authentication
- **Bcrypt** for password hashing
- **Jest|Supertest** for testing

## Project Structure

```plaintext
src
├── server.ts             # Connects to db and starts the server
├── app.ts                # Main app configuration and middleware setup
├── modules
│   ├── auth              # Authentication logic (registration, login)
│   ├── projects          # Project-related routes, controllers, and models
│   └── tasks             # Task-related routes, controllers, and models
├── configs               # Configuration files (environment variables, database, etc.)
├── interfaces            # TypeScript interfaces for type safety
├── middlewares           # Middleware for error handling, validation, and authorization
└── __tests__             # Integration tests for key API endpoints
```

## API Endpoints

### Authentication

- **POST /auth/register** - Register a new user
- **POST /auth/login** - Authenticate a user and get a JWT token

### Projects

- **POST /projects** - Create a new project
- **GET /projects** - Fetch all projects for the authenticated user
- **GET /projects/:projectId** - Fetch a single project by ID
- **PATCH /projects/:projectId** - Update a project
- **DELETE /projects/:projectId** - Soft delete a project

### Tasks

- **POST /projects/:projectId/tasks** - Create a new task under a specific project
- **GET /projects/:projectId/tasks** - Fetch all tasks for a project (supports pagination, sorting, and filtering by status/due date)
- **GET /projects/:projectId/tasks/:taskId** - Fetch a single task by ID
- **PATCH /projects/:projectId/tasks/:taskId** - Update an existing task
- **DELETE /projects/:projectId/tasks/:taskId** - Soft delete a task
- **PATCH /projects/:projectId/tasks/bulk-status** - Bulk update status for multiple tasks

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/devnickjr/task-management-api.git
cd task-management-api
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env` file in the root directory with the following variables:

```plaintext
PORT=3000
JWT_SEC=hdsjknbsodjknlik
DATABASE_URI=mongodb://127.0.0.1/task-db-test
TEST_MONGO_URI=mongodb://127.0.0.1/task-db-test-db
```

### 4. Run the Server

To start the server in development mode:

```bash
npm run dev
```

The API should now be accessible at `http://localhost:3000`.

## Testing

### Running Integration Tests

Ensure your MongoDB service is running, then execute:

```bash
npm run test
```


## Deployment

1. **Containerization with Docker**:
   Build and run the API in a Docker container using the provided `Dockerfile`.


   ```bash
   npm run docker:build
   npm run docker:run
   ```

2. **Hosting on Heroku**:
   Deploy to [Heroku](https://www.heroku.com/) (or another cloud provider) by following their deployment instructions. Make sure to set up environment variables in your hosting environment.

## API Documentation

A detailed API documentation is provided in a Postman collection. [Link to Postman Collection](#)

### Example Requests

**Create a Task**:

```http
POST /projects/:projectId/tasks
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Design homepage",
  "description": "Initial design for homepage layout",
  "status": "in-progress",
  "due_date": "2024-11-09"
}
```

**Response**:

```json
{
  "_id": "task_id",
  "title": "Design homepage",
  "status": "in-progress",
  "due_date": "2024-11-09",
  "project": "project_id",
  "createdAt": "2024-11-01T10:00:00Z",
  "updatedAt": "2024-11-01T10:00:00Z"
}
```
