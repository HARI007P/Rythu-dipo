# Rythu Dipo - Agricultural Products Marketplace

A full-stack e-commerce platform for agricultural products built with React, Node.js, Express, and MongoDB.

## 🌱 Features

### Frontend
- **React + Vite** with modern UI/UX using **Tailwind CSS**
- **Responsive design** that works on all devices
- **Product catalog** with search and filtering
- **Shopping cart** with persistent storage
- **User authentication** with email OTP verification
- **Cash on Delivery (COD)** checkout system
- **Toast notifications** for user feedback

### Backend
- **Node.js + Express** RESTful API
- **MongoDB** with Mongoose for data persistence
- **JWT-based authentication** with secure OTP system
- **Email notifications** using Nodemailer
- **Order management** with email confirmations
- **Comprehensive validation** and error handling

## 🚀 Tech Stack

| Component | Technology |
|-----------|------------|
| **Frontend** | React 18, Vite, Tailwind CSS, React Router DOM |
| **Backend** | Node.js, Express.js, MongoDB, Mongoose |
| **Authentication** | JWT, bcryptjs, Email OTP |
| **Email** | Nodemailer with Gmail |
| **Payment** | Cash on Delivery (COD) only |
| **UI Libraries** | Lucide React, React Hot Toast |

## 📁 Project Structure

```
Rythu-Dipo/
├── backend/
│   ├── data/
│   │   └── products.json          # Product catalog
│   ├── models/
│   │   ├── User.js               # User model with OTP
│   │   └── Order.js              # Order model
│   ├── routes/
│   │   ├── auth.js               # Authentication routes
│   │   ├── products.js           # Product routes
│   │   └── orders.js             # Order routes
│   ├── .env                      # Environment variables
│   ├── package.json
│   └── index.js                  # Express server
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   └── OTPInput.jsx
│   │   ├── context/
│   │   │   └── CartContext.jsx   # Cart state management
│   │   ├── pages/
│   │   │   ├── Products.jsx      # Main product listing
│   │   │   ├── Cart.jsx
│   │   │   ├── Checkout.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── VerifyOTP.jsx
│   │   │   └── Orders.jsx
│   │   ├── services/
│   │   │   └── api.js             # API service layer
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env                      # Frontend environment
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
└── README.md
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB (local or MongoDB Atlas)
- Gmail account with App Password for emails

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```



4. **Start MongoDB:**
   - **Local MongoDB:** Start your MongoDB service
   - **MongoDB Atlas:** Use your Atlas connection string in `MONGODB_URI`

5. **Start the backend server:**
   ```bash
   npm run dev
   ```
   
   The backend will run on `http://localhost:5000`

### Frontend Setup

1. **Open a new terminal and navigate to frontend:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   
   The `frontend/.env` should contain:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

4. **Start the frontend development server:**
   ```bash
   npm run dev
   ```
   
   The frontend will run on `http://localhost:5173`

## 📧 Email Configuration

To enable OTP verification and order notifications:

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate an App Password:**
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a password for "Mail"
3. **Use the App Password** (not your regular password) in `EMAIL_PASS`

## 🎯 Usage

### For Customers:

1. **Browse Products:** Visit the homepage to see all available products
2. **Search & Filter:** Use the search bar and category filters
3. **Add to Cart:** Click on products to add them to your cart
4. **Sign Up:** Create an account with email verification
5. **Checkout:** Complete your order with Cash on Delivery

### For Testing:

1. **Backend API:** `http://localhost:5000/health`
2. **Product API:** `http://localhost:5000/api/products`
3. **Frontend:** `http://localhost:5173`

## 🌟 Key Features Explained

### Authentication Flow
1. User signs up with email, password, name, phone
2. System generates 6-digit OTP and sends via email
3. User verifies OTP within 10 minutes
4. Account is activated and JWT token is issued

### Cart System
- **Persistent Storage:** Cart data saved in localStorage
- **Real-time Updates:** Cart count updates across components
- **Context API:** Global cart state management

### Order Process
1. User adds items to cart
2. Proceeds to checkout with shipping address
3. Order is saved to MongoDB
4. Email notifications sent to both customer and admin
5. Payment method: Cash on Delivery only

### Product Management
- Products stored in JSON file for demo
- Categories: Tools and Pesticides
- Search functionality across name, description, features
- Responsive product cards with hover effects

## 🛡️ Security Features

- **Password Hashing:** bcryptjs with salt rounds
- **JWT Authentication:** Secure token-based auth
- **OTP Security:** Hashed OTP storage with expiry
- **Rate Limiting:** OTP resend limits and cooldowns
- **Input Validation:** Comprehensive validation on all inputs

## 🎨 UI/UX Features

- **Modern Design:** Clean, agricultural-themed interface
- **Responsive Layout:** Works on mobile, tablet, desktop
- **Loading States:** Smooth loading animations
- **Toast Notifications:** User-friendly feedback
- **Error Handling:** Graceful error messages
- **Accessibility:** Proper ARIA labels and keyboard navigation

## 📱 Pages Overview

- **`/`** - Home/Products page with search and filters
- **`/cart`** - Shopping cart with item management
- **`/checkout`** - Order placement with address form
- **`/signup`** - User registration
- **`/verify-otp`** - Email verification
- **`/login`** - User authentication
- **`/orders`** - Order history (authenticated users)

## 🚨 Troubleshooting

### Common Issues:

1. **MongoDB Connection Failed:**
   - Ensure MongoDB is running
   - Check connection string in `.env`

2. **Email Not Sending:**
   - Verify Gmail App Password
   - Check email credentials in `.env`

3. **Frontend API Errors:**
   - Ensure backend is running on port 5000
   - Check `VITE_API_URL` in frontend `.env`

4. **Build Issues:**
   - Clear node_modules: `rm -rf node_modules package-lock.json`
   - Reinstall: `npm install`

## 🔧 Development Commands

### Backend:
```bash
npm start          # Production server
npm run dev        # Development with nodemon
```

### Frontend:
```bash
npm run dev        # Development server
npm run build      # Production build
npm run preview    # Preview production build
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request





## 🙏 Acknowledgments

- Icons by [Lucide](https://lucide.dev/)
- UI Framework: [Tailwind CSS](https://tailwindcss.com/)
- Images: [Unsplash](https://unsplash.com/)

---

