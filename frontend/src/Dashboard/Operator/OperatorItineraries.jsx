import React, { useState, useEffect } from 'react'
import { Calendar, MapPin, Plus, Search, Edit, Trash2, Clock, Building, Utensils, Car, Bed, ArrowRight, Sparkles } from 'lucide-react'
import '../Dashboard.css'

const OperatorItineraries = () => {
  const [itineraries, setItineraries] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [selectedPackage, setSelectedPackage] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    packageId: '',
    packageName: '',
    days: 1,
    dayDetails: []
  })

  useEffect(() => {
    fetchItineraries()
  }, [])

  const fetchItineraries = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('http://localhost:5000/api/operator/itineraries', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      const data = await response.json()
      if (data.itineraries) {
        setItineraries(data.itineraries)
      }
    } catch (error) {
      console.error('Error fetching itineraries:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = () => {
    setFormData({
      name: '',
      packageId: '',
      packageName: '',
      days: 1,
      dayDetails: []
    })
    setShowModal(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('http://localhost:5000/api/operator/itineraries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      })
      if (response.ok) {
        alert('Itinerary created successfully')
        setShowModal(false)
        fetchItineraries()
      } else {
        alert('Error creating itinerary')
      }
    } catch (error) {
      console.error('Error creating itinerary:', error)
      alert('Error creating itinerary')
    }
  }

  const filteredItineraries = itineraries.filter(itin => 
    itin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    itin.packageName?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <>
          <div className="filters-section enhanced">
            <div className="search-bar enhanced">
              <Search className="search-icon" />
              <input
                type="text"
                placeholder="Search itineraries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button onClick={handleCreate} className="btn-primary enhanced">
              <Plus className="h-4 w-4" />
              Create Itinerary
            </button>
          </div>

          {loading ? (
            <div className="loading-state">Loading itineraries...</div>
          ) : filteredItineraries.length === 0 ? (
            <div className="empty-state">
              <Calendar className="h-12 w-12" />
              <h3>No itineraries found</h3>
              <p>Create itineraries for your packages</p>
            </div>
          ) : (
            <div className="itineraries-list enhanced">
              {filteredItineraries.map(itin => (
                <div key={itin._id} className="itinerary-card enhanced">
                  <div className="itinerary-header">
                    <h3>{itin.name}</h3>
                    <span className="days-badge">{itin.days} Days</span>
                  </div>
                  <div className="itinerary-package">
                    <Building className="h-4 w-4" />
                    <span>{itin.packageName}</span>
                  </div>
                  <div className="itinerary-actions">
                    <button className="icon-btn">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="icon-btn delete">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Create Itinerary</h3>
              <button onClick={() => setShowModal(false)} className="modal-close">×</button>
            </div>
            <form onSubmit={handleSubmit} className="modal-body">
              <div className="form-group">
                <label>Itinerary Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Package Name</label>
                <input
                  type="text"
                  value={formData.packageName}
                  onChange={(e) => setFormData({ ...formData, packageName: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Number of Days</label>
                <input
                  type="number"
                  value={formData.days}
                  onChange={(e) => setFormData({ ...formData, days: parseInt(e.target.value) })}
                  min="1"
                  required
                />
              </div>
              <div className="form-actions">
                <button type="button" onClick={() => setShowModal(false)} className="btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn-primary enhanced">
                  <Sparkles className="h-4 w-4" />
                  Create Itinerary
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default OperatorItineraries
