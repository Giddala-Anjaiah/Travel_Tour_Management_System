import React, { useState } from 'react'
import { MapPin, Search, Filter, Star, Heart, Calendar, Users, DollarSign, ArrowRight, Compass, Mountain, Leaf, Landmark, Waves, Sparkles, LogOut, User } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import '../Dashboard.css'

const DestinationExploration = () => {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [favorites, setFavorites] = useState([])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  const destinations = [
    { 
      id: 1, 
      name: 'Goa', 
      image: '🏖️', 
      type: 'beach', 
      rating: 4.8, 
      price: 15999, 
      duration: '3 Days', 
      description: 'Beautiful beaches and vibrant nightlife',
      highlights: ['Beach Parties', 'Water Sports', 'Seafood Cuisine', 'Sunset Points'],
      bestTime: 'November - February',
      icon: <Waves className="h-5 w-5" />
    },
    { 
      id: 2, 
      name: 'Kerala', 
      image: '🌴', 
      type: 'nature', 
      rating: 4.9, 
      price: 24999, 
      duration: '5 Days', 
      description: 'Serene backwaters and lush greenery',
      highlights: ['Houseboat Stay', 'Tea Gardens', 'Ayurveda', 'Cultural Shows'],
      bestTime: 'September - March',
      icon: <Leaf className="h-5 w-5" />
    },
    { 
      id: 3, 
      name: 'Himalayas', 
      image: '🏔️', 
      type: 'adventure', 
      rating: 4.7, 
      price: 35999, 
      duration: '7 Days', 
      description: 'Thrilling mountain adventures',
      highlights: ['Trekking', 'Camping', 'River Rafting', 'Mountain Views'],
      bestTime: 'April - June, September - October',
      icon: <Mountain className="h-5 w-5" />
    },
    { 
      id: 4, 
      name: 'Rajasthan', 
      image: '🏰', 
      type: 'heritage', 
      rating: 4.6, 
      price: 29999, 
      duration: '6 Days', 
      description: 'Royal palaces and rich culture',
      highlights: ['Palace Stays', 'Camel Safari', 'Folk Dance', 'Fort Tours'],
      bestTime: 'October - March',
      icon: <Landmark className="h-5 w-5" />
    },
    { 
      id: 5, 
      name: 'Delhi', 
      image: '🕌', 
      type: 'heritage', 
      rating: 4.5, 
      price: 19999, 
      duration: '4 Days', 
      description: 'Historical monuments and modern city',
      highlights: ['Heritage Sites', 'Street Food', 'Modern Malls', 'Art Galleries'],
      bestTime: 'October - March',
      icon: <Landmark className="h-5 w-5" />
    },
    { 
      id: 6, 
      name: 'Andaman', 
      image: '🏝️', 
      type: 'beach', 
      rating: 4.9, 
      price: 39999, 
      duration: '6 Days', 
      description: 'Pristine islands and coral reefs',
      highlights: ['Scuba Diving', 'Beach Camping', 'Island Hopping', 'Bioluminescence'],
      bestTime: 'October - May',
      icon: <Waves className="h-5 w-5" />
    },
  ]

  const filteredDestinations = destinations.filter(dest => {
    const matchesSearch = dest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dest.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === 'all' || dest.type === filterType
    return matchesSearch && matchesType
  })

  const toggleFavorite = (id) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    )
  }

  const getTypeLabel = (type) => {
    const labels = {
      beach: 'Beach Paradise',
      nature: 'Nature Retreat',
      adventure: 'Adventure Zone',
      heritage: 'Heritage Site'
    }
    return labels[type] || type
  }

  const getTypeColor = (type) => {
    const colors = {
      beach: '#0ea5e9',
      nature: '#22c55e',
      adventure: '#f59e0b',
      heritage: '#8b5cf6'
    }
    return colors[type] || '#64748b'
  }

  return (
    <div className="dashboard-container">
      <aside className="dashboard-sidebar">
        <div className="sidebar-header">
          <Compass className="h-8 w-8" />
          <h2>Customer Portal</h2>
        </div>
        <nav className="sidebar-nav">
          <Link to="/customer/dashboard" className="nav-item active">
            <MapPin className="h-5 w-5" />
            <span>Destination Exploration</span>
          </Link>
          <Link to="/customer/packages" className="nav-item">
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
        <button onClick={handleLogout} className="logout-btn">
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-header">
          <div>
            <h1>Explore Destinations</h1>
            <p className="header-subtitle">Discover your next adventure</p>
          </div>
          <div className="header-actions">
            <div className="header-stats">
              <div className="stat-badge">
                <Sparkles className="h-4 w-4" />
                <span>{destinations.length} Destinations</span>
              </div>
            </div>
            <div className="user-info">
              <User className="h-5 w-5" />
              <span>Welcome, {user.fullName || 'Customer'}</span>
            </div>
            <button onClick={handleLogout} className="btn-logout-header">
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        </header>

        <div className="dashboard-content">
          <div className="filters-section enhanced">
            <div className="search-bar enhanced">
              <Search className="search-icon" />
              <input 
                type="text" 
                placeholder="Search destinations, experiences..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="filter-controls enhanced">
              <div className="filter-group">
                <label>Destination Type</label>
                <select 
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="filter-select"
                >
                  <option value="all">All Types</option>
                  <option value="beach">🏖️ Beach Paradise</option>
                  <option value="nature">🌴 Nature Retreat</option>
                  <option value="adventure">🏔️ Adventure Zone</option>
                  <option value="heritage">🏰 Heritage Site</option>
                </select>
              </div>
            </div>
          </div>

          <div className="destinations-grid enhanced">
            {filteredDestinations.map(dest => (
              <div key={dest.id} className="destination-card enhanced">
                <div className="destination-image enhanced">
                  <div className="destination-emoji-wrapper">
                    <span className="destination-emoji">{dest.image}</span>
                  </div>
                  <button 
                    onClick={() => toggleFavorite(dest.id)}
                    className={`favorite-btn enhanced ${favorites.includes(dest.id) ? 'active' : ''}`}
                  >
                    <Heart className="h-5 w-5" />
                  </button>
                  <div className="destination-type-badge" style={{ backgroundColor: getTypeColor(dest.type) }}>
                    {dest.icon}
                    <span>{getTypeLabel(dest.type)}</span>
                  </div>
                </div>
                <div className="destination-content enhanced">
                  <div className="destination-header enhanced">
                    <h3>{dest.name}</h3>
                    <div className="destination-rating enhanced">
                      <Star className="h-4 w-4 fill" />
                      <span>{dest.rating}</span>
                      <small>({(dest.rating * 100).toFixed(0)} reviews)</small>
                    </div>
                  </div>
                  <p className="destination-description enhanced">{dest.description}</p>
                  
                  <div className="destination-highlights">
                    <h4>Highlights</h4>
                    <div className="highlights-grid">
                      {dest.highlights.slice(0, 4).map((highlight, idx) => (
                        <span key={idx} className="highlight-tag">
                          <Sparkles className="h-3 w-3" />
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="destination-meta enhanced">
                    <span className="meta-item">
                      <Calendar className="h-4 w-4" />
                      <div>
                        <small>Duration</small>
                        <strong>{dest.duration}</strong>
                      </div>
                    </span>
                    <span className="meta-item">
                      <Users className="h-4 w-4" />
                      <div>
                        <small>Group Size</small>
                        <strong>2-20 people</strong>
                      </div>
                    </span>
                  </div>

                  <div className="destination-best-time">
                    <Calendar className="h-4 w-4" />
                    <span>Best time: {dest.bestTime}</span>
                  </div>

                  <div className="destination-footer enhanced">
                    <div className="destination-price enhanced">
                      <DollarSign className="h-4 w-4" />
                      <div>
                        <small>Starting from</small>
                        <strong>₹{dest.price.toLocaleString()}</strong>
                      </div>
                    </div>
                    <Link to={`/customer/packages?destination=${dest.name}`} className="btn-primary enhanced">
                      Explore Packages <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

export default DestinationExploration
