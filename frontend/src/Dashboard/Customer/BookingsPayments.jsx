import React, { useState } from 'react'
import { MapPin, Calendar, CreditCard, Search, Filter, DollarSign, Clock, CheckCircle, XCircle, AlertCircle, Download, Eye, Sparkles, Shield, Ticket, Calendar as CalendarIcon, ArrowRight, CreditCard as CardIcon, Wallet, Zap, Users } from 'lucide-react'
import { Link } from 'react-router-dom'
import '../Dashboard.css'

const BookingsPayments = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [selectedBooking, setSelectedBooking] = useState(null)
  const [showPaymentModal, setShowPaymentModal] = useState(false)

  const bookings = [
    { 
      id: 1, 
      package: 'Goa Beach Paradise', 
      destination: 'Goa',
      date: '2024-09-15',
      duration: '3 Days 2 Nights',
      guests: 2,
      totalAmount: 31998,
      paidAmount: 16000,
      status: 'confirmed',
      paymentStatus: 'partial',
      bookingDate: '2024-08-20',
      bookingId: 'BK-2024-001',
      image: '🏖️'
    },
    { 
      id: 2, 
      package: 'Kerala Backwaters', 
      destination: 'Kerala',
      date: '2024-10-10',
      duration: '5 Days 4 Nights',
      guests: 4,
      totalAmount: 99996,
      paidAmount: 99996,
      status: 'confirmed',
      paymentStatus: 'paid',
      bookingDate: '2024-08-25',
      bookingId: 'BK-2024-002',
      image: '🌴'
    },
    { 
      id: 3, 
      package: 'Himalayan Adventure', 
      destination: 'Himalayas',
      date: '2024-11-05',
      duration: '7 Days 6 Nights',
      guests: 3,
      totalAmount: 107997,
      paidAmount: 0,
      status: 'pending',
      paymentStatus: 'unpaid',
      bookingDate: '2024-08-28',
      bookingId: 'BK-2024-003',
      image: '🏔️'
    },
    { 
      id: 4, 
      package: 'Rajasthan Royal Tour', 
      destination: 'Rajasthan',
      date: '2024-12-20',
      duration: '6 Days 5 Nights',
      guests: 2,
      totalAmount: 59998,
      paidAmount: 30000,
      status: 'confirmed',
      paymentStatus: 'partial',
      bookingDate: '2024-08-30',
      bookingId: 'BK-2024-004',
      image: '🏰'
    },
  ]

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.package.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.bookingId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || booking.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const getStatusIcon = (status) => {
    switch(status) {
      case 'confirmed': return <CheckCircle className="h-4 w-4" />
      case 'pending': return <AlertCircle className="h-4 w-4" />
      case 'cancelled': return <XCircle className="h-4 w-4" />
      default: return <Clock className="h-4 w-4" />
    }
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'confirmed': return '#22c55e'
      case 'pending': return '#f59e0b'
      case 'cancelled': return '#ef4444'
      default: return '#64748b'
    }
  }

  const getPaymentStatusColor = (status) => {
    switch(status) {
      case 'paid': return '#22c55e'
      case 'partial': return '#f59e0b'
      case 'unpaid': return '#ef4444'
      default: return '#64748b'
    }
  }

  const handlePayment = (booking) => {
    setSelectedBooking(booking)
    setShowPaymentModal(true)
  }

  const processPayment = (e) => {
    e.preventDefault()
    setShowPaymentModal(false)
    alert('Payment processed successfully!')
  }

  const getPaymentProgress = (paid, total) => {
    return Math.round((paid / total) * 100)
  }

  return (
    <div className="dashboard-container">
      <aside className="dashboard-sidebar">
        <div className="sidebar-header">
          <CardIcon className="h-8 w-8" />
          <h2>Customer Portal</h2>
        </div>
        <nav className="sidebar-nav">
          <Link to="/customer/dashboard" className="nav-item">
            <MapPin className="h-5 w-5" />
            <span>Destination Exploration</span>
          </Link>
          <Link to="/customer/packages" className="nav-item">
            <Calendar className="h-5 w-5" />
            <span>Tour Packages</span>
          </Link>
          <Link to="/customer/itineraries" className="nav-item">
            <Calendar className="h-5 w-5" />
            <span>Itineraries</span>
          </Link>
          <Link to="/customer/hotels" className="nav-item">
            <Calendar className="h-5 w-5" />
            <span>Hotel Search & Availability</span>
          </Link>
          <Link to="/customer/bookings" className="nav-item active">
            <Calendar className="h-5 w-5" />
            <span>Bookings & Payments</span>
          </Link>
          <Link to="/customer/invoices" className="nav-item">
            <Calendar className="h-5 w-5" />
            <span>Invoices & Booking History</span>
          </Link>
          <Link to="/customer/wishlist" className="nav-item">
            <Calendar className="h-5 w-5" />
            <span>Wishlist, Reviews & Notifications</span>
          </Link>
          <Link to="/customer/profile" className="nav-item">
            <MapPin className="h-5 w-5" />
            <span>Profile Management</span>
          </Link>
        </nav>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-header">
          <div>
            <h1>Bookings & Payments</h1>
            <p className="header-subtitle">Manage your reservations and payments</p>
          </div>
          <div className="header-stats">
            <div className="stat-badge">
              <Sparkles className="h-4 w-4" />
              <span>{bookings.length} Bookings</span>
            </div>
            <div className="stat-badge">
              <Shield className="h-4 w-4" />
              <span>Secure Payments</span>
            </div>
          </div>
        </header>

        <div className="dashboard-content">
          <div className="stats-grid enhanced">
            <div className="stat-card enhanced">
              <Ticket className="stat-icon" />
              <div className="stat-content">
                <h3>Total Bookings</h3>
                <p className="stat-number">{bookings.length}</p>
              </div>
            </div>
            <div className="stat-card enhanced">
              <CheckCircle className="stat-icon" />
              <div className="stat-content">
                <h3>Confirmed</h3>
                <p className="stat-number">{bookings.filter(b => b.status === 'confirmed').length}</p>
              </div>
            </div>
            <div className="stat-card enhanced">
              <Wallet className="stat-icon" />
              <div className="stat-content">
                <h3>Total Spent</h3>
                <p className="stat-number">₹{bookings.reduce((sum, b) => sum + b.paidAmount, 0).toLocaleString()}</p>
              </div>
            </div>
            <div className="stat-card enhanced">
              <AlertCircle className="stat-icon" />
              <div className="stat-content">
                <h3>Pending Payment</h3>
                <p className="stat-number">₹{bookings.reduce((sum, b) => sum + (b.totalAmount - b.paidAmount), 0).toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="filters-section enhanced">
            <div className="search-bar enhanced">
              <Search className="search-icon" />
              <input 
                type="text" 
                placeholder="Search bookings, packages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="filter-controls enhanced">
              <div className="filter-group">
                <label>Status</label>
                <select 
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="filter-select"
                >
                  <option value="all">All Status</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="pending">Pending</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bookings-list enhanced">
            {filteredBookings.map(booking => (
              <div key={booking.id} className="booking-card enhanced">
                <div className="booking-header enhanced">
                  <div className="booking-image-wrapper">
                    <span className="booking-emoji">{booking.image}</span>
                  </div>
                  <div className="booking-info">
                    <h3>{booking.package}</h3>
                    <div className="booking-id">
                      <Ticket className="h-4 w-4" />
                      <span>{booking.bookingId}</span>
                    </div>
                  </div>
                  <div className="booking-badges">
                    <span className={`status-badge ${booking.status}`} style={{ backgroundColor: getStatusColor(booking.status) }}>
                      {getStatusIcon(booking.status)}
                      {booking.status}
                    </span>
                  </div>
                </div>

                <div className="booking-details enhanced">
                  <div className="detail-item">
                    <MapPin className="h-4 w-4" />
                    <div>
                      <small>Destination</small>
                      <strong>{booking.destination}</strong>
                    </div>
                  </div>
                  <div className="detail-item">
                    <CalendarIcon className="h-4 w-4" />
                    <div>
                      <small>Travel Date</small>
                      <strong>{booking.date}</strong>
                    </div>
                  </div>
                  <div className="detail-item">
                    <Clock className="h-4 w-4" />
                    <div>
                      <small>Duration</small>
                      <strong>{booking.duration}</strong>
                    </div>
                  </div>
                  <div className="detail-item">
                    <Users className="h-4 w-4" />
                    <div>
                      <small>Guests</small>
                      <strong>{booking.guests}</strong>
                    </div>
                  </div>
                </div>

                <div className="booking-payment-section">
                  <div className="payment-progress">
                    <div className="progress-header">
                      <span>Payment Progress</span>
                      <span>{getPaymentProgress(booking.paidAmount, booking.totalAmount)}%</span>
                    </div>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ 
                          width: `${getPaymentProgress(booking.paidAmount, booking.totalAmount)}%`,
                          backgroundColor: getPaymentStatusColor(booking.paymentStatus)
                        }}
                      ></div>
                    </div>
                    <div className="payment-amounts">
                      <span>Paid: ₹{booking.paidAmount.toLocaleString()}</span>
                      <span>Total: ₹{booking.totalAmount.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="payment-status-badge" style={{ color: getPaymentStatusColor(booking.paymentStatus) }}>
                    <CreditCard className="h-4 w-4" />
                    <span>{booking.paymentStatus}</span>
                  </div>
                </div>

                <div className="booking-actions enhanced">
                  <button className="icon-btn">
                    <Eye className="h-4 w-4" />
                  </button>
                  <button className="icon-btn">
                    <Download className="h-4 w-4" />
                  </button>
                  {booking.paymentStatus !== 'paid' && (
                    <button 
                      onClick={() => handlePayment(booking)}
                      className="btn-primary enhanced"
                    >
                      <CreditCard className="h-4 w-4" /> Pay Now
                    </button>
                  )}
                  {booking.paymentStatus === 'paid' && (
                    <span className="fully-paid-badge">
                      <CheckCircle className="h-4 w-4" /> Fully Paid
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {showPaymentModal && selectedBooking && (
        <div className="modal-overlay">
          <div className="modal payment-modal">
            <div className="modal-header">
              <h3>Make Payment</h3>
              <button onClick={() => setShowPaymentModal(false)} className="modal-close">×</button>
            </div>
            <div className="modal-body">
              <div className="payment-summary enhanced">
                <div className="summary-header">
                  <h4>Booking Summary</h4>
                  <span className="booking-id-tag">{selectedBooking.bookingId}</span>
                </div>
                <div className="summary-details">
                  <div className="summary-row">
                    <span>Package</span>
                    <strong>{selectedBooking.package}</strong>
                  </div>
                  <div className="summary-row">
                    <span>Destination</span>
                    <strong>{selectedBooking.destination}</strong>
                  </div>
                  <div className="summary-row">
                    <span>Total Amount</span>
                    <strong>₹{selectedBooking.totalAmount.toLocaleString()}</strong>
                  </div>
                  <div className="summary-row">
                    <span>Amount Paid</span>
                    <strong>₹{selectedBooking.paidAmount.toLocaleString()}</strong>
                  </div>
                  <div className="summary-row highlight">
                    <span>Remaining Amount</span>
                    <strong>₹{(selectedBooking.totalAmount - selectedBooking.paidAmount).toLocaleString()}</strong>
                  </div>
                </div>
              </div>
              <form className="payment-form enhanced" onSubmit={processPayment}>
                <div className="form-group">
                  <label>Card Number</label>
                  <input type="text" placeholder="1234 5678 9012 3456" required />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Expiry Date</label>
                    <input type="text" placeholder="MM/YY" required />
                  </div>
                  <div className="form-group">
                    <label>CVV</label>
                    <input type="text" placeholder="123" required />
                  </div>
                </div>
                <div className="form-group">
                  <label>Cardholder Name</label>
                  <input type="text" placeholder="Name on card" required />
                </div>
                <div className="payment-amount-display">
                  <span>Amount to Pay</span>
                  <strong>₹{(selectedBooking.totalAmount - selectedBooking.paidAmount).toLocaleString()}</strong>
                </div>
                <div className="form-actions">
                  <button type="button" onClick={() => setShowPaymentModal(false)} className="btn-secondary">
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary enhanced">
                    <Zap className="h-4 w-4" /> Pay Securely
                  </button>
                </div>
                <div className="secure-payment-notice">
                  <Shield className="h-4 w-4" />
                  <span>Your payment is secured with 256-bit SSL encryption</span>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default BookingsPayments
