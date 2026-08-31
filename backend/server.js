import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// User Schema
const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'customer', 'tour_operator', 'hotel_partner'],
    default: 'customer'
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastLogin: {
    type: Date
  }
});

const User = mongoose.model('User', userSchema);

// Destination/Package Schema
const packageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  destination: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  bookings: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  },
  description: String,
  inclusions: [String],
  image: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Package = mongoose.model('Package', packageSchema);

// Itinerary Schema
const itinerarySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  packageId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Package'
  },
  packageName: String,
  days: {
    type: Number,
    required: true
  },
  hotels: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Itinerary = mongoose.model('Itinerary', itinerarySchema);

// Hotel Schema
const hotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  rooms: {
    type: Number,
    required: true
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  partner: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Hotel = mongoose.model('Hotel', hotelSchema);

// Room Schema
const roomSchema = new mongoose.Schema({
  hotel: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  available: {
    type: Number,
    required: true
  },
  booked: {
    type: Number,
    default: 0
  },
  price: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Room = mongoose.model('Room', roomSchema);

// Booking Schema
const bookingSchema = new mongoose.Schema({
  customer: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  package: {
    type: String,
    required: true
  },
  dates: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['confirmed', 'pending', 'cancelled'],
    default: 'pending'
  },
  paymentStatus: {
    type: String,
    enum: ['paid', 'pending', 'refunded'],
    default: 'pending'
  },
  bookingDate: {
    type: Date,
    default: Date.now
  }
});

const Booking = mongoose.model('Booking', bookingSchema);

// Invoice Schema
const invoiceSchema = new mongoose.Schema({
  invoiceNo: {
    type: String,
    required: true,
    unique: true
  },
  customer: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  package: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['paid', 'pending', 'overdue'],
    default: 'pending'
  },
  date: {
    type: Date,
    default: Date.now
  },
  dueDate: {
    type: Date,
    required: true
  }
});

const Invoice = mongoose.model('Invoice', invoiceSchema);

// Review Schema
const reviewSchema = new mongoose.Schema({
  customer: {
    type: String,
    required: true
  },
  package: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['approved', 'pending', 'rejected'],
    default: 'pending'
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Review = mongoose.model('Review', reviewSchema);

// Coupon Schema
const couponSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true
  },
  discount: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    enum: ['percentage', 'flat'],
    required: true
  },
  minPurchase: {
    type: Number,
    required: true
  },
  maxDiscount: {
    type: Number
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  },
  expiry: {
    type: Date,
    required: true
  },
  usage: {
    type: Number,
    default: 0
  },
  maxUsage: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Coupon = mongoose.model('Coupon', couponSchema);

// Settings Schema
const settingsSchema = new mongoose.Schema({
  siteName: {
    type: String,
    default: 'Travel Tour Management System'
  },
  siteEmail: String,
  sitePhone: String,
  currency: {
    type: String,
    default: 'INR'
  },
  timezone: {
    type: String,
    default: 'Asia/Kolkata'
  },
  maintenanceMode: {
    type: Boolean,
    default: false
  },
  allowRegistration: {
    type: Boolean,
    default: true
  },
  requireApproval: {
    type: Boolean,
    default: false
  },
  taxRate: {
    type: Number,
    default: 18
  },
  cancellationPolicy: String,
  refundPolicy: String,
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const Settings = mongoose.model('Settings', settingsSchema);

function pickUpdates(body, keys) {
  const updates = {};
  for (const key of keys) {
    if (body[key] !== undefined) updates[key] = body[key];
  }
  return updates;
}

function authenticate(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}

function requireAdmin(req, res, next) {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
}

function rangeStart(range) {
  const start = new Date();
  if (range === 'week') start.setDate(start.getDate() - 7);
  else if (range === 'quarter') start.setMonth(start.getMonth() - 3);
  else if (range === 'year') start.setFullYear(start.getFullYear() - 1);
  else start.setMonth(start.getMonth() - 1);
  return start;
}

function duplicateError(error) {
  return error?.code === 11000;
}

async function nextInvoiceNo() {
  const now = new Date();
  const prefix = `INV-${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  const count = await Invoice.countDocuments();
  return `${prefix}-${String(count + 1).padStart(3, '0')}`;
}

async function createPaidInvoice(booking) {
  const existing = await Invoice.findOne({
    customer: booking.customer,
    email: booking.email,
    package: booking.package,
    amount: booking.amount
  });
  if (existing) return existing;
  const due = new Date();
  due.setDate(due.getDate() + 7);
  const invoice = new Invoice({
    invoiceNo: await nextInvoiceNo(),
    customer: booking.customer,
    email: booking.email,
    package: booking.package,
    amount: booking.amount,
    status: 'paid',
    dueDate: due
  });
  await invoice.save();
  return invoice;
}

async function refreshPackageRating(packageName) {
  if (!packageName) return;
  const approved = await Review.find({ package: packageName, status: 'approved' });
  const avg = approved.length
    ? approved.reduce((sum, review) => sum + review.rating, 0) / approved.length
    : 0;
  await Package.findOneAndUpdate({ name: packageName }, { rating: Number(avg.toFixed(1)) });
}

// Log collection name for debugging
console.log('User collection name:', User.collection.name);

// Routes

// Signup Route
app.post('/api/signup', async (req, res) => {
  try {
    const { fullName, email, phone, password, role } = req.body;

    const settings = await Settings.findOne({});
    if (settings && settings.allowRegistration === false) {
      return res.status(403).json({ message: 'Registration is currently disabled' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      fullName,
      email,
      phone,
      password: hashedPassword,
      role,
      status: settings?.requireApproval ? 'inactive' : 'active'
    });

    await newUser.save();

    const message = settings?.requireApproval
      ? 'Account created. Wait for admin approval before logging in.'
      : 'User created successfully';

    res.status(201).json({ message, user: { fullName, email, role, status: newUser.status } });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Server error during signup' });
  }
});

// Login Route
app.post('/api/login', async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // Find user by email and role
    const user = await User.findOne({ email, role });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials or role' });
    }

    if (user.status === 'inactive') {
      return res.status(403).json({ message: 'Account is inactive. Contact an administrator.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Update last login timestamp in MongoDB
    user.lastLogin = new Date();
    await user.save();
    console.log(`User ${email} logged in successfully at ${user.lastLogin}`);

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        lastLogin: user.lastLogin
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
});

// Get All Users Route (for debugging)
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    console.log('Total users in database:', users.length);
    console.log('Users:', JSON.stringify(users, null, 2));
    res.status(200).json({ count: users.length, users });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Server error fetching users' });
  }
});

app.use('/api/admin', authenticate, requireAdmin);

// Admin User Management Routes
app.get('/api/admin/users', async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users' });
  }
});

app.post('/api/admin/users', async (req, res) => {
  try {
    const { fullName, email, phone, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ fullName, email, phone, password: hashedPassword, role });
    await newUser.save();
    const safeUser = newUser.toObject();
    delete safeUser.password;
    res.status(201).json({ message: 'User created successfully', user: safeUser });
  } catch (error) {
    if (duplicateError(error)) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }
    res.status(500).json({ message: 'Error creating user' });
  }
});

app.put('/api/admin/users/:id', async (req, res) => {
  try {
    const updates = pickUpdates(req.body, ['fullName', 'email', 'phone', 'role', 'status']);
    if (req.body.password) {
      updates.password = await bcrypt.hash(req.body.password, 10);
    }
    const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user' });
  }
});

app.delete('/api/admin/users/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user' });
  }
});

// Package Management Routes
app.get('/api/admin/packages', async (req, res) => {
  try {
    const packages = await Package.find({});
    res.status(200).json({ packages });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching packages' });
  }
});

app.post('/api/admin/packages', async (req, res) => {
  try {
    const newPackage = new Package(req.body);
    await newPackage.save();
    res.status(201).json({ message: 'Package created successfully', package: newPackage });
  } catch (error) {
    res.status(500).json({ message: 'Error creating package' });
  }
});

app.put('/api/admin/packages/:id', async (req, res) => {
  try {
    const updates = pickUpdates(req.body, ['name', 'destination', 'duration', 'price', 'rating', 'bookings', 'status', 'description', 'inclusions', 'image']);
    const pkg = await Package.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
    if (!pkg) {
      return res.status(404).json({ message: 'Package not found' });
    }
    res.status(200).json({ message: 'Package updated successfully', package: pkg });
  } catch (error) {
    console.error('Error updating package:', error);
    res.status(500).json({ message: 'Error updating package', error: error.message });
  }
});

app.delete('/api/admin/packages/:id', async (req, res) => {
  try {
    await Package.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Package deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting package' });
  }
});

// Itinerary Management Routes
app.get('/api/admin/itineraries', async (req, res) => {
  try {
    const itineraries = await Itinerary.find({});
    res.status(200).json({ itineraries });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching itineraries' });
  }
});

app.post('/api/admin/itineraries', async (req, res) => {
  try {
    const payload = { ...req.body };
    if (payload.packageName && !payload.packageId) {
      const pkg = await Package.findOne({ name: payload.packageName });
      if (pkg) payload.packageId = pkg._id;
    }
    const newItinerary = new Itinerary(payload);
    await newItinerary.save();
    res.status(201).json({ message: 'Itinerary created successfully', itinerary: newItinerary });
  } catch (error) {
    res.status(500).json({ message: 'Error creating itinerary' });
  }
});

app.put('/api/admin/itineraries/:id', async (req, res) => {
  try {
    const updates = pickUpdates(req.body, ['name', 'packageId', 'packageName', 'days', 'hotels', 'status']);
    if (updates.packageName && !updates.packageId) {
      const pkg = await Package.findOne({ name: updates.packageName });
      if (pkg) updates.packageId = pkg._id;
    }
    const itinerary = await Itinerary.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!itinerary) {
      return res.status(404).json({ message: 'Itinerary not found' });
    }
    res.status(200).json({ message: 'Itinerary updated successfully', itinerary });
  } catch (error) {
    res.status(500).json({ message: 'Error updating itinerary' });
  }
});

app.delete('/api/admin/itineraries/:id', async (req, res) => {
  try {
    await Itinerary.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Itinerary deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting itinerary' });
  }
});

// Hotel Management Routes
app.get('/api/admin/hotels', async (req, res) => {
  try {
    const hotels = await Hotel.find({});
    res.status(200).json({ hotels });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching hotels' });
  }
});

app.post('/api/admin/hotels', async (req, res) => {
  try {
    const newHotel = new Hotel(req.body);
    await newHotel.save();
    res.status(201).json({ message: 'Hotel created successfully', hotel: newHotel });
  } catch (error) {
    res.status(500).json({ message: 'Error creating hotel' });
  }
});

app.put('/api/admin/hotels/:id', async (req, res) => {
  try {
    const updates = pickUpdates(req.body, ['name', 'location', 'rooms', 'rating', 'partner', 'status']);
    const hotel = await Hotel.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }
    res.status(200).json({ message: 'Hotel updated successfully', hotel });
  } catch (error) {
    res.status(500).json({ message: 'Error updating hotel' });
  }
});

app.delete('/api/admin/hotels/:id', async (req, res) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Hotel deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting hotel' });
  }
});

// Room Management Routes
app.get('/api/admin/rooms', async (req, res) => {
  try {
    const rooms = await Room.find({});
    res.status(200).json({ rooms });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching rooms' });
  }
});

app.post('/api/admin/rooms', async (req, res) => {
  try {
    const newRoom = new Room(req.body);
    await newRoom.save();
    res.status(201).json({ message: 'Room created successfully', room: newRoom });
  } catch (error) {
    res.status(500).json({ message: 'Error creating room' });
  }
});

app.put('/api/admin/rooms/:id', async (req, res) => {
  try {
    const updates = pickUpdates(req.body, ['hotel', 'type', 'total', 'available', 'booked', 'price', 'status']);
    const room = await Room.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }
    res.status(200).json({ message: 'Room updated successfully', room });
  } catch (error) {
    res.status(500).json({ message: 'Error updating room' });
  }
});

app.delete('/api/admin/rooms/:id', async (req, res) => {
  try {
    await Room.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Room deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting room' });
  }
});

// Booking Management Routes
app.get('/api/admin/bookings', async (req, res) => {
  try {
    const bookings = await Booking.find({});
    res.status(200).json({ bookings });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bookings' });
  }
});

app.post('/api/admin/bookings', async (req, res) => {
  try {
    const payload = { ...req.body };
    if (payload.paymentStatus === 'paid' && !payload.status) {
      payload.status = 'confirmed';
    }
    const newBooking = new Booking(payload);
    await newBooking.save();
    if (newBooking.package) {
      await Package.findOneAndUpdate({ name: newBooking.package }, { $inc: { bookings: 1 } });
    }
    if (newBooking.paymentStatus === 'paid') {
      await createPaidInvoice(newBooking);
    }
    res.status(201).json({ message: 'Booking created successfully', booking: newBooking });
  } catch (error) {
    res.status(500).json({ message: 'Error creating booking' });
  }
});

app.put('/api/admin/bookings/:id', async (req, res) => {
  try {
    const updates = pickUpdates(req.body, ['customer', 'email', 'package', 'dates', 'amount', 'status', 'paymentStatus']);
    if (updates.paymentStatus === 'paid' && !updates.status) {
      updates.status = 'confirmed';
    }
    const booking = await Booking.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    if (booking.paymentStatus === 'paid') {
      await createPaidInvoice(booking);
    }
    res.status(200).json({ message: 'Booking updated successfully', booking });
  } catch (error) {
    res.status(500).json({ message: 'Error updating booking' });
  }
});

app.delete('/api/admin/bookings/:id', async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Booking deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting booking' });
  }
});

// Invoice Management Routes
app.get('/api/admin/invoices', async (req, res) => {
  try {
    const invoices = await Invoice.find({});
    res.status(200).json({ invoices });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching invoices' });
  }
});

app.post('/api/admin/invoices', async (req, res) => {
  try {
    const payload = { ...req.body };
    if (!payload.invoiceNo) {
      payload.invoiceNo = await nextInvoiceNo();
    }
    const newInvoice = new Invoice(payload);
    await newInvoice.save();
    res.status(201).json({ message: 'Invoice created successfully', invoice: newInvoice });
  } catch (error) {
    if (duplicateError(error)) {
      return res.status(400).json({ message: 'Invoice number already exists' });
    }
    res.status(500).json({ message: 'Error creating invoice' });
  }
});

app.put('/api/admin/invoices/:id', async (req, res) => {
  try {
    const updates = pickUpdates(req.body, ['invoiceNo', 'customer', 'email', 'package', 'amount', 'status', 'date', 'dueDate']);
    const invoice = await Invoice.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }
    res.status(200).json({ message: 'Invoice updated successfully', invoice });
  } catch (error) {
    res.status(500).json({ message: 'Error updating invoice' });
  }
});

app.delete('/api/admin/invoices/:id', async (req, res) => {
  try {
    await Invoice.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Invoice deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting invoice' });
  }
});

// Review Management Routes
app.get('/api/admin/reviews', async (req, res) => {
  try {
    const reviews = await Review.find({});
    res.status(200).json({ reviews });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reviews' });
  }
});

app.post('/api/admin/reviews', async (req, res) => {
  try {
    const payload = { ...req.body };
    if (!payload.status) payload.status = 'approved';
    const newReview = new Review(payload);
    await newReview.save();
    if (newReview.status === 'approved') {
      await refreshPackageRating(newReview.package);
    }
    res.status(201).json({ message: 'Review created successfully', review: newReview });
  } catch (error) {
    res.status(500).json({ message: 'Error creating review' });
  }
});

app.put('/api/admin/reviews/:id', async (req, res) => {
  try {
    const updates = pickUpdates(req.body, ['customer', 'package', 'rating', 'comment', 'status']);
    const review = await Review.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    await refreshPackageRating(review.package);
    res.status(200).json({ message: 'Review updated successfully', review });
  } catch (error) {
    res.status(500).json({ message: 'Error updating review' });
  }
});

app.delete('/api/admin/reviews/:id', async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting review' });
  }
});

// Coupon Management Routes
app.get('/api/admin/coupons', async (req, res) => {
  try {
    const coupons = await Coupon.find({});
    res.status(200).json({ coupons });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching coupons' });
  }
});

app.post('/api/admin/coupons', async (req, res) => {
  try {
    const newCoupon = new Coupon(req.body);
    await newCoupon.save();
    res.status(201).json({ message: 'Coupon created successfully', coupon: newCoupon });
  } catch (error) {
    if (duplicateError(error)) {
      return res.status(400).json({ message: 'Coupon code already exists' });
    }
    res.status(500).json({ message: 'Error creating coupon' });
  }
});

app.put('/api/admin/coupons/:id', async (req, res) => {
  try {
    const updates = pickUpdates(req.body, ['code', 'discount', 'type', 'minPurchase', 'maxDiscount', 'status', 'expiry', 'usage', 'maxUsage']);
    const coupon = await Coupon.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!coupon) {
      return res.status(404).json({ message: 'Coupon not found' });
    }
    res.status(200).json({ message: 'Coupon updated successfully', coupon });
  } catch (error) {
    res.status(500).json({ message: 'Error updating coupon' });
  }
});

app.delete('/api/admin/coupons/:id', async (req, res) => {
  try {
    await Coupon.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Coupon deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting coupon' });
  }
});

// Settings Management Routes
app.get('/api/admin/settings', async (req, res) => {
  try {
    let settings = await Settings.findOne({});
    if (!settings) {
      settings = new Settings();
      await settings.save();
    }
    res.status(200).json({ settings });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching settings' });
  }
});

app.put('/api/admin/settings', async (req, res) => {
  try {
    const updates = pickUpdates(req.body, [
      'siteName', 'siteEmail', 'sitePhone', 'currency', 'timezone',
      'maintenanceMode', 'allowRegistration', 'requireApproval', 'taxRate',
      'cancellationPolicy', 'refundPolicy'
    ]);
    updates.updatedAt = new Date();
    let settings = await Settings.findOneAndUpdate({}, updates, { new: true, upsert: true, setDefaultsOnInsert: true });
    res.status(200).json({ message: 'Settings updated successfully', settings });
  } catch (error) {
    res.status(500).json({ message: 'Error updating settings' });
  }
});

// Analytics Routes
app.get('/api/admin/analytics', async (req, res) => {
  try {
    const since = rangeStart(req.query.range || 'month');
    const totalUsers = await User.countDocuments();
    const activeTours = await Package.countDocuments({ status: 'active' });
    const partnerHotels = await Hotel.countDocuments({ status: 'active' });
    const totalBookings = await Booking.countDocuments();
    const paidBookings = await Booking.find({ paymentStatus: 'paid' });
    const totalRevenue = paidBookings.reduce((sum, b) => sum + b.amount, 0);
    const reviews = await Review.find({});
    const avgRating = reviews.length > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : 0;

    const bookingStats = {
      confirmed: await Booking.countDocuments({ status: 'confirmed' }),
      pending: await Booking.countDocuments({ status: 'pending' }),
      cancelled: await Booking.countDocuments({ status: 'cancelled' })
    };

    const topTours = await Package.find({}).sort({ bookings: -1, price: -1 }).limit(5).lean();
    const recentUsers = await User.find({}).sort({ createdAt: -1 }).limit(4).select('-password').lean();
    const recentBookings = await Booking.find({}).sort({ bookingDate: -1 }).limit(6).lean();
    const recentReviews = await Review.find({}).sort({ date: -1 }).limit(4).lean();
    const recentInvoices = await Invoice.find({}).sort({ date: -1 }).limit(3).lean();
    const roomSummary = await Room.aggregate([
      { $group: { _id: null, total: { $sum: '$total' }, available: { $sum: '$available' }, booked: { $sum: '$booked' } } }
    ]);

    const monthlyRevenue = [];
    const userGrowth = [];
    for (let i = 5; i >= 0; i--) {
      const start = new Date();
      start.setMonth(start.getMonth() - i, 1);
      start.setHours(0, 0, 0, 0);
      const end = new Date(start);
      end.setMonth(end.getMonth() + 1);
      const monthPaid = await Booking.find({ paymentStatus: 'paid', bookingDate: { $gte: start, $lt: end } });
      monthlyRevenue.push(monthPaid.reduce((sum, b) => sum + b.amount, 0));
      userGrowth.push(await User.countDocuments({ createdAt: { $lt: end } }));
    }

    const rangeBookings = await Booking.countDocuments({ bookingDate: { $gte: since } });
    const rangeUsers = await User.countDocuments({ createdAt: { $gte: since } });
    const rangeRevenue = (await Booking.find({ paymentStatus: 'paid', bookingDate: { $gte: since } }))
      .reduce((sum, b) => sum + b.amount, 0);

    res.status(200).json({
      totalUsers,
      activeTours,
      partnerHotels,
      totalBookings,
      totalRevenue,
      avgRating: Number(avgRating.toFixed(1)),
      bookingStats,
      topTours: topTours.map((pkg) => ({
        name: pkg.name,
        bookings: pkg.bookings || 0,
        revenue: (pkg.bookings || 0) * (pkg.price || 0)
      })),
      recentActivity: [
        ...recentUsers.map((u) => ({ type: 'user', text: `New user: ${u.fullName} (${u.role})` })),
        ...recentBookings.map((b) => ({ type: 'booking', text: `Booking: ${b.package} by ${b.customer}` })),
        ...recentReviews.map((r) => ({ type: 'review', text: `Review: ${r.rating}★ for ${r.package}` })),
        ...recentInvoices.map((inv) => ({ type: 'invoice', text: `Invoice ${inv.invoiceNo} for ${inv.customer}` }))
      ].slice(0, 8),
      monthlyRevenue,
      userGrowth,
      upcomingBookings: recentBookings.slice(0, 5).map((booking) => ({
        customer: booking.customer,
        package: booking.package,
        dates: booking.dates,
        status: booking.status
      })),
      rooms: roomSummary[0] || { total: 0, available: 0, booked: 0 },
      range: {
        bookings: rangeBookings,
        users: rangeUsers,
        revenue: rangeRevenue
      }
    });
  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({ message: 'Error fetching analytics' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
