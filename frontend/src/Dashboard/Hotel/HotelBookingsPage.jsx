import React from 'react'
import HotelLayout from './HotelLayout'

const HotelBookingsPage = () => {
  return (
    <HotelLayout active="bookings" title="Hotel Bookings">
      <div className="section-card">
        <h3>Booking Management</h3>
        <div className="placeholder-content">
          <p>View and manage all hotel bookings</p>
          <ul>
            <li>Upcoming bookings</li>
            <li>Booking confirmations</li>
            <li>Payment status tracking</li>
            <li>Booking modifications</li>
            <li>Cancellation management</li>
          </ul>
        </div>
      </div>
    </HotelLayout>
  )
}

export default HotelBookingsPage
