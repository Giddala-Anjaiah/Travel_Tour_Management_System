import React, { useState } from 'react'
import { MapPin, Building, Star, Search, Calendar, Users, DollarSign, Filter, Heart, Bed, Wifi, Car, Coffee, Sparkles, Shield, Award, MapPin as LocationIcon, CheckCircle, Clock, Utensils, Dumbbell, Waves } from 'lucide-react'
import { Link } from 'react-router-dom'
import '../Dashboard.css'

const HotelSearchAvailability = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterRating, setFilterRating] = useState('all')
  const [filterPrice, setFilterPrice] = useState('all')
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [guests, setGuests] = useState(2)
  const [favorites, setFavorites] = useState([])

  const hotels = [
    { 
      id: 1, 
      name: 'Taj Resort Goa', 
      location: 'Goa, India', 
      image: '🏨',
      rating: 4.8, 
      price: 8999,
      availableRooms: 15,
      totalRooms: 20,
      amenities: ['WiFi', 'Pool', 'Spa', 'Restaurant', 'Gym', 'Beach Access'],
      description: 'Luxury beachfront resort with stunning ocean views and world-class service',
      highlights: ['Private Beach', 'Infinity Pool', 'Fine Dining', 'Spa & Wellness'],
      category: 'luxury'
    },
    { 
      id: 2, 
      name: 'Goa Marriott Resort', 
      location: 'Goa, India', 
      image: '🏖️',
      rating: 4.7, 
      price: 7999,
      availableRooms: 18,
      totalRooms: 25,
      amenities: ['WiFi', 'Pool', 'Gym', 'Bar', 'Restaurant', 'Kids Club'],
      description: 'Premium resort with world-class amenities and family-friendly facilities',
      highlights: ['Water Sports', 'Kids Activities', 'Multi-cuisine', 'Event Spaces'],
      category: 'premium'
    },
    { 
      id: 3, 
      name: 'Kumarakom Lake Resort', 
      location: 'Kerala, India', 
      image: '🌴',
      rating: 4.9, 
      price: 12999,
      availableRooms: 10,
      totalRooms: 15,
      amenities: ['WiFi', 'Pool', 'Ayurveda', 'Houseboat', 'Restaurant', 'Garden'],
      description: 'Serene backwater resort with traditional Kerala architecture and authentic experiences',
      highlights: ['Houseboat Stay', 'Ayurveda Spa', 'Traditional Cuisine', 'Village Tours'],
      category: 'luxury'
    },
    { 
      id: 4, 
      name: 'Himalayan Retreat', 
      location: 'Manali, India', 
      image: '🏔️',
      rating: 4.6, 
      price: 9999,
      availableRooms: 10,
      totalRooms: 15,
      amenities: ['WiFi', 'Fireplace', 'Restaurant', 'Mountain View', 'Heating', 'Library'],
      description: 'Cozy mountain retreat with breathtaking views and warm hospitality',
      highlights: ['Mountain Views', 'Fireplace Lounge', 'Adventure Activities', 'Local Cuisine'],
      category: 'boutique'
    },
    { 
      id: 5, 
      name: 'Rajasthan Palace Hotel', 
      location: 'Jaipur, India', 
      image: '🏰',
      rating: 4.7, 
      price: 11999,
      availableRooms: 8,
      totalRooms: 10,
      amenities: ['WiFi', 'Pool', 'Spa', 'Heritage', 'Restaurant', 'Courtyard'],
      description: 'Royal palace hotel with authentic Rajasthani experience and heritage architecture',
      highlights: ['Royal Suites', 'Heritage Tours', 'Folk Performances', 'Traditional Dining'],
      category: 'heritage'
    },
    { 
      id: 6, 
      name: 'Andaman Beach Resort', 
      location: 'Port Blair, India', 
      image: '🏝️',
      rating: 4.8, 
      price: 10999,
      availableRooms: 12,
      totalRooms: 18,
      amenities: ['WiFi', 'Pool', 'Diving Center', 'Beach Access', 'Restaurant', 'Water Sports'],
      description: 'Beachfront resort with easy access to coral reefs and diving experiences',
      highlights: ['Scuba Diving', 'Beach Access', 'Island Tours', 'Seafood Restaurant'],
      category: 'resort'
    },
  ]

  const filteredHotels = hotels.filter(hotel => {
    const matchesSearch = hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         hotel.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRating = filterRating === 'all' ||
                        (filterRating === '4plus' && hotel.rating >= 4) ||
                        (filterRating === '4.5plus' && hotel.rating >= 4.5)
    const matchesPrice = filterPrice === 'all' ||
                       (filterPrice === 'budget' && hotel.price < 10000) ||
                       (filterPrice === 'mid' && hotel.price >= 10000 && hotel.price < 12000) ||
                       (filterPrice === 'luxury' && hotel.price >= 12000)
    return matchesSearch && matchesRating && matchesPrice
  })

  const toggleFavorite = (id) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    )
  }

  const getAmenityIcon = (amenity) => {
    const icons = {
      'WiFi': <Wifi className="h-4 w-4" />,
      'Pool': <Waves className="h-4 w-4" />,
      'Spa': <Coffee className="h-4 w-4" />,
      'Gym': <Dumbbell className="h-4 w-4" />,
      'Restaurant': <Utensils className="h-4 w-4" />,
      'Beach Access': <Waves className="h-4 w-4" />,
      'Houseboat': <Bed className="h-4 w-4" />,
      'Ayurveda': <Sparkles className="h-4 w-4" />,
      'Fireplace': <Coffee className="h-4 w-4" />,
      'Mountain View': <MapPin className="h-4 w-4" />,
      'Diving Center': <Waves className="h-4 w-4" />
    }
    return icons[amenity] || <CheckCircle className="h-4 w-4" />
  }

  const getCategoryBadge = (category) => {
    const badges = {
      luxury: { label: 'Luxury', color: '#8b5cf6' },
      premium: { label: 'Premium', color: '#0ea5e9' },
      boutique: { label: 'Boutique', color: '#f59e0b' },
      heritage: { label: 'Heritage', color: '#ef4444' },
      resort: { label: 'Resort', color: '#22c55e' }
    }
    return badges[category] || { label: 'Standard', color: '#64748b' }
  }

  const getAvailabilityColor = (available, total) => {
    const percentage = (available / total) * 100
    if (percentage > 50) return '#22c55e'
    if (percentage > 20) return '#f59e0b'
    return '#ef4444'
  }

  return (
    <div className="dashboard-container">
      <aside className="dashboard-sidebar">
        <div className="sidebar-header">
          <Building className="h-8 w-8" />
          <h2>Customer Portal</h2>
        </div>
        <nav className="sidebar-nav">
          <Link to="/customer/dashboard" className="nav-item">
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
          <Link to="/customer/hotels" className="nav-item active">
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
            <h1>Hotel Search & Availability</h1>
            <p className="header-subtitle">Find your perfect stay</p>
          </div>
          <div className="header-stats">
            <div className="stat-badge">
              <Sparkles className="h-4 w-4" />
              <span>{hotels.length} Hotels</span>
            </div>
            <div className="stat-badge">
              <Shield className="h-4 w-4" />
              <span>Verified Properties</span>
            </div>
          </div>
        </header>

        <div className="dashboard-content">
          <div className="booking-filters enhanced">
            <div className="filter-group">
              <label>Check-in</label>
              <input 
                type="date" 
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
              />
            </div>
            <div className="filter-group">
              <label>Check-out</label>
              <input 
                type="date" 
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
              />
            </div>
            <div className="filter-group">
              <label>Guests</label>
              <input 
                type="number" 
                min="1"
                value={guests}
                onChange={(e) => setGuests(parseInt(e.target.value))}
              />
            </div>
          </div>

          <div className="filters-section enhanced">
            <div className="search-bar enhanced">
              <Search className="search-icon" />
              <input 
                type="text" 
                placeholder="Search hotels by name or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="filter-controls enhanced">
              <div className="filter-group">
                <label>Rating</label>
                <select 
                  value={filterRating}
                  onChange={(e) => setFilterRating(e.target.value)}
                  className="filter-select"
                >
                  <option value="all">All Ratings</option>
                  <option value="4plus">4+ Stars</option>
                  <option value="4.5plus">4.5+ Stars</option>
                </select>
              </div>
              <div className="filter-group">
                <label>Price Range</label>
                <select 
                  value={filterPrice}
                  onChange={(e) => setFilterPrice(e.target.value)}
                  className="filter-select"
                >
                  <option value="all">All Prices</option>
                  <option value="budget">Budget (&lt;₹10k)</option>
                  <option value="mid">Mid-Range (₹10k-₹12k)</option>
                  <option value="luxury">Luxury (₹12k+)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="hotels-grid enhanced">
            {filteredHotels.map(hotel => {
              const categoryBadge = getCategoryBadge(hotel.category)
              return (
                <div key={hotel.id} className="hotel-card enhanced">
                  <div className="hotel-image enhanced">
                    <div className="hotel-emoji-wrapper">
                      <span className="hotel-emoji">{hotel.image}</span>
                    </div>
                    <button 
                      onClick={() => toggleFavorite(hotel.id)}
                      className={`favorite-btn enhanced ${favorites.includes(hotel.id) ? 'active' : ''}`}
                    >
                      <Heart className="h-5 w-5" />
                    </button>
                    <div className="hotel-category-badge" style={{ backgroundColor: categoryBadge.color }}>
                      <span>{categoryBadge.label}</span>
                    </div>
                  </div>
                  <div className="hotel-content enhanced">
                    <div className="hotel-header enhanced">
                      <h3>{hotel.name}</h3>
                      <div className="hotel-rating enhanced">
                        <Star className="h-4 w-4 fill" />
                        <span>{hotel.rating}</span>
                        <small>({(hotel.rating * 100).toFixed(0)} reviews)</small>
                      </div>
                    </div>
                    <div className="hotel-location enhanced">
                      <LocationIcon className="h-4 w-4" />
                      <span>{hotel.location}</span>
                    </div>
                    <p className="hotel-description enhanced">{hotel.description}</p>
                    
                    <div className="hotel-highlights">
                      <h4>Property Highlights</h4>
                      <div className="highlights-grid">
                        {hotel.highlights.slice(0, 4).map((highlight, idx) => (
                          <span key={idx} className="highlight-tag">
                            <Sparkles className="h-3 w-3" />
                            {highlight}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="hotel-amenities enhanced">
                      <h4>Amenities</h4>
                      <div className="amenities-grid">
                        {hotel.amenities.slice(0, 6).map((amenity, idx) => (
                          <span key={idx} className="amenity-tag enhanced">
                            {getAmenityIcon(amenity)}
                            {amenity}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="hotel-availability enhanced">
                      <div className="availability-header">
                        <Bed className="h-4 w-4" />
                        <span>Room Availability</span>
                      </div>
                      <div className="availability-bar-container">
                        <div className="availability-bar">
                          <div 
                            className="availability-fill" 
                            style={{ 
                              width: `${(hotel.availableRooms / hotel.totalRooms) * 100}%`,
                              backgroundColor: getAvailabilityColor(hotel.availableRooms, hotel.totalRooms)
                            }}
                          ></div>
                        </div>
                        <span className="availability-text">
                          {hotel.availableRooms} / {hotel.totalRooms} rooms available
                        </span>
                      </div>
                    </div>

                    <div className="hotel-footer enhanced">
                      <div className="hotel-price enhanced">
                        <DollarSign className="h-4 w-4" />
                        <div>
                          <small>Per night</small>
                          <strong>₹{hotel.price.toLocaleString()}</strong>
                        </div>
                      </div>
                      <div className="hotel-features">
                        <span className="feature-badge">
                          <Shield className="h-3 w-3" />
                          Free Cancellation
                        </span>
                      </div>
                      <Link to="/customer/bookings" className="btn-primary enhanced">
                        Book Now
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

export default HotelSearchAvailability
