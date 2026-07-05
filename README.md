E-Commerce Backend

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

```

2. Install dependencies:
```bash
npm install

```


3. Create a `.env` file and configure your variables:
```env
PORT=8080
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
FRONTEND_URL=your_frontend_url
EMAIL_USER=your_smtp_user
EMAIL_PASS=your_smtp_pass

```


4. Start the server:
```bash
npm run dev

```



## 🚀 Deployment

This project is deployed on **Render.com**.

* **Live Base URL:** https://module5-ecommerce-backend-61zi.onrender.com

---

*Developed by: Gunasekaran S*

```
