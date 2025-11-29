import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  image: {
    type: String,
    required: true
  }
});

const shippingAddressSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    type: String,
    required: true,
    trim: true
  },
  city: {
    type: String,
    required: true,
    trim: true
  },
  state: {
    type: String,
    required: true,
    trim: true
  },
  pincode: {
    type: String,
    required: true,
    match: [/^\d{6}$/, 'Please enter a valid 6-digit pincode']
  },
  phone: {
    type: String,
    required: true,
    match: [/^\d{10}$/, 'Please enter a valid 10-digit phone number']
  }
});

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  orderNumber: {
    type: String,
    unique: true,
    required: false // Will be generated automatically
  },
  items: [orderItemSchema],
  shippingAddress: shippingAddressSchema,
  paymentMethod: {
    type: String,
    enum: ['COD'],
    default: 'COD'
  },
  subtotal: {
    type: Number,
    required: true,
    min: 0
  },
  shippingCost: {
    type: Number,
    default: 0,
    min: 0
  },
  total: {
    type: Number,
    required: false, // Will be calculated automatically
    min: 0
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  notes: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Calculate total before saving (must run first)
orderSchema.pre('save', function(next) {
  // Calculate total
  this.total = this.subtotal + this.shippingCost;
  next();
});

// Generate order number before saving (must run after total calculation)
orderSchema.pre('save', async function(next) {
  if (!this.orderNumber) {
    try {
      // Generate a unique order number
      const date = new Date();
      const year = date.getFullYear().toString().slice(-2);
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
      
      this.orderNumber = `RD${year}${month}${day}${random}`;
      
      // Check for uniqueness (in case of collision)
      let attempts = 0;
      while (attempts < 5) {
        const existingOrder = await this.constructor.findOne({ orderNumber: this.orderNumber });
        if (!existingOrder) break;
        
        // Generate new number if collision
        const newRandom = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
        this.orderNumber = `RD${year}${month}${day}${newRandom}`;
        attempts++;
      }
    } catch (error) {
      console.error('Error generating order number:', error);
      // Fallback to timestamp-based number
      const timestamp = new Date().getTime();
      const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
      this.orderNumber = `RD${timestamp}${random}`;
    }
  }
  next();
});

export default mongoose.model('Order', orderSchema);
