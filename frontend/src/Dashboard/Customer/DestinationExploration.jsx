import React, { useState } from 'react'
import { Search, Star, Heart, Calendar, Users, ArrowRight, Compass, Mountain, Leaf, Landmark, Waves, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import CustomerLayout from './CustomerLayout'
import '../Dashboard.css'

const DestinationExploration = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [favorites, setFavorites] = useState([])

  const destinations = [
    {
      id: 1,
      name: 'Goa',
      photo: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80',
      type: 'beach',
      rating: 4.8,
      price: 15999,
      duration: '3 Days',
      description: 'Beautiful beaches and vibrant nightlife',
      highlights: ['Beach Parties', 'Water Sports', 'Seafood Cuisine', 'Sunset Points'],
      bestTime: 'November - February',
      icon: <Waves className="h-4 w-4" />
    },
    {
      id: 2,
      name: 'Kerala',
      photo: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80',
      type: 'nature',
      rating: 4.9,
      price: 24999,
      duration: '5 Days',
      description: 'Serene backwaters and lush greenery',
      highlights: ['Houseboat Stay', 'Tea Gardens', 'Ayurveda', 'Cultural Shows'],
      bestTime: 'September - March',
      icon: <Leaf className="h-4 w-4" />
    },
    {
      id: 3,
      name: 'Himalayas',
      photo: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80',
      type: 'adventure',
      rating: 4.7,
      price: 35999,
      duration: '7 Days',
      description: 'Thrilling mountain adventures',
      highlights: ['Trekking', 'Camping', 'River Rafting', 'Mountain Views'],
      bestTime: 'April - June, September - October',
      icon: <Mountain className="h-4 w-4" />
    },
    {
      id: 4,
      name: 'Rajasthan',
      photo: 'https://images.unsplash.com/photo-1477587458222-8fc769eb531f?auto=format&fit=crop&w=1200&q=80',
      type: 'heritage',
      rating: 4.6,
      price: 29999,
      duration: '6 Days',
      description: 'Royal palaces and rich culture',
      highlights: ['Palace Stays', 'Camel Safari', 'Folk Dance', 'Fort Tours'],
      bestTime: 'October - March',
      icon: <Landmark className="h-4 w-4" />
    },
    {
      id: 5,
      name: 'Delhi',
      photo: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1200&q=80',
      type: 'heritage',
      rating: 4.5,
      price: 19999,
      duration: '4 Days',
      description: 'Historical monuments and modern city',
      highlights: ['Heritage Sites', 'Street Food', 'Modern Malls', 'Art Galleries'],
      bestTime: 'October - March',
      icon: <Landmark className="h-4 w-4" />
    },
    {
      id: 6,
      name: 'Andaman',
      photo: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
      type: 'beach',
      rating: 4.9,
      price: 39999,
      duration: '6 Days',
      description: 'Pristine islands and coral reefs',
      highlights: ['Scuba Diving', 'Beach Camping', 'Island Hopping', 'Bioluminescence'],
      bestTime: 'October - May',
      icon: <Waves className="h-4 w-4" />
    }
  ]

  const filteredDestinations = destinations.filter((dest) => {
    const matchesSearch =
      dest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dest.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === 'all' || dest.type === filterType
    return matchesSearch && matchesType
  })

  const toggleFavorite = (id) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]))
  }

  const getTypeLabel = (type) => {
    const labels = {
      beach: 'Beach',
      nature: 'Nature',
      adventure: 'Adventure',
      heritage: 'Heritage'
    }
    return labels[type] || type
  }

  const getTypeColor = (type) => {
    const colors = {
      beach: '#0e7490',
      nature: '#15803d',
      adventure: '#b45309',
      heritage: '#6d28d9'
    }
    return colors[type] || '#475569'
  }

  const types = [
    { id: 'all', label: 'All destinations' },
    { id: 'beach', label: 'Beach' },
    { id: 'nature', label: 'Nature' },
    { id: 'adventure', label: 'Adventure' },
    { id: 'heritage', label: 'Heritage' }
  ]

  return (
    <CustomerLayout
      active="dashboard"
      title="Explore destinations"
      subtitle="Handpicked places for your next journey"
      actions={
        <div className="header-stats">
          <div className="stat-badge">
            <Sparkles className="h-4 w-4" />
            <span>{destinations.length} destinations</span>
          </div>
        </div>
      }
    >
      <div className="cp-hero">
        <div className="cp-hero-copy">
          <p>Travel, planned with care</p>
          <h2>Find a destination that fits your pace</h2>
          <span>Browse curated trips, compare packages, and book hotels from one workspace.</span>
        </div>
        <div className="cp-hero-stats">
          <div className="cp-hero-stat">
            <small>Saved trips</small>
            <strong>{favorites.length}</strong>
          </div>
          <div className="cp-hero-stat">
            <small>From</small>
            <strong>₹15,999</strong>
          </div>
          <div className="cp-hero-stat">
            <small>Regions</small>
            <strong>6</strong>
          </div>
          <div className="cp-hero-stat">
            <small>Best rated</small>
            <strong>4.9</strong>
          </div>
        </div>
      </div>

      <div className="filters-section enhanced">
        <div className="search-bar enhanced">
          <Search className="search-icon" />
          <input
            type="text"
            placeholder="Search destinations or experiences"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="cp-chips">
          {types.map((type) => (
            <button
              key={type.id}
              type="button"
              className={`cp-chip ${filterType === type.id ? 'active' : ''}`}
              onClick={() => setFilterType(type.id)}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      {filteredDestinations.length === 0 ? (
        <div className="cp-empty">No destinations match your search.</div>
      ) : (
        <div className="destinations-grid enhanced">
          {filteredDestinations.map((dest) => (
            <div key={dest.id} className="destination-card enhanced">
              <div className="destination-image enhanced">
                <div className="destination-emoji-wrapper">
                  <img className="cp-cover" src={dest.photo} alt={dest.name} />
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
                      <small>Group size</small>
                      <strong>2-20 people</strong>
                    </div>
                  </span>
                </div>

                <div className="destination-best-time">
                  <Compass className="h-4 w-4" />
                  <span>Best time: {dest.bestTime}</span>
                </div>

                <div className="destination-footer enhanced">
                  <div className="destination-price enhanced">
                    <div>
                      <small>Starting from</small>
                      <strong>₹{dest.price.toLocaleString()}</strong>
                    </div>
                  </div>
                  <Link to={`/customer/packages?destination=${dest.name}`} className="btn-primary enhanced">
                    View packages <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </CustomerLayout>
  )
}

export default DestinationExploration
