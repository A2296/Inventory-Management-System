# Inventory Management System - Backend

A REST API backend for an Inventory Management System, built with Node.js, Express, and MongoDB. Includes JWT-based authentication and user management.

> **Status:** Work in progress

## Features

- RESTful API for inventory management
- JWT authentication (login, token verification)
- User management (registration, roles/permissions)
- MongoDB data persistence via Mongoose

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express
- **Database:** MongoDB (Mongoose ODM)
- **Auth:** JSON Web Tokens (JWT)

## Prerequisites

- Node.js (v18+ recommended)
- MongoDB (local instance or Atlas connection string)
- npm or yarn

## Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd <project-folder>

# Install dependencies
npm install
```

## Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
MONGO_URI=mongodb://localhost:0000/database-name
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=1d
```

## Running the App

```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

The API will be available at `http://localhost:5000` (or your configured `PORT`).

## API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Authenticate and receive a JWT |

### Users
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users` | Get all users |
| GET | `/api/users/:id` | Get a single user |
| PUT | `/api/users/:id` | Update a user |
| DELETE | `/api/users/:id` | Delete a user |

### Inventory
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/inventory` | Get all inventory items |
| GET | `/api/inventory/:id` | Get a single item |
| POST | `/api/inventory` | Create a new item |
| PUT | `/api/inventory/:id` | Update an item |
| DELETE | `/api/inventory/:id` | Delete an item |

> Update this table as endpoints are added or changed.

## Project Structure

```
├── config/         # Database and app configuration
├── controllers/    # Route logic
├── middleware/      # Auth guards, error handling, etc.
├── models/         # Mongoose schemas
├── routes/         # API route definitions
├── .env
├── server.js       # App entry point
└── package.json
```

## Authentication Flow

1. User registers or logs in via `/api/auth`.
2. Server issues a signed JWT on successful login.
3. Client sends the token in the `Authorization` header (`Bearer <token>`) on subsequent requests.
4. Protected routes verify the token via middleware before granting access.

## Roadmap / TODO

- [ ] Finalize inventory CRUD endpoints
- [ ] Role-based access control (admin vs standard user)
- [ ] Input validation
- [ ] Pagination and filtering on list endpoints
- [ ] API tests
- [ ] Deployment setup

## License

Not yet decided.
