import React from 'react'
import HotelLayout from './HotelLayout'

const HotelAvailabilityPage = () => {
  return (
    <HotelLayout active="availability" title="Room Availability">
      <div className="section-card">
        <h3>Room Availability Calendar</h3>
        <div className="placeholder-content">
          <p>Manage room availability and block dates</p>
          <ul>
            <li>Calendar view of availability</li>
            <li>Block/Unblock dates</li>
            <li>Bulk availability updates</li>
            <li>Availability by room type</li>
          </ul>
        </div>
      </div>
    </HotelLayout>
  )
}

export default HotelAvailabilityPage
