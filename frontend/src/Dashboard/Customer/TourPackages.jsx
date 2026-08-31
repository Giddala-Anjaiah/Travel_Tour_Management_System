import React, { useState } from 'react'
import { MapPin, Calendar, Users, Star, Heart, DollarSign, Search, Filter, ArrowRight, Clock, Ticket, Sparkles, Check, Zap, Shield, Award } from 'lucide-react'
import { Link } from 'react-router-dom'
import '../Dashboard.css'

const TourPackages = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterPrice, setFilterPrice] = useState('all')
  const [filterDuration, setFilterDuration] = useState('all')
  const [favorites, setFavorites] = useState([])

  const packages = [
    { 
      id: 1, 
      name: 'Goa Beach Paradise', 
      destination: 'Goa', 
      image: '🏖️',
      duration: '3 Days 2 Nights', 
      durationDays: 3,
      price: 15999, 
      rating: 4.8, 
      inclusions: ['Hotel', 'Breakfast', 'Sightseeing', 'Airport Transfer'], 
      maxPeople: 10,
      highlights: ['Beach Parties', 'Water Sports', 'Sunset Cruise', 'Local Cuisine'],
      difficulty: 'Easy',
      category: 'beach'
    },
    { 
      id: 2, 
      name: 'Kerala Backwaters', 
      destination: 'Kerala', 
      image: '🌴',
      duration: '5 Days 4 Nights', 
      durationDays: 5,
      price: 24999, 
      rating: 4.9, 
      inclusions: ['Houseboat', 'All Meals', 'Cultural Show', 'Guide'], 
      maxPeople: 8,
      highlights: ['Houseboat Stay', 'Tea Gardens', 'Ayurveda Spa', 'Village Tours'],
      difficulty: 'Easy',
      category: 'nature'
    },
    { 
      id: 3, 
      name: 'Himalayan Adventure', 
      destination: 'Himalayas', 
      image: '🏔️',
      duration: '7 Days 6 Nights', 
      durationDays: 7,
      price: 35999, 
      rating: 4.7, 
      inclusions: ['Trekking', 'Camping', 'Guide', 'Equipment'], 
      maxPeople: 12,
      highlights: ['Mountain Trekking', 'Camping', 'River Rafting', 'Scenic Views'],
      difficulty: 'Moderate',
      category: 'adventure'
    },
    { 
      id: 4, 
      name: 'Rajasthan Royal Tour', 
      destination: 'Rajasthan', 
      image: '🏰',
      duration: '6 Days 5 Nights', 
      durationDays: 6,
      price: 29999, 
      rating: 4.6, 
      inclusions: ['Palace Stay', 'Camel Safari', 'Folk Dance', 'Guide'], 
      maxPeople: 15,
      highlights: ['Palace Hotels', 'Desert Safari', 'Fort Tours', 'Cultural Shows'],
      difficulty: 'Easy',
      category: 'heritage'
    },
    { 
      id: 5, 
      name: 'Andaman Islands', 
      destination: 'Andaman', 
      image: '🏝️',
      duration: '6 Days 5 Nights', 
      durationDays: 6,
      price: 39999, 
      rating: 4.9, 
      inclusions: ['Scuba Diving', 'Beach Resort', 'Island Hopping', 'Guide'], 
      maxPeople: 10,
      highlights: ['Scuba Diving', 'Beach Camping', 'Island Tours', 'Bioluminescence'],
      difficulty: 'Easy',
      category: 'beach'
    },
    { 
      id: 6, 
      name: 'Golden Triangle', 
      destination: 'Delhi-Agra-Jaipur', 
      image: '🕌',
      duration: '5 Days 4 Nights', 
      durationDays: 5,
      price: 21999, 
      rating: 4.5, 
      inclusions: ['Heritage Hotels', 'Monument Tours', 'Guide', 'Transport'], 
      maxPeople: 20,
      highlights: ['Taj Mahal', 'Amber Fort', 'Qutub Minar', 'City Palace'],
      difficulty: 'Easy',
      category: 'heritage'
    },
  ]

  const filteredPackages = packages.filter(pkg => {
    const matchesSearch = pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pkg.destination.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPrice = filterPrice === 'all' ||
                        (filterPrice === 'low' && pkg.price < 20000) ||
                        (filterPrice === 'medium' && pkg.price >= 20000 && pkg.price < 35000) ||
                        (filterPrice === 'high' && pkg.price >= 35000)
    const matchesDuration = filterDuration === 'all' ||
                          (filterDuration === 'short' && pkg.durationDays <= 4) ||
                          (filterDuration === 'medium' && pkg.durationDays > 4 && pkg.durationDays <= 6) ||
                          (filterDuration === 'long' && pkg.durationDays > 6)
    return matchesSearch && matchesPrice && matchesDuration
  })

  const toggleFavorite = (id) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    )
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
      beach: { icon: '🏖️', label: 'Beach', color: '#0ea5e9' },
      nature: { icon: '🌴', label: 'Nature', color: '#22c55e' },
      adventure: { icon: '🏔️', label: 'Adventure', color: '#f59e0b' },
      heritage: { icon: '🏰', label: 'Heritage', color: '#8b5cf6' }
    }
    return badges[category] || { icon: '✈️', label: 'Tour', color: '#64748b' }
  }

  return (
    <div className="dashboard-container">
      <aside className="dashboard-sidebar">
        <div className="sidebar-header">
          <Ticket className="h-8 w-8" />
          <h2>Customer Portal</h2>
        </div>
        <nav className="sidebar-nav">
          <Link to="/customer/dashboard" className="nav-item">
            <MapPin className="h-5 w-5" />
            <span>Destination Exploration</span>
          </Link>
          <Link to="/customer/packages" className="nav-item active">
            <Calendar className="h-5 w-5" />
            <span>Tour Packages</span>
          </Link>
          <Link to="/customer/itineraries" className="nav-item">
            <Calendar className="h-5 w-5" />
            <span>Itineraries</span>
          </Link>
          <Link to="/customer/hotels" className="nav-item">
            <Star className="h-5 w-5" />
            <span>Hotel Search & Availability</span>
          </Link>
          <Link to="/customer/bookings" className="nav-item">
            <Calendar className="h-5 w-5" />
            <span>Bookings & Payments</span>
          </Link>
          <Link to="/customer/invoices" className="nav-item">
            <Star className="h-5 w-5" />
            <span>Invoices & Booking History</span>
          </Link>
          <Link to="/customer/wishlist" className="nav-item">
            <Star className="h-5 w-5" />
            <span>Wishlist, Reviews & Notifications</span>
          </Link>
          <Link to="/customer/profile" className="nav-item">
            <MapPin className="h-5 w-5" />
            <span>Profile Management</span>
          </Link>
        </nav>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-header">
          <div>
            <h1>Tour Packages</h1>
            <p className="header-subtitle">Curated experiences for every traveler</p>
          </div>
          <div className="header-stats">
            <div className="stat-badge">
              <Sparkles className="h-4 w-4" />
              <span>{packages.length} Packages</span>
            </div>
            <div className="stat-badge">
              <Award className="h-4 w-4" />
              <span>Best Price Guarantee</span>
            </div>
          </div>
        </header>

        <div className="dashboard-content">
          <div className="filters-section enhanced">
            <div className="search-bar enhanced">
              <Search className="search-icon" />
              <input 
                type="text" 
                placeholder="Search packages, destinations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="filter-controls enhanced">
              <div className="filter-group">
                <label>Price Range</label>
                <select 
                  value={filterPrice}
                  onChange={(e) => setFilterPrice(e.target.value)}
                  className="filter-select"
                >
                  <option value="all">All Prices</option>
                  <option value="low">Under ₹20,000</option>
                  <option value="medium">₹20,000 - ₹35,000</option>
                  <option value="high">Above ₹35,000</option>
                </select>
              </div>
              <div className="filter-group">
                <label>Duration</label>
                <select 
                  value={filterDuration}
                  onChange={(e) => setFilterDuration(e.target.value)}
                  className="filter-select"
                >
                  <option value="all">All Durations</option>
                  <option value="short">Short (≤4 days)</option>
                  <option value="medium">Medium (5-6 days)</option>
                  <option value="long">Long (7+ days)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="packages-grid enhanced">
            {filteredPackages.map(pkg => {
              const categoryBadge = getCategoryBadge(pkg.category)
              return (
                <div key={pkg.id} className="package-card enhanced">
                  <div className="package-image enhanced">
                    <div className="package-emoji-wrapper">
                      <span className="package-emoji">{pkg.image}</span>
                    </div>
                    <button 
                      onClick={() => toggleFavorite(pkg.id)}
                      className={`favorite-btn enhanced ${favorites.includes(pkg.id) ? 'active' : ''}`}
                    >
                      <Heart className="h-5 w-5" />
                    </button>
                    <div className="package-category-badge" style={{ backgroundColor: categoryBadge.color }}>
                      <span>{categoryBadge.icon} {categoryBadge.label}</span>
                    </div>
                    <div className="package-difficulty-badge" style={{ backgroundColor: getDifficultyColor(pkg.difficulty) }}>
                      <Zap className="h-3 w-3" />
                      <span>{pkg.difficulty}</span>
                    </div>
                  </div>
                  <div className="package-content enhanced">
                    <div className="package-header enhanced">
                      <h3>{pkg.name}</h3>
                      <div className="package-rating enhanced">
                        <Star className="h-4 w-4 fill" />
                        <span>{pkg.rating}</span>
                        <small>({(pkg.rating * 100).toFixed(0)} reviews)</small>
                      </div>
                    </div>
                    <div className="package-destination enhanced">
                      <MapPin className="h-4 w-4" />
                      <span>{pkg.destination}</span>
                    </div>
                    
                    <div className="package-highlights">
                      <h4>Package Highlights</h4>
                      <div className="highlights-grid">
                        {pkg.highlights.slice(0, 4).map((highlight, idx) => (
                          <span key={idx} className="highlight-tag">
                            <Sparkles className="h-3 w-3" />
                            {highlight}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="package-meta enhanced">
                      <span className="meta-item">
                        <Clock className="h-4 w-4" />
                        <div>
                          <small>Duration</small>
                          <strong>{pkg.duration}</strong>
                        </div>
                      </span>
                      <span className="meta-item">
                        <Users className="h-4 w-4" />
                        <div>
                          <small>Group Size</small>
                          <strong>Max {pkg.maxPeople}</strong>
                        </div>
                      </span>
                    </div>

                    <div className="package-inclusions enhanced">
                      <h4>What's Included</h4>
                      <div className="inclusions-list">
                        {pkg.inclusions.map((inc, idx) => (
                          <span key={idx} className="inclusion-item">
                            <Check className="h-3 w-3" />
                            {inc}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="package-footer enhanced">
                      <div className="package-price enhanced">
                        <DollarSign className="h-4 w-4" />
                        <div>
                          <small>Per person</small>
                          <strong>₹{pkg.price.toLocaleString()}</strong>
                        </div>
                      </div>
                      <div className="package-features">
                        <span className="feature-badge">
                          <Shield className="h-3 w-3" />
                          Secure Booking
                        </span>
                      </div>
                      <Link to="/customer/bookings" className="btn-primary enhanced">
                        Book Now <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </main>
    </div>
  )
}

export default TourPackages
