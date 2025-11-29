# 🚀 Rythu Dipo - Quick Start Guide

## ✅ Dependencies Installed Successfully!

Both frontend and backend dependencies have been installed. Follow these steps to get your project running:

## 📧 1. Configure Email Settings (REQUIRED)

Edit `backend/.env` with your Gmail credentials:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/rythu-dipo
JWT_SECRET=your_super_secret_jwt_key_here_change_this_in_production
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
ORDER_NOTIFICATION_EMAIL=hari07p@gmail.com
```

### How to get Gmail App Password:
1. Enable 2-Factor Authentication on your Gmail account
2. Go to Google Account Settings → Security → 2-Step Verification → App passwords
3. Generate a password for "Mail"
4. Use this App Password (NOT your regular Gmail password) in `EMAIL_PASS`

## 🗄️ 2. Start MongoDB

Make sure MongoDB is running on your system:
- **Windows**: Start MongoDB service or run `mongod`
- **Mac/Linux**: Start MongoDB service
- **Alternative**: Use MongoDB Atlas (cloud) - just update the `MONGODB_URI` in `.env`

## 🔧 3. Start the Backend Server

```bash
cd backend
npm run dev
```

Server will start on `http://localhost:5000`

## 🎨 4. Start the Frontend (New Terminal)

```bash
cd frontend
npm run dev
```

Frontend will start on `http://localhost:5173`

## 🎯 5. Test the Application

1. **Visit**: `http://localhost:5173`
2. **Browse products** on the home page
3. **Test signup flow**: Create account → Verify OTP via email
4. **Test shopping**: Add items to cart → Checkout → Place order
5. **Check emails**: Order confirmation sent to customer, notification sent to admin

## 🌟 Key Features to Test:

### Authentication
- ✅ Signup with email verification
- ✅ OTP system with resend functionality
- ✅ Login with JWT authentication

### Shopping
- ✅ Product catalog with search & filters
- ✅ Detailed product pages
- ✅ Shopping cart management
- ✅ Checkout with address form
- ✅ Cash on Delivery (COD)

### Order Management
- ✅ Order placement with email notifications
- ✅ Order history and tracking
- ✅ Detailed order views

## 🐛 Troubleshooting

### Backend Issues:
- **MongoDB connection failed**: Ensure MongoDB is running
- **Email not sending**: Check Gmail App Password in `.env`
- **Port 5000 in use**: Change `PORT` in `.env`

### Frontend Issues:
- **API errors**: Ensure backend is running on port 5000
- **Build errors**: Clear node_modules and reinstall: `rm -rf node_modules package-lock.json && npm install`

## 📂 Project Structure

```
Rythu-Dipo/
├── backend/              # Node.js + Express + MongoDB
│   ├── data/products.json   # Product catalog
│   ├── models/             # User & Order models
│   ├── routes/             # API routes
│   └── index.js           # Express server
├── frontend/             # React + Vite + Tailwind
│   ├── src/pages/         # All pages
│   ├── src/components/    # Reusable components
│   ├── src/context/       # Cart context
│   └── src/services/      # API integration
└── README.md             # Complete documentation
```

## 🎉 Success!

If everything is working correctly, you should see:
- ✅ Products loading on the homepage
- ✅ Beautiful, responsive design
- ✅ Working cart functionality
- ✅ Email notifications for OTP and orders
- ✅ Complete signup → shopping → checkout flow

**Need help?** Check the main `README.md` for detailed documentation!

---

**Made with ❤️ for farmers | Rythu Dipo 🌱**
