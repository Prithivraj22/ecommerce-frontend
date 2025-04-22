# 🛍️ E-commerce Web Application

A full-stack MERN-based e-commerce platform that allows users to browse products, manage their cart, and securely place orders. Includes admin capabilities for managing products and users.

## 🚀 Features
- 👤 User authentication (JWT-based)
- 🛒 Add/remove products from cart
- 📦 CRUD operations for products and users (Admin)
- 🔐 Secure RESTful API
- 📈 Order summary and checkout flow

## 🖥️ Tech Stack

### Frontend (React)
- React.js with Hooks
- Axios for API communication
- React Router for page navigation

### Backend (Node.js & Express)
- Express.js for API endpoints
- MongoDB & Mongoose for data persistence
- bcrypt for password hashing
- JWT for secure login sessions

## 📦 Repositories
- **Frontend**: [ecommerce-frontend](https://github.com/Prithivraj22/ecommerce-frontend)
- **Backend**: [ecommerce-backend](https://github.com/Prithivraj22/ecommerce-backend)

## 🛠️ Setup Instructions

### Backend
```bash
git clone https://github.com/Prithivraj22/ecommerce-backend
cd ecommerce-backend
npm install
npm run dev
```

> 🔑 Set up a `.env` file with:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### Frontend
```bash
git clone https://github.com/Prithivraj22/ecommerce-frontend
cd ecommerce-frontend
npm install
npm start
```


## 👨‍💻 Author
- [@Prithivraj22](https://github.com/Prithivraj22)