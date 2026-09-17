import React from 'react'
import HotelLayout from './HotelLayout'

const HotelRoomsPage = () => {
  return (
    <HotelLayout active="rooms" title="Room Management">
      <div className="section-card">
        <h3>Room Management</h3>
        <div className="placeholder-content">
          <p>Manage your hotel rooms, types, and configurations</p>
          <ul>
            <li>Add/Edit room details</li>
            <li>Set room categories (Standard, Deluxe, Suite)</li>
            <li>Manage room amenities</li>
            <li>Configure bed types</li>
          </ul>
        </div>
      </div>
    </HotelLayout>
  )
}

export default HotelRoomsPage
