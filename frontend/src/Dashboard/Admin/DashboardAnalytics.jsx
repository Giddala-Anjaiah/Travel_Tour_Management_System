import { useEffect, useState } from 'react'
import { BarChart3, Users, MapPin, Building, Ticket, DollarSign, Star, TrendingUp, Download, FileText, Tag } from 'lucide-react'
import { Link } from 'react-router-dom'
import { api, downloadCsv, formatCurrency } from '../../api'
import AdminLayout from './AdminLayout'

const DashboardAnalytics = () => {
  const [analytics, setAnalytics] = useState(null)
  const [timeRange, setTimeRange] = useState('month')
  const [error, setError] = useState('')

  useEffect(() => {
    const load = async () => {
      try {
        setError('')
        const data = await api(`/admin/analytics?range=${timeRange}`)
        setAnalytics(data)
      } catch (err) {
        setError(err.message)
      }
    }
    load()
  }, [timeRange])

  const exportReport = () => {
    if (!analytics) return
    downloadCsv(
      'analytics-report.csv',
      ['Metric', 'Value'],
      [
        ['Total Users', analytics.totalUsers],
        ['Active Tours', analytics.activeTours],
        ['Partner Hotels', analytics.partnerHotels],
        ['Total Bookings', analytics.totalBookings],
        ['Total Revenue', analytics.totalRevenue],
        ['Average Rating', analytics.avgRating],
        ['Confirmed Bookings', analytics.bookingStats?.confirmed || 0],
        ['Pending Bookings', analytics.bookingStats?.pending || 0],
        ['Cancelled Bookings', analytics.bookingStats?.cancelled || 0]
      ]
    )
  }

  return (
    <AdminLayout
      active="dashboard"
      title="Dashboard Analytics"
      actions={
        <>
          <select value={timeRange} onChange={(e) => setTimeRange(e.target.value)} className="time-range-select">
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
          <button onClick={exportReport} className="action-btn">
            <Download className="h-4 w-4" />
            Export Report
          </button>
        </>
      }
    >
      {error && <div className="error-message">{error}</div>}
      {!analytics ? (
        <div style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>Loading analytics...</div>
      ) : (
        <>
          <div className="stats-grid">
            <div className="stat-card">
              <Users className="stat-icon" />
              <div className="stat-content">
                <h3>Total Users</h3>
                <p className="stat-number">{analytics.totalUsers.toLocaleString()}</p>
                <span className="stat-change positive">
                  <TrendingUp className="h-3 w-3" /> +{analytics.range?.users || 0} in range
                </span>
              </div>
            </div>
            <div className="stat-card">
              <MapPin className="stat-icon" />
              <div className="stat-content">
                <h3>Active Tours</h3>
                <p className="stat-number">{analytics.activeTours}</p>
              </div>
            </div>
            <div className="stat-card">
              <Building className="stat-icon" />
              <div className="stat-content">
                <h3>Partner Hotels</h3>
                <p className="stat-number">{analytics.partnerHotels}</p>
              </div>
            </div>
            <div className="stat-card">
              <Ticket className="stat-icon" />
              <div className="stat-content">
                <h3>Total Bookings</h3>
                <p className="stat-number">{analytics.totalBookings.toLocaleString()}</p>
                <span className="stat-change positive">
                  <TrendingUp className="h-3 w-3" /> {analytics.range?.bookings || 0} in range
                </span>
              </div>
            </div>
            <div className="stat-card">
              <DollarSign className="stat-icon" />
              <div className="stat-content">
                <h3>Total Revenue</h3>
                <p className="stat-number">{formatCurrency(analytics.totalRevenue)}</p>
                <span className="stat-change positive">
                  <TrendingUp className="h-3 w-3" /> {formatCurrency(analytics.range?.revenue || 0)} in range
                </span>
              </div>
            </div>
            <div className="stat-card">
              <Star className="stat-icon" />
              <div className="stat-content">
                <h3>Avg Rating</h3>
                <p className="stat-number">{analytics.avgRating}</p>
              </div>
            </div>
          </div>

          <div className="dashboard-sections">
            <div className="section-card full-width">
              <h3>Revenue Trend (last 6 months)</h3>
              <div className="revenue-chart">
                <div className="chart-placeholder">
                  <BarChart3 className="chart-icon" />
                  <p>{(analytics.monthlyRevenue || []).map(formatCurrency).join(' → ') || 'No paid bookings yet'}</p>
                  <small>Current total: {formatCurrency(analytics.totalRevenue)}</small>
                </div>
              </div>
            </div>

            <div className="section-card">
              <h3>User Growth</h3>
              <div className="growth-chart">
                <div className="chart-placeholder">
                  <Users className="chart-icon" />
                  <p>{(analytics.userGrowth || []).join(' → ') || '0'}</p>
                  <small>Total users: {analytics.totalUsers.toLocaleString()}</small>
                </div>
              </div>
            </div>

            <div className="section-card">
              <h3>Booking Status</h3>
              <div className="booking-stats">
                <div className="booking-stat-item confirmed">
                  <span className="stat-label">Confirmed</span>
                  <span className="stat-value">{analytics.bookingStats?.confirmed || 0}</span>
                </div>
                <div className="booking-stat-item pending">
                  <span className="stat-label">Pending</span>
                  <span className="stat-value">{analytics.bookingStats?.pending || 0}</span>
                </div>
                <div className="booking-stat-item cancelled">
                  <span className="stat-label">Cancelled</span>
                  <span className="stat-value">{analytics.bookingStats?.cancelled || 0}</span>
                </div>
              </div>
            </div>

            <div className="section-card">
              <h3>Top Performing Tours</h3>
              <ul className="top-tours-list">
                {(analytics.topTours || []).length === 0 && <li>No packages yet</li>}
                {(analytics.topTours || []).map((tour) => (
                  <li key={tour.name}>
                    <span className="tour-name">{tour.name}</span>
                    <span className="tour-bookings">{tour.bookings} bookings</span>
                    <span className="tour-revenue">{formatCurrency(tour.revenue)}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="section-card">
              <h3>Recent Activity</h3>
              <ul className="activity-list">
                {(analytics.recentActivity || []).length === 0 && <li>No recent activity</li>}
                {(analytics.recentActivity || []).map((item, index) => (
                  <li key={`${item.type}-${index}`}>
                    {item.type === 'user' && <Users className="activity-icon" />}
                    {item.type === 'booking' && <Ticket className="activity-icon" />}
                    {item.type === 'review' && <Star className="activity-icon" />}
                    {item.type === 'invoice' && <FileText className="activity-icon" />}
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>

            <div className="section-card">
              <h3>Upcoming Bookings</h3>
              <ul className="booking-list">
                {(analytics.upcomingBookings || []).length === 0 && <li>No bookings yet</li>}
                {(analytics.upcomingBookings || []).map((booking, index) => (
                  <li key={`${booking.customer}-${index}`}>
                    <span className="booking-customer">{booking.customer}</span>
                    <span className="booking-package">{booking.package}</span>
                    <span className="booking-dates">{booking.dates}</span>
                    <span className={`booking-status ${booking.status}`}>{booking.status}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="section-card">
              <h3>Room Availability</h3>
              <div className="room-grid">
                <div className="room-card">
                  <div className="room-type">Inventory</div>
                  <div className="room-details">
                    <span>Available: {analytics.rooms?.available || 0}</span>
                    <span>Booked: {analytics.rooms?.booked || 0}</span>
                  </div>
                  <span className="room-price">Total rooms: {analytics.rooms?.total || 0}</span>
                </div>
              </div>
            </div>

            <div className="section-card">
              <h3>Quick Actions</h3>
              <div className="quick-actions">
                <Link to="/admin/users" className="action-btn"><Users className="h-4 w-4" /> Manage Users</Link>
                <Link to="/admin/destinations" className="action-btn"><MapPin className="h-4 w-4" /> Manage Packages</Link>
                <Link to="/admin/bookings" className="action-btn"><Ticket className="h-4 w-4" /> Manage Bookings</Link>
                <Link to="/admin/reports?tab=coupons" className="action-btn"><Tag className="h-4 w-4" /> Coupons</Link>
                <Link to="/admin/reports" className="action-btn"><BarChart3 className="h-4 w-4" /> View Reports</Link>
              </div>
            </div>
          </div>
        </>
      )}
    </AdminLayout>
  )
}

export default DashboardAnalytics
