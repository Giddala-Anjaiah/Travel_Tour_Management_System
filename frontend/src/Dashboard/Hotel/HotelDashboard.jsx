import React, { useState, useEffect } from 'react'
import { Bed, Calendar, Users, DollarSign, Star, TrendingUp, CheckCircle } from 'lucide-react'
import HotelLayout from './HotelLayout'

const HotelDashboard = () => {
  const [stats, setStats] = useState({
    totalRooms: 45,
    todayBookings: 12,
    currentGuests: 38,
    revenue: '1.8L',
    avgRating: 4.6,
    occupancyRate: 84,
    pendingCheckouts: 8
  })

  return (
    <HotelLayout active="dashboard" title="Dashboard Analytics">
      <div className="stats-grid">
        <div className="stat-card">
          <Bed className="stat-icon" />
          <div className="stat-content">
            <h3>Total Rooms</h3>
            <p className="stat-number">{stats.totalRooms}</p>
            <span className="stat-change positive">{stats.occupancyRate}% Occupied</span>
          </div>
        </div>
        <div className="stat-card">
          <Calendar className="stat-icon" />
          <div className="stat-content">
            <h3>Today's Bookings</h3>
            <p className="stat-number">{stats.todayBookings}</p>
            <span className="stat-change positive">+3 this week</span>
          </div>
        </div>
        <div className="stat-card">
          <Users className="stat-icon" />
          <div className="stat-content">
            <h3>Current Guests</h3>
            <p className="stat-number">{stats.currentGuests}</p>
            <span className="stat-change positive">+5 new today</span>
          </div>
        </div>
        <div className="stat-card">
          <DollarSign className="stat-icon" />
          <div className="stat-content">
            <h3>Monthly Revenue</h3>
            <p className="stat-number">₹{stats.revenue}</p>
            <span className="stat-change positive">+22% this month</span>
          </div>
        </div>
        <div className="stat-card">
          <Star className="stat-icon" />
          <div className="stat-content">
            <h3>Avg Rating</h3>
            <p className="stat-number">{stats.avgRating}</p>
            <span className="stat-change positive">+0.2 this month</span>
          </div>
        </div>
        <div className="stat-card">
          <CheckCircle className="stat-icon" />
          <div className="stat-content">
            <h3>Pending Checkouts</h3>
            <p className="stat-number">{stats.pendingCheckouts}</p>
            <span className="stat-change neutral">Today</span>
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
              <small>Monthly revenue breakdown by room type</small>
            </div>
          </div>
        </div>

        <div className="section-card">
          <h3>Recent Activities</h3>
          <ul className="activity-list">
            <li><Calendar className="activity-icon" /> New booking: Room 301 - John Doe</li>
            <li><Star className="activity-icon" /> New review: 5 stars - Excellent service!</li>
            <li><Users className="activity-icon" /> Check-in: Room 205 - Sarah Smith</li>
            <li><CheckCircle className="activity-icon" /> Check-out completed: Room 102</li>
            <li><DollarSign className="activity-icon" /> Payment received: ₹15,000</li>
          </ul>
        </div>

        <div className="section-card">
          <h3>Room Status Overview</h3>
          <ul className="activity-list">
            <li>🟢 Available: 7 rooms</li>
            <li>🔵 Occupied: 38 rooms</li>
            <li>🟡 Maintenance: 2 rooms</li>
            <li>⚫ Reserved: 5 rooms</li>
          </ul>
        </div>
      </div>
    </HotelLayout>
  )
}

export default HotelDashboard
