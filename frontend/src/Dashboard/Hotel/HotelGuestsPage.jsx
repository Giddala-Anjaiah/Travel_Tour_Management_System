import React from 'react'
import HotelLayout from './HotelLayout'

const HotelGuestsPage = () => {
  return (
    <HotelLayout active="guests" title="Customer Information">
      <div className="section-card">
        <h3>Guest Management</h3>
        <div className="placeholder-content">
          <p>View and manage guest information</p>
          <ul>
            <li>Guest profiles</li>
            <li>Contact information</li>
            <li>Booking history</li>
            <li>Guest preferences</li>
            <li>Communication history</li>
            <li>Guest loyalty programs</li>
          </ul>
        </div>
      </div>
    </HotelLayout>
  )
}

export default HotelGuestsPage
