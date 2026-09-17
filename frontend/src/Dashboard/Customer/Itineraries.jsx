import React, { useState } from 'react'
import { Calendar, Clock, Building, Star, Search, Eye, ArrowRight, Compass, Sparkles, CheckCircle, Info } from 'lucide-react'
import { Link } from 'react-router-dom'
import CustomerLayout from './CustomerLayout'
import '../Dashboard.css'

const Itineraries = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedItinerary, setSelectedItinerary] = useState(null)
  const [showDetails, setShowDetails] = useState(false)

  const itineraries = [
    { 
      id: 1, 
      name: 'Goa Beach Paradise', 
      package: 'Goa Beach Paradise',
      days: 3,
      hotels: 2,
      status: 'active',
      difficulty: 'Easy',
      category: 'beach',
      image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80',
      highlights: ['Beach Hopping', 'Water Sports', 'Sunset Points', 'Local Cuisine'],
      schedule: [
        { day: 1, title: 'Arrival & Beach Exploration', activities: ['Arrival at Goa Airport', 'Check-in at Resort', 'Beach Walk at Calangute', 'Welcome Dinner'], meals: ['Lunch', 'Dinner'] },
        { day: 2, title: 'North Goa Adventure', activities: ['North Goa Sightseeing', 'Water Sports at Baga Beach', 'Sunset at Anjuna Beach', 'Beach Party'], meals: ['Breakfast', 'Lunch', 'Dinner'] },
        { day: 3, title: 'South Goa & Departure', activities: ['South Goa Churches Visit', 'Dudhsagar Waterfall', 'Shopping at Panjim', 'Departure'], meals: ['Breakfast', 'Lunch'] }
      ]
    },
    { 
      id: 2, 
      name: 'Kerala Backwaters', 
      package: 'Kerala Backwaters',
      days: 5,
      hotels: 3,
      status: 'active',
      difficulty: 'Easy',
      category: 'nature',
      image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80',
      highlights: ['Houseboat Stay', 'Tea Gardens', 'Ayurveda', 'Cultural Shows'],
      schedule: [
        { day: 1, title: 'Cochi Arrival', activities: ['Arrival at Kochi', 'Fort Kochi Tour', 'Kathakali Show', 'Sunset at Marine Drive'], meals: ['Lunch', 'Dinner'] },
        { day: 2, title: 'Houseboat Experience', activities: ['Alleppey Houseboat Check-in', 'Backwater Cruise', 'Village Visit', 'Traditional Lunch'], meals: ['Breakfast', 'Lunch', 'Dinner'] },
        { day: 3, title: 'Backwater Exploration', activities: ['Houseboat Stay', 'Kuttanad Village Tour', 'Sunset on Backwaters', 'Fishing Experience'], meals: ['Breakfast', 'Lunch', 'Dinner'] },
        { day: 4, title: 'Munnar Hills', activities: ['Munnar Transfer', 'Tea Garden Visit', 'Echo Point', 'Mattupetty Dam'], meals: ['Breakfast', 'Lunch', 'Dinner'] },
        { day: 5, title: 'Departure', activities: ['Top Station Visit', 'Shopping at Munnar', 'Departure from Cochin'], meals: ['Breakfast', 'Lunch'] }
      ]
    },
    { 
      id: 3, 
      name: 'Himalayan Adventure', 
      package: 'Himalayan Adventure',
      days: 7,
      hotels: 4,
      status: 'active',
      difficulty: 'Moderate',
      category: 'adventure',
      image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80',
      highlights: ['Trekking', 'Camping', 'River Rafting', 'Mountain Views'],
      schedule: [
        { day: 1, title: 'Manali Arrival', activities: ['Arrival at Manali', 'Check-in at Hotel', 'Mall Road Walk', 'Local Cuisine'], meals: ['Lunch', 'Dinner'] },
        { day: 2, title: 'Rohtang Pass', activities: ['Rohtang Pass Visit', 'Solang Valley', 'Adventure Activities', 'Snow Point'], meals: ['Breakfast', 'Lunch', 'Dinner'] },
        { day: 3, title: 'Manikaran', activities: ['Manikaran Visit', 'Hot Springs', 'Kullu Valley Tour', 'River Rafting'], meals: ['Breakfast', 'Lunch', 'Dinner'] },
        { day: 4, title: 'Trekking Day 1', activities: ['Trek to Hampta Pass', 'Camp Setup', 'Mountain Views', 'Campfire Dinner'], meals: ['Breakfast', 'Lunch', 'Dinner'] },
        { day: 5, title: 'Trekking Day 2', activities: ['Trek Continuation', 'Chandra Tal Lake', 'Camping', 'Stargazing'], meals: ['Breakfast', 'Lunch', 'Dinner'] },
        { day: 6, title: 'Return to Manali', activities: ['Return to Manali', 'Hadimba Temple', 'Vashisht Hot Springs', 'Shopping'], meals: ['Breakfast', 'Lunch', 'Dinner'] },
        { day: 7, title: 'Departure', activities: ['Shopping at Manali', 'Departure'], meals: ['Breakfast'] }
      ]
    }
  ]

  const filteredItineraries = itineraries.filter(it => 
    it.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    it.package.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const viewDetails = (itinerary) => {
    setSelectedItinerary(itinerary)
    setShowDetails(true)
  }

  const getDifficultyColor = (difficulty) => {
    const colors = {
      'Easy': '#22c55e',
      'Moderate': '#f59e0b',
      'Hard': '#ef4444'
    }
    return colors[difficulty] || '#64748b'
  }

  const getCategoryBadge = (category) => {
    const badges = {
      beach: { label: 'Beach', color: '#0e7490' },
      nature: { label: 'Nature', color: '#15803d' },
      adventure: { label: 'Adventure', color: '#b45309' },
      heritage: { label: 'Heritage', color: '#6d28d9' }
    }
    return badges[category] || { label: 'Tour', color: '#475569' }
  }

  return (
    <CustomerLayout
      active="itineraries"
      title="Itineraries"
      subtitle="Day-by-day plans from arrival to departure"
      actions={
        <div className="header-stats">
          <div className="stat-badge">
            <Sparkles className="h-4 w-4" />
            <span>{itineraries.length} itineraries</span>
          </div>
        </div>
      }
    >
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
          </div>

          <div className="itineraries-grid enhanced">
            {filteredItineraries.map(itinerary => {
              const categoryBadge = getCategoryBadge(itinerary.category)
              return (
                <div key={itinerary.id} className="itinerary-card enhanced">
                  <div className="itinerary-header enhanced">
                    <div className="itinerary-image-wrapper">
                      <img className="cp-cover" src={itinerary.image} alt={itinerary.name} />
                    </div>
                    <div className="itinerary-info">
                      <h3>{itinerary.name}</h3>
                      <div className="itinerary-package">
                        <Star className="h-4 w-4" />
                        <span>{itinerary.package}</span>
                      </div>
                    </div>
                    <div className="itinerary-badges">
                      <div className="itinerary-category-badge" style={{ backgroundColor: categoryBadge.color }}>
                        <span>{categoryBadge.label}</span>
                      </div>
                      <div className="itinerary-difficulty-badge" style={{ backgroundColor: getDifficultyColor(itinerary.difficulty) }}>
                        <Compass className="h-3 w-3" />
                        <span>{itinerary.difficulty}</span>
                      </div>
                      <span className={`status-badge ${itinerary.status}`}>
                        <CheckCircle className="h-3 w-3" />
                        {itinerary.status}
                      </span>
                    </div>
                  </div>

                  <div className="itinerary-highlights">
                    <h4>Trip Highlights</h4>
                    <div className="highlights-grid">
                      {itinerary.highlights.slice(0, 4).map((highlight, idx) => (
                        <span key={idx} className="highlight-tag">
                          <Sparkles className="h-3 w-3" />
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="itinerary-meta enhanced">
                    <span className="meta-item">
                      <Clock className="h-4 w-4" />
                      <div>
                        <small>Duration</small>
                        <strong>{itinerary.days} Days</strong>
                      </div>
                    </span>
                    <span className="meta-item">
                      <Building className="h-4 w-4" />
                      <div>
                        <small>Hotels</small>
                        <strong>{itinerary.hotels} Properties</strong>
                      </div>
                    </span>
                  </div>

                  <div className="itinerary-preview">
                    <h4>Daily Schedule Preview</h4>
                    <div className="schedule-preview">
                      {itinerary.schedule.slice(0, 3).map((day, idx) => (
                        <div key={idx} className="day-preview">
                          <span className="day-number">Day {day.day}</span>
                          <span className="day-title">{day.title}</span>
                        </div>
                      ))}
                      {itinerary.schedule.length > 3 && (
                        <span className="more-days">+{itinerary.schedule.length - 3} more days</span>
                      )}
                    </div>
                  </div>

                  <div className="itinerary-actions enhanced">
                    <button onClick={() => viewDetails(itinerary)} className="btn-secondary enhanced">
                      <Eye className="h-4 w-4" /> View Full Itinerary
                    </button>
                    <Link to="/customer/bookings" className="btn-primary enhanced">
                      Book This Trip <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
      {showDetails && selectedItinerary && (
        <div className="modal-overlay">
          <div className="modal itinerary-modal">
            <div className="modal-header">
              <div>
                <h3>{selectedItinerary.name} - Detailed Itinerary</h3>
                <p className="modal-subtitle">{selectedItinerary.package}</p>
              </div>
              <button onClick={() => setShowDetails(false)} className="modal-close">×</button>
            </div>
            <div className="modal-body">
              <div className="itinerary-details enhanced">
                <div className="itinerary-summary">
                  <div className="summary-item">
                    <Clock className="h-5 w-5" />
                    <div>
                      <small>Duration</small>
                      <strong>{selectedItinerary.days} Days</strong>
                    </div>
                  </div>
                  <div className="summary-item">
                    <Building className="h-5 w-5" />
                    <div>
                      <small>Hotels</small>
                      <strong>{selectedItinerary.hotels} Properties</strong>
                    </div>
                  </div>
                  <div className="summary-item">
                    <Compass className="h-5 w-5" />
                    <div>
                      <small>Difficulty</small>
                      <strong>{selectedItinerary.difficulty}</strong>
                    </div>
                  </div>
                </div>

                <div className="itinerary-timeline">
                  {selectedItinerary.schedule.map((day, idx) => (
                    <div key={idx} className="day-schedule enhanced">
                      <div className="day-header enhanced">
                        <div className="day-number-badge">Day {day.day}</div>
                        <h4>{day.title}</h4>
                        {day.meals && (
                          <div className="meals-info">
                            <Info className="h-4 w-4" />
                            <span>Meals: {day.meals.join(', ')}</span>
                          </div>
                        )}
                      </div>
                      <div className="activities-list enhanced">
                        {day.activities.map((activity, actIdx) => (
                          <div key={actIdx} className="activity-item">
                            <div className="activity-dot"></div>
                            <span>{activity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="itinerary-modal-actions">
                  <button 
                    onClick={() => setShowDetails(false)}
                    className="btn-secondary"
                  >
                    Close
                  </button>
                  <Link to="/customer/bookings" className="btn-primary">
                    Book This Itinerary <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </CustomerLayout>
  )
}

export default Itineraries
