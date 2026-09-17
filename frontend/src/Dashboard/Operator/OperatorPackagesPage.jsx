<<<<<<< HEAD
=======
import React from 'react'
>>>>>>> 3cf0d69510b5ba4025d05bd75ea1c397ae427639
import OperatorLayout from './OperatorLayout'
import OperatorPackages from './OperatorPackages'

const OperatorPackagesPage = () => {
  return (
    <OperatorLayout active="packages" title="Package Management">
      <OperatorPackages />
    </OperatorLayout>
  )
}

export default OperatorPackagesPage
