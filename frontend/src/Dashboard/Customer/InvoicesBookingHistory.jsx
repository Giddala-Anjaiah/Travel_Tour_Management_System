import React, { useState } from 'react'
import { MapPin, FileText, Calendar, Download, Search, Filter, DollarSign, CheckCircle, Clock, Eye, Printer, Sparkles, Shield, Receipt, ArrowRight, Download as DownloadIcon, FileText as FileIcon, Calendar as CalendarIcon, AlertCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import '../Dashboard.css'

const InvoicesBookingHistory = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterYear, setFilterYear] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [selectedInvoice, setSelectedInvoice] = useState(null)
  const [showInvoiceModal, setShowInvoiceModal] = useState(false)

  const invoices = [
    { 
      id: 'INV-2024-001', 
      bookingId: 'BK-2024-001',
      package: 'Goa Beach Paradise',
      date: '2024-08-20',
      dueDate: '2024-09-20',
      amount: 31998,
      status: 'paid',
      paidDate: '2024-08-25',
      image: '🏖️',
      items: [
        { description: 'Package Cost (2 persons)', amount: 30000 },
        { description: 'Service Charges', amount: 1998 }
      ]
    },
    { 
      id: 'INV-2024-002', 
      bookingId: 'BK-2024-002',
      package: 'Kerala Backwaters',
      date: '2024-08-25',
      dueDate: '2024-10-25',
      amount: 99996,
      status: 'paid',
      paidDate: '2024-08-30',
      image: '🌴',
      items: [
        { description: 'Package Cost (4 persons)', amount: 96000 },
        { description: 'Service Charges', amount: 3996 }
      ]
    },
    { 
      id: 'INV-2024-003', 
      bookingId: 'BK-2024-003',
      package: 'Himalayan Adventure',
      date: '2024-08-28',
      dueDate: '2024-11-05',
      amount: 107997,
      status: 'pending',
      paidDate: null,
      image: '🏔️',
      items: [
        { description: 'Package Cost (3 persons)', amount: 105000 },
        { description: 'Service Charges', amount: 2997 }
      ]
    },
    { 
      id: 'INV-2024-004', 
      bookingId: 'BK-2024-004',
      package: 'Rajasthan Royal Tour',
      date: '2024-08-30',
      dueDate: '2024-12-20',
      amount: 59998,
      status: 'partial',
      paidDate: null,
      image: '🏰',
      items: [
        { description: 'Package Cost (2 persons)', amount: 58000 },
        { description: 'Service Charges', amount: 1998 }
      ]
    },
  ]

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.package.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.bookingId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesYear = filterYear === 'all' || invoice.date.startsWith(filterYear)
    const matchesStatus = filterStatus === 'all' || invoice.status === filterStatus
    return matchesSearch && matchesYear && matchesStatus
  })

  const getStatusIcon = (status) => {
    switch(status) {
      case 'paid': return <CheckCircle className="h-4 w-4" />
      case 'pending': return <Clock className="h-4 w-4" />
      case 'partial': return <AlertCircle className="h-4 w-4" />
      default: return <Clock className="h-4 w-4" />
    }
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'paid': return '#22c55e'
      case 'pending': return '#f59e0b'
      case 'partial': return '#f59e0b'
      case 'overdue': return '#ef4444'
      default: return '#64748b'
    }
  }

  const viewInvoice = (invoice) => {
    setSelectedInvoice(invoice)
    setShowInvoiceModal(true)
  }

  const downloadInvoice = (invoiceId) => {
    alert(`Downloading invoice ${invoiceId}...`)
  }

  const printInvoice = (invoiceId) => {
    alert(`Printing invoice ${invoiceId}...`)
  }

  const getDaysUntilDue = (dueDate) => {
    const due = new Date(dueDate)
    const today = new Date()
    const diffTime = due - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  return (
    <div className="dashboard-container">
      <aside className="dashboard-sidebar">
        <div className="sidebar-header">
          <FileIcon className="h-8 w-8" />
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
          <Link to="/customer/bookings" className="nav-item">
            <Calendar className="h-5 w-5" />
            <span>Bookings & Payments</span>
          </Link>
          <Link to="/customer/invoices" className="nav-item active">
            <FileText className="h-5 w-5" />
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
            <h1>Invoices & Booking History</h1>
            <p className="header-subtitle">Track your payments and booking records</p>
          </div>
          <div className="header-stats">
            <div className="stat-badge">
              <Sparkles className="h-4 w-4" />
              <span>{invoices.length} Invoices</span>
            </div>
            <div className="stat-badge">
              <Shield className="h-4 w-4" />
              <span>Digital Records</span>
            </div>
          </div>
        </header>

        <div className="dashboard-content">
          <div className="stats-grid enhanced">
            <div className="stat-card enhanced">
              <Receipt className="stat-icon" />
              <div className="stat-content">
                <h3>Total Invoices</h3>
                <p className="stat-number">{invoices.length}</p>
              </div>
            </div>
            <div className="stat-card enhanced">
              <CheckCircle className="stat-icon" />
              <div className="stat-content">
                <h3>Paid</h3>
                <p className="stat-number">{invoices.filter(i => i.status === 'paid').length}</p>
              </div>
            </div>
            <div className="stat-card enhanced">
              <Clock className="stat-icon" />
              <div className="stat-content">
                <h3>Pending</h3>
                <p className="stat-number">{invoices.filter(i => i.status === 'pending').length}</p>
              </div>
            </div>
            <div className="stat-card enhanced">
              <DollarSign className="stat-icon" />
              <div className="stat-content">
                <h3>Total Billed</h3>
                <p className="stat-number">₹{invoices.reduce((sum, i) => sum + i.amount, 0).toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="filters-section enhanced">
            <div className="search-bar enhanced">
              <Search className="search-icon" />
              <input 
                type="text" 
                placeholder="Search invoices, bookings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="filter-controls enhanced">
              <div className="filter-group">
                <label>Year</label>
                <select 
                  value={filterYear}
                  onChange={(e) => setFilterYear(e.target.value)}
                  className="filter-select"
                >
                  <option value="all">All Years</option>
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                </select>
              </div>
              <div className="filter-group">
                <label>Status</label>
                <select 
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="filter-select"
                >
                  <option value="all">All Status</option>
                  <option value="paid">Paid</option>
                  <option value="pending">Pending</option>
                  <option value="partial">Partial</option>
                </select>
              </div>
            </div>
          </div>

          <div className="invoices-list enhanced">
            {filteredInvoices.map(invoice => (
              <div key={invoice.id} className="invoice-card enhanced">
                <div className="invoice-header enhanced">
                  <div className="invoice-image-wrapper">
                    <span className="invoice-emoji">{invoice.image}</span>
                  </div>
                  <div className="invoice-info">
                    <h3>{invoice.package}</h3>
                    <div className="invoice-id">
                      <Receipt className="h-4 w-4" />
                      <span>{invoice.id}</span>
                    </div>
                    <div className="booking-ref">
                      <CalendarIcon className="h-4 w-4" />
                      <span>{invoice.bookingId}</span>
                    </div>
                  </div>
                  <div className="invoice-badges">
                    <span className={`status-badge ${invoice.status}`} style={{ backgroundColor: getStatusColor(invoice.status) }}>
                      {getStatusIcon(invoice.status)}
                      {invoice.status}
                    </span>
                  </div>
                </div>

                <div className="invoice-details enhanced">
                  <div className="detail-item">
                    <CalendarIcon className="h-4 w-4" />
                    <div>
                      <small>Invoice Date</small>
                      <strong>{invoice.date}</strong>
                    </div>
                  </div>
                  <div className="detail-item">
                    <Clock className="h-4 w-4" />
                    <div>
                      <small>Due Date</small>
                      <strong>{invoice.dueDate}</strong>
                    </div>
                  </div>
                  {invoice.status !== 'paid' && (
                    <div className="detail-item">
                      <AlertCircle className="h-4 w-4" />
                      <div>
                        <small>Days Until Due</small>
                        <strong>{getDaysUntilDue(invoice.dueDate)} days</strong>
                      </div>
                    </div>
                  )}
                  {invoice.paidDate && (
                    <div className="detail-item">
                      <CheckCircle className="h-4 w-4" />
                      <div>
                        <small>Paid Date</small>
                        <strong>{invoice.paidDate}</strong>
                      </div>
                    </div>
                  )}
                </div>

                <div className="invoice-amount-section">
                  <div className="amount-display">
                    <small>Total Amount</small>
                    <strong>₹{invoice.amount.toLocaleString()}</strong>
                  </div>
                  {invoice.status === 'paid' && (
                    <span className="paid-badge">
                      <CheckCircle className="h-4 w-4" /> Fully Paid
                    </span>
                  )}
                </div>

                <div className="invoice-actions enhanced">
                  <button onClick={() => viewInvoice(invoice)} className="icon-btn">
                    <Eye className="h-4 w-4" />
                  </button>
                  <button onClick={() => downloadInvoice(invoice.id)} className="icon-btn">
                    <DownloadIcon className="h-4 w-4" />
                  </button>
                  <button onClick={() => printInvoice(invoice.id)} className="icon-btn">
                    <Printer className="h-4 w-4" />
                  </button>
                  {invoice.status !== 'paid' && (
                    <Link to="/customer/bookings" className="btn-primary enhanced">
                      <ArrowRight className="h-4 w-4" /> Pay Now
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {showInvoiceModal && selectedInvoice && (
        <div className="modal-overlay">
          <div className="modal invoice-modal">
            <div className="modal-header">
              <div>
                <h3>Invoice Details - {selectedInvoice.id}</h3>
                <p className="modal-subtitle">{selectedInvoice.bookingId}</p>
              </div>
              <button onClick={() => setShowInvoiceModal(false)} className="modal-close">×</button>
            </div>
            <div className="modal-body">
              <div className="invoice-details enhanced">
                <div className="invoice-header-info enhanced">
                  <div className="info-row">
                    <span className="label">Invoice ID:</span>
                    <span className="value">{selectedInvoice.id}</span>
                  </div>
                  <div className="info-row">
                    <span className="label">Booking ID:</span>
                    <span className="value">{selectedInvoice.bookingId}</span>
                  </div>
                  <div className="info-row">
                    <span className="label">Package:</span>
                    <span className="value">{selectedInvoice.package}</span>
                  </div>
                  <div className="info-row">
                    <span className="label">Invoice Date:</span>
                    <span className="value">{selectedInvoice.date}</span>
                  </div>
                  <div className="info-row">
                    <span className="label">Due Date:</span>
                    <span className="value">{selectedInvoice.dueDate}</span>
                  </div>
                  {selectedInvoice.paidDate && (
                    <div className="info-row">
                      <span className="label">Paid Date:</span>
                      <span className="value">{selectedInvoice.paidDate}</span>
                    </div>
                  )}
                  <div className="info-row">
                    <span className="label">Status:</span>
                    <span className={`value status-badge ${selectedInvoice.status}`} style={{ backgroundColor: getStatusColor(selectedInvoice.status) }}>
                      {getStatusIcon(selectedInvoice.status)}
                      {selectedInvoice.status}
                    </span>
                  </div>
                </div>

                <div className="invoice-items enhanced">
                  <h4>Invoice Items</h4>
                  <table className="invoice-items-table">
                    <thead>
                      <tr>
                        <th>Description</th>
                        <th>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedInvoice.items.map((item, idx) => (
                        <tr key={idx}>
                          <td>{item.description}</td>
                          <td>₹{item.amount.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td><strong>Total</strong></td>
                        <td><strong>₹{selectedInvoice.amount.toLocaleString()}</strong></td>
                      </tr>
                    </tfoot>
                  </table>
                </div>

                <div className="invoice-modal-actions">
                  <button onClick={() => downloadInvoice(selectedInvoice.id)} className="btn-secondary">
                    <DownloadIcon className="h-4 w-4" /> Download PDF
                  </button>
                  <button onClick={() => printInvoice(selectedInvoice.id)} className="btn-secondary">
                    <Printer className="h-4 w-4" /> Print Invoice
                  </button>
                  {selectedInvoice.status !== 'paid' && (
                    <Link to="/customer/bookings" className="btn-primary">
                      <ArrowRight className="h-4 w-4" /> Pay Now
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default InvoicesBookingHistory
