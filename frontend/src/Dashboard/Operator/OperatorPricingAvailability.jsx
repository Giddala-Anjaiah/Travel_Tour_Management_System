import React, { useState, useEffect } from 'react'
import { DollarSign, Calendar, Plus, Search, Edit, Save, Users, TrendingUp, Sparkles, Clock, CheckCircle } from 'lucide-react'
import '../Dashboard.css'

const OperatorPricingAvailability = () => {
  const [pricing, setPricing] = useState(null)
  const [availability, setAvailability] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedPackageId, setSelectedPackageId] = useState('')

  useEffect(() => {
    if (selectedPackageId) {
      fetchPricing()
      fetchAvailability()
    }
  }, [selectedPackageId])

  const fetchPricing = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`http://localhost:5000/api/operator/pricing/package/${selectedPackageId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      const data = await response.json()
      if (data.pricing) {
        setPricing(data.pricing)
      }
    } catch (error) {
      console.error('Error fetching pricing:', error)
    }
  }

  const fetchAvailability = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`http://localhost:5000/api/operator/availability/package/${selectedPackageId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      const data = await response.json()
      if (data.availability) {
        setAvailability(data.availability)
      }
    } catch (error) {
      console.error('Error fetching availability:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
          <div className="section-card enhanced">
            <h3>Select Package</h3>
            <select
              value={selectedPackageId}
              onChange={(e) => setSelectedPackageId(e.target.value)}
              className="filter-select"
            >
              <option value="">Choose a package...</option>
              <option value="package1">Goa Beach Paradise</option>
              <option value="package2">Kerala Backwaters</option>
              <option value="package3">Himalayan Adventure</option>
            </select>
          </div>

          {selectedPackageId && (
            <>
              <div className="section-card enhanced">
                <div className="section-header">
                  <h3>Pricing Configuration</h3>
                  <button className="icon-btn">
                    <Edit className="h-4 w-4" />
                  </button>
                </div>
                {pricing ? (
                  <div className="pricing-details">
                    <div className="pricing-row">
                      <span>Base Price</span>
                      <strong>₹{pricing.basePrice?.toLocaleString()}</strong>
                    </div>
                    <div className="pricing-row">
                      <span>Adult Price</span>
                      <strong>₹{pricing.adultPrice?.toLocaleString()}</strong>
                    </div>
                    <div className="pricing-row">
                      <span>Child Price</span>
                      <strong>₹{pricing.childPrice?.toLocaleString()}</strong>
                    </div>
                    <div className="pricing-row">
                      <span>Discount</span>
                      <strong>{pricing.discount}%</strong>
                    </div>
                    <div className="pricing-row">
                      <span>Tax</span>
                      <strong>{pricing.tax}%</strong>
                    </div>
                  </div>
                ) : (
                  <div className="empty-state">
                    <p>No pricing configured yet</p>
                    <button className="btn-primary enhanced">
                      <Plus className="h-4 w-4" />
                      Add Pricing
                    </button>
                  </div>
                )}
              </div>

              <div className="section-card enhanced">
                <div className="section-header">
                  <h3>Availability Calendar</h3>
                  <button className="btn-primary enhanced">
                    <Plus className="h-4 w-4" />
                    Add Availability
                  </button>
                </div>
                {availability.length > 0 ? (
                  <div className="availability-list">
                    {availability.map((avail, index) => (
                      <div key={index} className="availability-item">
                        <div className="availability-dates">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(avail.startDate).toLocaleDateString()} - {new Date(avail.endDate).toLocaleDateString()}</span>
                        </div>
                        <div className="availability-seats">
                          <Users className="h-4 w-4" />
                          <span>{avail.availableSeats} / {avail.totalSeats} available</span>
                        </div>
                        <div className={`availability-status ${avail.status}`}>
                          <CheckCircle className="h-4 w-4" />
                          <span>{avail.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="empty-state">
                    <Calendar className="h-12 w-12" />
                    <h3>No availability configured</h3>
                    <p>Add availability dates for this package</p>
                  </div>
                )}
              </div>
            </>
          )}
      </>
  )
}

export default OperatorPricingAvailability
