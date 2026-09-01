import React from 'react'
import HotelLayout from './HotelLayout'

const HotelPricingPage = () => {
  return (
    <HotelLayout active="pricing" title="Pricing">
      <div className="section-card">
        <h3>Room Pricing</h3>
        <div className="placeholder-content">
          <p>Set and manage room prices by type and season</p>
          <ul>
            <li>Base room pricing</li>
            <li>Seasonal rate adjustments</li>
            <li>Weekday/Weekend pricing</li>
            <li>Discount management</li>
          </ul>
        </div>
      </div>
    </HotelLayout>
  )
}

export default HotelPricingPage
