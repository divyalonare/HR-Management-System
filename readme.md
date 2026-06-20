# HR Management System

![Node.js](https://img.shields.io/badge/Node.js-v18+-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-5.2.1-000000?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-9.6.3-13AA52?logo=mongodb&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=black)
![License](https://img.shields.io/badge/License-ISC-blue)
![npm](https://img.shields.io/badge/npm-v9+-CB3837?logo=npm&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-Authentication-000000?logo=jsonwebtokens&logoColor=white)

A comprehensive HR Management System built with Node.js, Express, and MongoDB. This application provides a complete solution for managing employees, leave requests, payroll, and administrative functions.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Authentication](#authentication)
- [License](#license)

## ✨ Features

- **User Authentication**: Secure JWT-based authentication system
- **Role-Based Access Control**: Admin and Employee roles with different permissions
- **Employee Management**: Add, update, and manage employee profiles
- **Leave Management**: Submit and track leave requests
- **Payroll System**: Manage employee payroll and salary calculations
- **Admin Dashboard**: Comprehensive admin panel for system management
- **Password Security**: Bcrypt-based password hashing
- **Input Validation**: Express-validator for robust data validation
- **Responsive UI**: Clean and user-friendly frontend interface

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Backend** | Node.js, Express.js 5.2.1 |
| **Database** | MongoDB, Mongoose 9.6.3 |
| **Authentication** | JWT (JSON Web Tokens), Bcrypt 6.0.0 |
| **Validation** | Express-validator 7.3.2 |
| **Frontend** | HTML5, CSS3, Vanilla JavaScript |
| **Tools** | Nodemon, npm, dotenv |

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)
- MongoDB (local or cloud instance)

### Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd HR-Management-System
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file in the root directory:
   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/hr-management
   JWT_SECRET=your_secret_key_here
   NODE_ENV=development
   ```

4. **Seed database (optional)**
   ```bash
   node seed.js
   ```

## ⚙️ Configuration

### Database Configuration
Configure your MongoDB connection in `config/database.js`. Update the connection string in your `.env` file.

### JWT Configuration
Set your JWT secret key in the `.env` file for secure token generation and verification.

### Port Configuration
Default port is 3000. Modify the PORT variable in `.env` to use a different port.

## 🚀 Running the Application

### Development Mode (with auto-reload)
```bash
npm start
```

### Production Mode
```bash
node index.js
```

The application will start on the configured port (default: 3000). Access the application at:
- Frontend: `http://localhost:3000`
- API: `http://localhost:3000/api`

## 📁 Project Structure

```
HR-Management-System/
├── config/
│   └── database.js          # Database configuration
├── controllers/
│   ├── adminController.js   # Admin-related operations
│   ├── employeeController.js# Employee-related operations
│   └── LeaveController.js   # Leave request management
├── middleware/
│   ├── authenticate.js      # JWT authentication middleware
│   └── authorize.js         # Role-based authorization
├── models/
│   ├── User.js              # User model schema
│   ├── leaveRequest.js      # Leave request model
│   └── payroll.js           # Payroll model
├── public/
│   ├── admin.html           # Admin dashboard
│   ├── employee.html        # Employee dashboard
│   ├── login.html           # Login page
│   ├── api.js               # Frontend API client
│   └── style.css            # Application styles
├── routes/
│   ├── auth.js              # Authentication routes
│   ├── employee.js          # Employee routes
│   └── main.js              # Main/index routes
├── index.js                 # Application entry point
├── seed.js                  # Database seed script
├── package.json             # Project dependencies
└── readme.md                # This file
```

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for secure authentication:

1. **Login**: Users submit credentials
2. **Token Generation**: Server generates JWT token
3. **Token Storage**: Client stores token locally
4. **Token Verification**: Token included in API requests
5. **Authorization**: Middleware checks token and user role

### User Roles
- **Admin**: Full system access and management capabilities
- **Employee**: Limited access to personal and leave information

## 🔧 Available Scripts

- `npm start` - Start the application with Nodemon (auto-reload on file changes)
- `npm test` - Run tests (not configured yet)

## 📝 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | 3000 |
| `MONGODB_URI` | MongoDB connection string | mongodb://localhost:27017/hr-management |
| `JWT_SECRET` | Secret key for JWT signing | your_secret_key_here |
| `NODE_ENV` | Environment type | development |

## 📄 License

This project is licensed under the ISC License.

---

**Note**: This is a development-stage HR Management System. For production deployment, ensure proper security measures including HTTPS, environment variable protection, and database backups are in place.