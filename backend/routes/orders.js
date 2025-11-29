import express from 'express';
import nodemailer from 'nodemailer';
import Order from '../models/Order.js';
import { authenticateToken } from './auth.js';

const router = express.Router();

// Email transporter setup
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// Send order notification email to admin
const sendOrderNotificationEmail = async (order, user) => {
  const transporter = createTransporter();
  
  const itemsList = order.items.map(item => `
    <tr style="border-bottom: 1px solid #eee;">
      <td style="padding: 10px; text-align: center;">
        <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 5px;">
      </td>
      <td style="padding: 10px;">${item.name}</td>
      <td style="padding: 10px; text-align: center;">${item.quantity}</td>
      <td style="padding: 10px; text-align: right;">₹${item.price.toLocaleString()}</td>
      <td style="padding: 10px; text-align: right;">₹${(item.price * item.quantity).toLocaleString()}</td>
    </tr>
  `).join('');

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.ORDER_NOTIFICATION_EMAIL,
    subject: `New Order Received - ${order.orderNumber}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; background-color: #f8f9fa; padding: 20px;">
        <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h1 style="color: #2d5a27; text-align: center; margin-bottom: 30px;">🌱 New Order Received!</h1>
          
          <div style="background-color: #e8f5e8; padding: 20px; border-radius: 5px; margin-bottom: 25px;">
            <h2 style="color: #2d5a27; margin: 0 0 10px 0;">Order Details</h2>
            <p style="margin: 5px 0;"><strong>Order Number:</strong> ${order.orderNumber}</p>
            <p style="margin: 5px 0;"><strong>Date:</strong> ${new Date(order.createdAt).toLocaleDateString('en-IN', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}</p>
            <p style="margin: 5px 0;"><strong>Payment Method:</strong> Cash on Delivery (COD)</p>
            <p style="margin: 5px 0;"><strong>Status:</strong> ${order.status.toUpperCase()}</p>
          </div>

          <div style="background-color: #fff3cd; padding: 20px; border-radius: 5px; margin-bottom: 25px;">
            <h2 style="color: #856404; margin: 0 0 15px 0;">Customer Information</h2>
            <div style="display: flex; flex-wrap: wrap; gap: 20px;">
              <div style="flex: 1; min-width: 200px;">
                <p style="margin: 5px 0;"><strong>Name:</strong> ${user.name}</p>
                <p style="margin: 5px 0;"><strong>Email:</strong> ${user.email}</p>
                <p style="margin: 5px 0;"><strong>Phone:</strong> ${user.phone}</p>
              </div>
            </div>
          </div>

          <div style="background-color: #d1ecf1; padding: 20px; border-radius: 5px; margin-bottom: 25px;">
            <h2 style="color: #0c5460; margin: 0 0 15px 0;">Shipping Address</h2>
            <p style="margin: 5px 0;"><strong>Full Name:</strong> ${order.shippingAddress.fullName}</p>
            <p style="margin: 5px 0;"><strong>Address:</strong> ${order.shippingAddress.address}</p>
            <p style="margin: 5px 0;"><strong>City:</strong> ${order.shippingAddress.city}</p>
            <p style="margin: 5px 0;"><strong>State:</strong> ${order.shippingAddress.state}</p>
            <p style="margin: 5px 0;"><strong>Pincode:</strong> ${order.shippingAddress.pincode}</p>
            <p style="margin: 5px 0;"><strong>Phone:</strong> ${order.shippingAddress.phone}</p>
          </div>

          <div style="margin-bottom: 25px;">
            <h2 style="color: #2d5a27; margin: 0 0 15px 0;">Order Items</h2>
            <table style="width: 100%; border-collapse: collapse; background-color: white;">
              <thead>
                <tr style="background-color: #2d5a27; color: white;">
                  <th style="padding: 12px; text-align: center;">Image</th>
                  <th style="padding: 12px; text-align: left;">Product</th>
                  <th style="padding: 12px; text-align: center;">Qty</th>
                  <th style="padding: 12px; text-align: right;">Price</th>
                  <th style="padding: 12px; text-align: right;">Total</th>
                </tr>
              </thead>
              <tbody>
                ${itemsList}
              </tbody>
            </table>
          </div>

          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin-bottom: 25px;">
            <h2 style="color: #2d5a27; margin: 0 0 15px 0;">Order Summary</h2>
            <div style="display: flex; justify-content: space-between; margin: 10px 0;">
              <span>Subtotal:</span>
              <span>₹${order.subtotal.toLocaleString()}</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin: 10px 0;">
              <span>Shipping Cost:</span>
              <span>₹${order.shippingCost.toLocaleString()}</span>
            </div>
            <hr style="margin: 15px 0;">
            <div style="display: flex; justify-content: space-between; margin: 10px 0; font-size: 18px; font-weight: bold; color: #2d5a27;">
              <span>Total Amount:</span>
              <span>₹${order.total.toLocaleString()}</span>
            </div>
          </div>

          ${order.notes ? `
          <div style="background-color: #fff; border-left: 4px solid #2d5a27; padding: 15px; margin-bottom: 25px;">
            <h3 style="color: #2d5a27; margin: 0 0 10px 0;">Customer Notes:</h3>
            <p style="margin: 0;">${order.notes}</p>
          </div>
          ` : ''}

          <div style="text-align: center; padding: 20px; border-top: 2px solid #2d5a27;">
            <p style="color: #666; margin: 0;">
              This order requires <strong>Cash on Delivery</strong> payment.<br>
              Please process and prepare for delivery.
            </p>
          </div>
        </div>
      </div>
    `
  };

  await transporter.sendMail(mailOptions);
};

// Send order confirmation email to customer
const sendOrderConfirmationEmail = async (order, user) => {
  const transporter = createTransporter();
  
  const itemsList = order.items.map(item => `
    <tr style="border-bottom: 1px solid #eee;">
      <td style="padding: 10px;">${item.name}</td>
      <td style="padding: 10px; text-align: center;">${item.quantity}</td>
      <td style="padding: 10px; text-align: right;">₹${item.price.toLocaleString()}</td>
      <td style="padding: 10px; text-align: right;">₹${(item.price * item.quantity).toLocaleString()}</td>
    </tr>
  `).join('');

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: `Order Confirmation - ${order.orderNumber}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #2d5a27; color: white; padding: 20px; text-align: center;">
          <h1 style="margin: 0;">🌱 Rythu Dipo</h1>
          <p style="margin: 10px 0 0 0;">Your trusted partner for agricultural products</p>
        </div>
        
        <div style="padding: 30px; background-color: #f8f9fa;">
          <h2 style="color: #2d5a27;">Thank you for your order!</h2>
          <p>Hello ${user.name},</p>
          <p>Your order has been successfully placed and will be delivered via <strong>Cash on Delivery (COD)</strong>.</p>
          
          <div style="background-color: white; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #2d5a27; margin-top: 0;">Order Details</h3>
            <p><strong>Order Number:</strong> ${order.orderNumber}</p>
            <p><strong>Order Date:</strong> ${new Date(order.createdAt).toLocaleDateString('en-IN')}</p>
            <p><strong>Payment Method:</strong> Cash on Delivery</p>
          </div>

          <div style="background-color: white; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #2d5a27; margin-top: 0;">Delivery Address</h3>
            <p>${order.shippingAddress.fullName}<br>
            ${order.shippingAddress.address}<br>
            ${order.shippingAddress.city}, ${order.shippingAddress.state} - ${order.shippingAddress.pincode}<br>
            Phone: ${order.shippingAddress.phone}</p>
          </div>

          <div style="background-color: white; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #2d5a27; margin-top: 0;">Order Items</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <thead>
                <tr style="background-color: #f8f9fa;">
                  <th style="padding: 10px; text-align: left;">Product</th>
                  <th style="padding: 10px; text-align: center;">Qty</th>
                  <th style="padding: 10px; text-align: right;">Price</th>
                  <th style="padding: 10px; text-align: right;">Total</th>
                </tr>
              </thead>
              <tbody>
                ${itemsList}
              </tbody>
            </table>
            
            <div style="margin-top: 15px; padding-top: 15px; border-top: 2px solid #2d5a27; text-align: right;">
              <p style="margin: 5px 0; font-size: 18px; font-weight: bold; color: #2d5a27;">
                Total: ₹${order.total.toLocaleString()}
              </p>
            </div>
          </div>

          <div style="background-color: #d4edda; padding: 15px; border-radius: 5px; border-left: 4px solid #28a745;">
            <p style="margin: 0; color: #155724;">
              <strong>What's next?</strong><br>
              • We'll process your order within 24 hours<br>
              • You'll receive a tracking notification once shipped<br>
              • Pay cash upon delivery<br>
              • Enjoy your agricultural products!
            </p>
          </div>
        </div>
        
        <div style="background-color: #2d5a27; color: white; padding: 20px; text-align: center;">
          <p style="margin: 0;">Questions? Contact us at ${process.env.EMAIL_USER}</p>
          <p style="margin: 10px 0 0 0; font-size: 12px;">© 2025 Rythu Dipo - Supporting Farmers, Growing Together</p>
        </div>
      </div>
    `
  };

  await transporter.sendMail(mailOptions);
};

// Create new order
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { items, shippingAddress, notes } = req.body;

    // Validate required fields
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Order items are required'
      });
    }

    if (!shippingAddress) {
      return res.status(400).json({
        success: false,
        message: 'Shipping address is required'
      });
    }

    // Calculate subtotal
    const subtotal = items.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);

    // Create order
    const order = new Order({
      userId: req.user._id,
      items,
      shippingAddress,
      subtotal,
      shippingCost: 0, // Free shipping for now
      notes: notes || ''
    });

    await order.save();

    // Send notification emails
    try {
      await Promise.all([
        sendOrderNotificationEmail(order, req.user),
        sendOrderConfirmationEmail(order, req.user)
      ]);
    } catch (emailError) {
      console.error('Email sending error:', emailError);
      // Continue with order creation even if email fails
    }

    res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      data: {
        order: {
          id: order._id,
          orderNumber: order.orderNumber,
          total: order.total,
          status: order.status,
          createdAt: order.createdAt
        }
      }
    });

  } catch (error) {
    console.error('Order creation error:', error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', ')
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to create order. Please try again later.'
    });
  }
});

// Get user orders
router.get('/my-orders', authenticateToken, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      message: 'Orders fetched successfully',
      data: { orders }
    });

  } catch (error) {
    console.error('Fetch orders error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch orders'
    });
  }
});

// Get single order
router.get('/:orderId', authenticateToken, async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findOne({ 
      _id: orderId, 
      userId: req.user._id 
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.json({
      success: true,
      message: 'Order fetched successfully',
      data: { order }
    });

  } catch (error) {
    console.error('Fetch order error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch order'
    });
  }
});

export default router;
