import React from 'react'
import { MapPin, Calendar, Users, DollarSign, Plus, LogOut, Star } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import './Dashboard.css'

const TourOperatorDashboard = () => {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user') || '{}')

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  return (
    <div className="dashboard-container">
      <aside className="dashboard-sidebar">
        <div className="sidebar-header">
          <MapPin className="h-8 w-8" />
          <h2>Tour Operator</h2>
        </div>
        <nav className="sidebar-nav">
          <Link to="/tour-operator/dashboard" className="nav-item active">
            <MapPin className="h-5 w-5" />
            <span>Dashboard</span>
          </Link>
          <Link to="/tour-operator/packages" className="nav-item">
            <Plus className="h-5 w-5" />
            <span>My Packages</span>
          </Link>
          <Link to="/tour-operator/bookings" className="nav-item">
            <Calendar className="h-5 w-5" />
            <span>Bookings</span>
          </Link>
          <Link to="/tour-operator/customers" className="nav-item">
            <Users className="h-5 w-5" />
            <span>Customers</span>
          </Link>
          <Link to="/tour-operator/reviews" className="nav-item">
            <Star className="h-5 w-5" />
            <span>Reviews</span>
          </Link>
          <Link to="/tour-operator/earnings" className="nav-item">
            <DollarSign className="h-5 w-5" />
            <span>Earnings</span>
          </Link>
        </nav>
      </aside>
      <button onClick={handleLogout} className="logout-btn">
        <LogOut className="h-5 w-5" />
        <span>Logout</span>
      </button>

      <main className="dashboard-main">
        <header className="dashboard-header">
          <h1>Tour Operator Dashboard</h1>
          <div className="user-info">
            <span>Welcome, {user.fullName || 'Tour Operator'}</span>
          </div>
        </header>

        <div className="dashboard-content">
          <div className="stats-grid">
            <div className="stat-card">
              <MapPin className="stat-icon" />
              <div className="stat-content">
                <h3>Active Packages</h3>
                <p className="stat-number">12</p>
              </div>
            </div>
            <div className="stat-card">
              <Calendar className="stat-icon" />
              <div className="stat-content">
                <h3>Total Bookings</h3>
                <p className="stat-number">156</p>
              </div>
            </div>
            <div className="stat-card">
              <Users className="stat-icon" />
              <div className="stat-content">
                <h3>Happy Customers</h3>
                <p className="stat-number">1,234</p>
              </div>
            </div>
            <div className="stat-card">
              <DollarSign className="stat-icon" />
              <div className="stat-content">
                <h3>Monthly Revenue</h3>
                <p className="stat-number">₹2.5L</p>
              </div>
            </div>
          </div>

          <div className="dashboard-sections">
            <div className="section-card">
              <h3>My Tour Packages</h3>
              <div className="tour-packages-list">
                <div className="package-item">
                  <div className="package-info">
                    <h4>Goa Beach Paradise</h4>
                    <p>3 Days 2 Nights • ₹15,999</p>
                  </div>
                  <span className="package-status active">Active</span>
                </div>
                <div className="package-item">
                  <div className="package-info">
                    <h4>Kerala Backwaters</h4>
                    <p>5 Days 4 Nights • ₹24,999</p>
                  </div>
                  <span className="package-status active">Active</span>
                </div>
                <div className="package-item">
                  <div className="package-info">
                    <h4>Himalayan Adventure</h4>
                    <p>7 Days 6 Nights • ₹35,999</p>
                  </div>
                  <span className="package-status inactive">Inactive</span>
                </div>
              </div>
              <button className="action-btn">
                <Plus className="h-4 w-4" />
                Create New Package
              </button>
            </div>

            <div className="section-card">
              <h3>Recent Bookings</h3>
              <ul className="booking-list">
                <li>
                  <span className="booking-customer">John Doe</span>
                  <span className="booking-package">Kerala Backwaters</span>
                  <span className="booking-status confirmed">Confirmed</span>
                </li>
                <li>
                  <span className="booking-customer">Jane Smith</span>
                  <span className="booking-package">Goa Beach Paradise</span>
                  <span className="booking-status pending">Pending</span>
                </li>
                <li>
                  <span className="booking-customer">Mike Johnson</span>
                  <span className="booking-package">Rajasthan Royal Tour</span>
                  <span className="booking-status confirmed">Confirmed</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default TourOperatorDashboard
