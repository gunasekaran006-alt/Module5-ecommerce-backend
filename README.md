# Module 5 - E-Commerce Backend

This is a robust and secure Backend API built for an E-Commerce platform using the MERN stack.

## 🚀 Key Features
- **Security:** JWT-based authentication with `bcryptjs` encryption.
- **Advanced Auth:** Two-Factor Authentication (2FA) using `OTPAuth` and `Nodemailer`.
- **Protection:** Rate limiting (`express-rate-limit`) to prevent brute-force attacks and account lockout mechanisms.
- **Data Management:** RESTful CRUD APIs for Products, Orders, and User Profiles.
- **Querying:** Support for searching, filtering, and sorting products.
- **Role-Based Access Control (RBAC):** Middleware-based authorization for Admins and Users.

## 🛠 Tech Stack
- **Node.js** & **Express.js**
- **MongoDB** & **Mongoose**
- **JSON Web Tokens (JWT)**
- **OTPAuth** & **Nodemailer**
- **bcryptjs** (for Password Hashing)

## 📋 API Endpoints
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login-step1` | Login Part 1 (Password validation) |
| POST | `/api/auth/login-step2` | Login Part 2 (OTP verification) |
| GET | `/api/products` | Get all products (with search/filter) |
| POST | `/api/orders` | Create a new order (Protected) |
| GET | `/api/profile` | Get user profile info (Protected) |

## ⚙️ How to Run Locally
1. Clone the repository:
   ```bash
   git clone https://github.com/gunasekaran006-alt/Module5-ecommerce-backend.git