import React from 'react'
import HotelLayout from './HotelLayout'

const HotelCheckInOutPage = () => {
  return (
    <HotelLayout active="checkin" title="Check-in / Check-out">
      <div className="section-card">
        <h3>Guest Check-in & Check-out</h3>
        <div className="placeholder-content">
          <p>Manage guest arrivals and departures</p>
          <ul>
            <li>Today's check-ins</li>
            <li>Today's check-outs</li>
            <li>Check-in form management</li>
            <li>Room assignment</li>
            <li>Guest documentation</li>
            <li>Express check-in/out</li>
          </ul>
        </div>
      </div>
    </HotelLayout>
  )
}

export default HotelCheckInOutPage
