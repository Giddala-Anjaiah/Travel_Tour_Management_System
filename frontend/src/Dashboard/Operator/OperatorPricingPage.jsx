<<<<<<< HEAD
=======
import React from 'react'
>>>>>>> 3cf0d69510b5ba4025d05bd75ea1c397ae427639
import OperatorLayout from './OperatorLayout'
import OperatorPricingAvailability from './OperatorPricingAvailability'

const OperatorPricingPage = () => {
  return (
    <OperatorLayout active="pricing" title="Pricing & Availability">
      <OperatorPricingAvailability />
    </OperatorLayout>
  )
}

export default OperatorPricingPage
