<<<<<<< HEAD
import { useState, useEffect } from 'react'
import usePolling from '../../hooks/usePolling'
import { Building, Ticket, Users, DollarSign, Star, PieChart, TrendingUp } from 'lucide-react'
import OperatorLayout from './OperatorLayout'
import { api, formatCurrency } from '../../api'

const OperatorDashboard = () => {
  const [stats, setStats] = useState({
    totalPackages: 0,
    activePackages: 0,
    totalBookings: 0,
    totalCustomers: 0,
    revenue: 0,
    avgRating: 0,
    pending: 0
  })
  const [topPackages, setTopPackages] = useState([])
  const [activities, setActivities] = useState([])

  const load = async () => {
    try {
      const results = await Promise.allSettled([
        api('/operator/packages').catch(() => ({ packages: [] })),
        api('/operator/bookings').catch(() => ({ bookings: [] })),
        api('/operator/customers').catch(() => ({ customers: [] })),
        api('/operator/reviews').catch(() => ({ reviews: [] })),
        api('/operator/revenue').catch(() => ({}))
      ])
      const packages = results[0].status === 'fulfilled' ? results[0].value.packages || [] : []
      const bookings = results[1].status === 'fulfilled' ? results[1].value.bookings || [] : []
      const customers = results[2].status === 'fulfilled' ? results[2].value.customers || [] : []
      const reviews = results[3].status === 'fulfilled' ? results[3].value.reviews || [] : []
      const revenue = results[4].status === 'fulfilled' ? results[4].value : {}

      const approvedReviews = reviews.filter(r => r.status === 'approved')
      const avgRating = approvedReviews.length
        ? approvedReviews.reduce((s, r) => s + r.rating, 0) / approvedReviews.length
        : 0

      const revenueByPackage = revenue.revenueByPackage || []
      const tops = revenueByPackage.slice(0, 4).map(p => ({
        name: p._id || 'Package',
        bookings: p.count || 0
      }))

      const acts = []
      bookings.slice(0, 3).forEach(b => {
        acts.push(`New booking: ${b.package} by ${b.customer}`)
      })
      reviews.slice(0, 2).forEach(r => {
        acts.push(`New review: ${r.rating} stars for ${r.package}`)
      })

      setStats({
        totalPackages: packages.length,
        activePackages: packages.filter(p => p.status === 'active' && p.publishedStatus === 'published').length,
        totalBookings: bookings.length,
        totalCustomers: customers.length,
        revenue: revenue.totalRevenue || 0,
        avgRating: Number(avgRating.toFixed(1)),
        pending: bookings.filter(b => b.status === 'pending').length
      })
      setTopPackages(tops)
      setActivities(acts)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    Promise.resolve().then(() => load())
  }, [])

  usePolling(load, 15000)
=======
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
>>>>>>> 3cf0d69510b5ba4025d05bd75ea1c397ae427639

  return (
    <OperatorLayout active="dashboard" title="Dashboard Analytics">
      <div className="stats-grid">
        <div className="stat-card">
          <Building className="stat-icon" />
          <div className="stat-content">
            <h3>Total Packages</h3>
            <p className="stat-number">{stats.totalPackages}</p>
<<<<<<< HEAD
            <span className="stat-change positive">{stats.activePackages} Active</span>
=======
            <span className="stat-change positive">8 Active</span>
>>>>>>> 3cf0d69510b5ba4025d05bd75ea1c397ae427639
          </div>
        </div>
        <div className="stat-card">
          <Ticket className="stat-icon" />
          <div className="stat-content">
            <h3>Total Bookings</h3>
            <p className="stat-number">{stats.totalBookings}</p>
<<<<<<< HEAD
            <span className="stat-change positive">All time</span>
=======
            <span className="stat-change positive">+23 this month</span>
>>>>>>> 3cf0d69510b5ba4025d05bd75ea1c397ae427639
          </div>
        </div>
        <div className="stat-card">
          <Users className="stat-icon" />
          <div className="stat-content">
            <h3>Total Customers</h3>
            <p className="stat-number">{stats.totalCustomers}</p>
<<<<<<< HEAD
            <span className="stat-change positive">Unique customers</span>
=======
            <span className="stat-change positive">+15 new this month</span>
>>>>>>> 3cf0d69510b5ba4025d05bd75ea1c397ae427639
          </div>
        </div>
        <div className="stat-card">
          <DollarSign className="stat-icon" />
          <div className="stat-content">
            <h3>Revenue</h3>
<<<<<<< HEAD
            <p className="stat-number">{formatCurrency(stats.revenue)}</p>
            <span className="stat-change positive">From paid bookings</span>
=======
            <p className="stat-number">₹{stats.revenue}</p>
            <span className="stat-change positive">+18% this month</span>
>>>>>>> 3cf0d69510b5ba4025d05bd75ea1c397ae427639
          </div>
        </div>
        <div className="stat-card">
          <Star className="stat-icon" />
          <div className="stat-content">
            <h3>Avg Rating</h3>
<<<<<<< HEAD
            <p className="stat-number">{stats.avgRating || '—'}</p>
            <span className="stat-change positive">Approved reviews</span>
=======
            <p className="stat-number">{stats.avgRating}</p>
            <span className="stat-change positive">+0.3 this month</span>
>>>>>>> 3cf0d69510b5ba4025d05bd75ea1c397ae427639
          </div>
        </div>
        <div className="stat-card">
          <PieChart className="stat-icon" />
          <div className="stat-content">
            <h3>Pending</h3>
            <p className="stat-number">{stats.pending}</p>
<<<<<<< HEAD
            <span className="stat-change neutral">Awaiting confirmation</span>
=======
            <span className="stat-change neutral">Awaiting approval</span>
>>>>>>> 3cf0d69510b5ba4025d05bd75ea1c397ae427639
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
<<<<<<< HEAD
              <small>Total revenue: {formatCurrency(stats.revenue)}</small>
=======
              <small>Monthly revenue breakdown by package</small>
>>>>>>> 3cf0d69510b5ba4025d05bd75ea1c397ae427639
            </div>
          </div>
        </div>

        <div className="section-card">
          <h3>Recent Activities</h3>
          <ul className="activity-list">
<<<<<<< HEAD
            {activities.length === 0 && <li>No recent activity yet.</li>}
            {activities.map((a, i) => (
              <li key={i}><Ticket className="activity-icon" /> {a}</li>
            ))}
=======
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
>>>>>>> 3cf0d69510b5ba4025d05bd75ea1c397ae427639
          </ul>
        </div>

        <div className="section-card">
          <h3>Top Performing Packages</h3>
          <ul className="activity-list">
<<<<<<< HEAD
            {topPackages.length === 0 && <li>No booking data yet.</li>}
            {topPackages.map((p, i) => (
              <li key={i}>📦 {p.name} - {p.bookings} bookings</li>
            ))}
=======
            <li>🌴 Goa Beach Paradise - 45 bookings</li>
            <li>🏔️ Himalayan Adventure - 38 bookings</li>
            <li>🌊 Kerala Backwaters Tour - 35 bookings</li>
            <li>🏛️ Taj Mahal & Delhi Tour - 28 bookings</li>
>>>>>>> 3cf0d69510b5ba4025d05bd75ea1c397ae427639
          </ul>
        </div>
      </div>
    </OperatorLayout>
  )
}

<<<<<<< HEAD
export default OperatorDashboard
=======
export default OperatorDashboard
>>>>>>> 3cf0d69510b5ba4025d05bd75ea1c397ae427639
