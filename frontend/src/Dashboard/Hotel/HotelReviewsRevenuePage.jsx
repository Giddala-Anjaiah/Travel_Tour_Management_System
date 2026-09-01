import React, { useState } from 'react'
import { Star, TrendingUp, Bell } from 'lucide-react'
import HotelLayout from './HotelLayout'
import '../Dashboard.css'

const HotelReviewsRevenuePage = () => {
  const [activeTab, setActiveTab] = useState('reviews')

  return (
    <HotelLayout active="reviews" title="Reviews, Revenue & Notifications">
      <div className="tabs-container">
        <div className="tabs">
          <button 
            className={`tab ${activeTab === 'reviews' ? 'active' : ''}`}
            onClick={() => setActiveTab('reviews')}
          >
            <Star className="h-4 w-4" />
            Reviews & Ratings
          </button>
          <button 
            className={`tab ${activeTab === 'revenue' ? 'active' : ''}`}
            onClick={() => setActiveTab('revenue')}
          >
            <TrendingUp className="h-4 w-4" />
            Revenue
          </button>
          <button 
            className={`tab ${activeTab === 'notifications' ? 'active' : ''}`}
            onClick={() => setActiveTab('notifications')}
          >
            <Bell className="h-4 w-4" />
            Notifications
          </button>
        </div>
      </div>
      <div className="tab-content">
        {activeTab === 'reviews' && (
          <div className="section-card">
            <h3>Guest Reviews & Ratings</h3>
            <div className="placeholder-content">
              <p>View and respond to guest reviews</p>
              <ul>
                <li>Review ratings and comments</li>
                <li>Filter reviews by rating</li>
                <li>Response management</li>
                <li>Average rating trends</li>
                <li>Review analytics</li>
              </ul>
            </div>
          </div>
        )}
        {activeTab === 'revenue' && (
          <div className="section-card">
            <h3>Revenue Analytics</h3>
            <div className="placeholder-content">
              <p>Track hotel revenue and occupancy</p>
              <ul>
                <li>Daily/Monthly revenue</li>
                <li>Occupancy rate trends</li>
                <li>Revenue by room type</li>
                <li>Payment tracking</li>
                <li>Commission details</li>
              </ul>
            </div>
          </div>
        )}
        {activeTab === 'notifications' && (
          <div className="section-card">
            <h3>Notifications</h3>
            <div className="placeholder-content">
              <p>Important notifications and alerts</p>
              <ul>
                <li>New bookings</li>
                <li>Guest reviews</li>
                <li>Payment confirmations</li>
                <li>System alerts</li>
                <li>Maintenance reminders</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </HotelLayout>
  )
}

export default HotelReviewsRevenuePage
