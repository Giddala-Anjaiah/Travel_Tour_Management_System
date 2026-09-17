import React, { useState, useEffect } from 'react'
import { Building, Ticket, Users, DollarSign, Star, PieChart, TrendingUp } from 'lucide-react'
import OperatorLayout from './OperatorLayout'

const OperatorDashboard = () => {
  const [stats, setStats] = useState({
    totalPackages: 12,
    totalBookings: 156,
    totalCustomers: 89,
    revenue: '25L',
    avgRating: 4.5,
    pending: 23
  })

  return (
    <OperatorLayout active="dashboard" title="Dashboard Analytics">
      <div className="stats-grid">
        <div className="stat-card">
          <Building className="stat-icon" />
          <div className="stat-content">
            <h3>Total Packages</h3>
            <p className="stat-number">{stats.totalPackages}</p>
            <span className="stat-change positive">8 Active</span>
          </div>
        </div>
        <div className="stat-card">
          <Ticket className="stat-icon" />
          <div className="stat-content">
            <h3>Total Bookings</h3>
            <p className="stat-number">{stats.totalBookings}</p>
            <span className="stat-change positive">+23 this month</span>
          </div>
        </div>
        <div className="stat-card">
          <Users className="stat-icon" />
          <div className="stat-content">
            <h3>Total Customers</h3>
            <p className="stat-number">{stats.totalCustomers}</p>
            <span className="stat-change positive">+15 new this month</span>
          </div>
        </div>
        <div className="stat-card">
          <DollarSign className="stat-icon" />
          <div className="stat-content">
            <h3>Revenue</h3>
            <p className="stat-number">₹{stats.revenue}</p>
            <span className="stat-change positive">+18% this month</span>
          </div>
        </div>
        <div className="stat-card">
          <Star className="stat-icon" />
          <div className="stat-content">
            <h3>Avg Rating</h3>
            <p className="stat-number">{stats.avgRating}</p>
            <span className="stat-change positive">+0.3 this month</span>
          </div>
        </div>
        <div className="stat-card">
          <PieChart className="stat-icon" />
          <div className="stat-content">
            <h3>Pending</h3>
            <p className="stat-number">{stats.pending}</p>
            <span className="stat-change neutral">Awaiting approval</span>
          </div>
        </div>
      </div>

      <div className="dashboard-sections">
        <div className="section-card full-width">
          <h3>Revenue Overview</h3>
          <div className="revenue-chart">
            <div className="chart-placeholder">
              <TrendingUp className="chart-icon" />
              <p>Revenue Analytics Chart</p>
              <small>Monthly revenue breakdown by package</small>
            </div>
          </div>
        </div>

        <div className="section-card">
          <h3>Recent Activities</h3>
          <ul className="activity-list">
            <li>
              <Ticket className="activity-icon" /> New booking: Goa Beach Paradise by John Doe
            </li>
            <li>
              <Star className="activity-icon" /> New review: 5 stars for Kerala Backwaters Tour
            </li>
            <li>
              <Users className="activity-icon" /> Customer inquiry: North India Package details
            </li>
            <li>
              <TrendingUp className="activity-icon" /> Revenue milestone: Reached ₹25L this month
            </li>
          </ul>
        </div>

        <div className="section-card">
          <h3>Top Performing Packages</h3>
          <ul className="activity-list">
            <li>🌴 Goa Beach Paradise - 45 bookings</li>
            <li>🏔️ Himalayan Adventure - 38 bookings</li>
            <li>🌊 Kerala Backwaters Tour - 35 bookings</li>
            <li>🏛️ Taj Mahal & Delhi Tour - 28 bookings</li>
          </ul>
        </div>
      </div>
    </OperatorLayout>
  )
}

export default OperatorDashboard
