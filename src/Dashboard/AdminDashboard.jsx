import React from 'react'
import { Shield, Users, MapPin, Building, BarChart3, Settings, LogOut } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import './Dashboard.css'

const AdminDashboard = () => {
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
          <Shield className="h-8 w-8" />
          <h2>Admin Panel</h2>
        </div>
        <nav className="sidebar-nav">
          <Link to="/admin/dashboard" className="nav-item active">
            <BarChart3 className="h-5 w-5" />
            <span>Dashboard</span>
          </Link>
          <Link to="/admin/users" className="nav-item">
            <Users className="h-5 w-5" />
            <span>Users</span>
          </Link>
          <Link to="/admin/tours" className="nav-item">
            <MapPin className="h-5 w-5" />
            <span>Tour Packages</span>
          </Link>
          <Link to="/admin/hotels" className="nav-item">
            <Building className="h-5 w-5" />
            <span>Hotels</span>
          </Link>
          <Link to="/admin/settings" className="nav-item">
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </Link>
        </nav>
      </aside>
      <button onClick={handleLogout} className="logout-btn">
        <LogOut className="h-5 w-5" />
        <span>Logout</span>
      </button>

      <main className="dashboard-main">
        <header className="dashboard-header">
          <h1>Admin Dashboard</h1>
          <div className="user-info">
            <span>Welcome, {user.fullName || 'Admin'}</span>
          </div>
        </header>

        <div className="dashboard-content">
          <div className="stats-grid">
            <div className="stat-card">
              <Users className="stat-icon" />
              <div className="stat-content">
                <h3>Total Users</h3>
                <p className="stat-number">1,234</p>
              </div>
            </div>
            <div className="stat-card">
              <MapPin className="stat-icon" />
              <div className="stat-content">
                <h3>Active Tours</h3>
                <p className="stat-number">56</p>
              </div>
            </div>
            <div className="stat-card">
              <Building className="stat-icon" />
              <div className="stat-content">
                <h3>Partner Hotels</h3>
                <p className="stat-number">89</p>
              </div>
            </div>
            <div className="stat-card">
              <BarChart3 className="stat-icon" />
              <div className="stat-content">
                <h3>Total Bookings</h3>
                <p className="stat-number">2,456</p>
              </div>
            </div>
          </div>

          <div className="dashboard-sections">
            <div className="section-card">
              <h3>Recent Activities</h3>
              <ul className="activity-list">
                <li>New user registration: John Doe</li>
                <li>Tour booking: Kerala Backwaters</li>
                <li>Hotel partner registration: Taj Hotels</li>
                <li>Payment received: ₹45,000</li>
              </ul>
            </div>

            <div className="section-card">
              <h3>Quick Actions</h3>
              <div className="quick-actions">
                <button className="action-btn">Add New User</button>
                <button className="action-btn">Create Tour Package</button>
                <button className="action-btn">View Reports</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default AdminDashboard
