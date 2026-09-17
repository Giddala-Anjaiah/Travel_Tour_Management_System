<<<<<<< HEAD
=======
import React from 'react'
>>>>>>> 3cf0d69510b5ba4025d05bd75ea1c397ae427639
import OperatorLayout from './OperatorLayout'
import OperatorBookings from './OperatorBookings'

const OperatorBookingsPage = () => {
  return (
    <OperatorLayout active="bookings" title="Booking Management">
      <OperatorBookings />
    </OperatorLayout>
  )
}

export default OperatorBookingsPage
