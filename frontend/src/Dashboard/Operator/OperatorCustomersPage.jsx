<<<<<<< HEAD
=======
import React from 'react'
>>>>>>> 3cf0d69510b5ba4025d05bd75ea1c397ae427639
import OperatorLayout from './OperatorLayout'
import OperatorCustomers from './OperatorCustomers'

const OperatorCustomersPage = () => {
  return (
    <OperatorLayout active="customers" title="Customer Information">
      <OperatorCustomers />
    </OperatorLayout>
  )
}

export default OperatorCustomersPage
