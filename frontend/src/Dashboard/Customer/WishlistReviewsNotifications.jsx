import React, { useState } from 'react'
import { Heart, Star, Bell, Search, Trash2, Edit, Check, Calendar, Sparkles, Shield, Award, Clock, CheckCircle, AlertCircle, Star as StarIcon, Bell as BellIcon, MapPin as MapIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import CustomerLayout from './CustomerLayout'
import '../Dashboard.css'

const WishlistReviewsNotifications = () => {
  const [activeTab, setActiveTab] = useState('wishlist')
  const [searchTerm, setSearchTerm] = useState('')
  const [showReviewModal, setShowReviewModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)

  const wishlist = [
    { id: 1, name: 'Goa Beach Paradise', destination: 'Goa', image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80', price: 15999, rating: 4.8, addedDate: '2024-08-15', category: 'beach' },
    { id: 2, name: 'Kerala Backwaters', destination: 'Kerala', image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80', price: 24999, rating: 4.9, addedDate: '2024-08-18', category: 'nature' },
    { id: 3, name: 'Himalayan Adventure', destination: 'Himalayas', image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80', price: 35999, rating: 4.7, addedDate: '2024-08-22', category: 'adventure' },
    { id: 4, name: 'Andaman Islands', destination: 'Andaman', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80', price: 39999, rating: 4.9, addedDate: '2024-08-25', category: 'beach' },
  ]

  const reviews = [
    { id: 1, package: 'Goa Beach Paradise', rating: 5, comment: 'Amazing experience! The beaches were beautiful and the service was excellent. Highly recommended for beach lovers.', date: '2024-07-20', status: 'approved', image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80' },
    { id: 2, package: 'Kerala Backwaters', rating: 4, comment: 'Great trip, houseboat experience was memorable. Food could be better but overall a wonderful experience.', date: '2024-06-15', status: 'approved', image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80' },
    { id: 3, package: 'Rajasthan Royal Tour', rating: 5, comment: 'Royal treatment at its best! The palace stays were incredible and the cultural shows were amazing.', date: '2024-05-10', status: 'approved', image: 'https://images.unsplash.com/photo-1477587458222-8fc769eb531f?auto=format&fit=crop&w=800&q=80' },
  ]

  const notifications = [
    { id: 1, type: 'booking', message: 'Your booking for Goa Beach Paradise has been confirmed!', date: '2024-08-28', read: false, icon: <CheckCircle className="h-4 w-4" /> },
    { id: 2, type: 'payment', message: 'Payment reminder: ₹15,998 pending for Kerala Backwaters booking.', date: '2024-08-27', read: false, icon: <AlertCircle className="h-4 w-4" /> },
    { id: 3, type: 'offer', message: 'Special offer: Get 20% off on Himalayan Adventure packages!', date: '2024-08-26', read: true, icon: <Award className="h-4 w-4" /> },
    { id: 4, type: 'review', message: 'Your review for Rajasthan Royal Tour has been approved!', date: '2024-08-25', read: true, icon: <StarIcon className="h-4 w-4" /> },
    { id: 5, type: 'system', message: 'Your profile has been successfully updated.', date: '2024-08-24', read: true, icon: <Shield className="h-4 w-4" /> },
  ]

  const filteredWishlist = wishlist.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.destination.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredReviews = reviews.filter(review => 
    review.package.toLowerCase().includes(searchTerm.toLowerCase()) ||
    review.comment.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredNotifications = notifications.filter(notif => 
    notif.message.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const removeFromWishlist = (id) => {
    if (window.confirm('Remove this item from wishlist?')) {
      alert('Item removed from wishlist')
    }
  }

  const submitReview = (e) => {
    e.preventDefault()
    setShowReviewModal(false)
    alert('Review submitted successfully!')
  }

  const markAsRead = (id) => {
    alert('Notification marked as read')
  }

  const deleteNotification = (id) => {
    if (window.confirm('Delete this notification?')) {
      alert('Notification deleted')
    }
  }

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`h-4 w-4 ${i < rating ? 'fill' : ''}`} />
    ))
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

  const getNotificationTypeColor = (type) => {
    const colors = {
      booking: '#22c55e',
      payment: '#f59e0b',
      offer: '#8b5cf6',
      review: '#0ea5e9',
      system: '#64748b'
    }
    return colors[type] || '#64748b'
  }

  return (
    <CustomerLayout
      active="wishlist"
      title="Wishlist & updates"
      subtitle="Saved trips, reviews, and notifications"
      actions={
        <div className="header-stats">
          <div className="stat-badge">
            <Sparkles className="h-4 w-4" />
            <span>{wishlist.length} saved</span>
          </div>
          <div className="stat-badge">
            <BellIcon className="h-4 w-4" />
            <span>{notifications.filter(n => !n.read).length} new</span>
          </div>
        </div>
      }
    >
          <div className="tabs enhanced">
            <button 
              className={`tab-btn ${activeTab === 'wishlist' ? 'active' : ''}`}
              onClick={() => setActiveTab('wishlist')}
            >
              <Heart className="h-4 w-4" /> Wishlist ({wishlist.length})
            </button>
            <button 
              className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
              onClick={() => setActiveTab('reviews')}
            >
              <Star className="h-4 w-4" /> Reviews ({reviews.length})
            </button>
            <button 
              className={`tab-btn ${activeTab === 'notifications' ? 'active' : ''}`}
              onClick={() => setActiveTab('notifications')}
            >
              <Bell className="h-4 w-4" /> Notifications ({notifications.filter(n => !n.read).length} new)
            </button>
          </div>

          <div className="filters-section enhanced">
            <div className="search-bar enhanced">
              <Search className="search-icon" />
              <input 
                type="text" 
                placeholder={`Search ${activeTab}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {activeTab === 'wishlist' && (
            <div className="wishlist-grid enhanced">
              {filteredWishlist.map(item => {
                const categoryBadge = getCategoryBadge(item.category)
                return (
                  <div key={item.id} className="wishlist-card enhanced">
                    <div className="wishlist-image enhanced">
                      <div className="wishlist-emoji-wrapper">
                        <img className="cp-cover" src={item.image} alt={item.name} />
                      </div>
                      <div className="wishlist-category-badge" style={{ backgroundColor: categoryBadge.color }}>
                        <span>{categoryBadge.label}</span>
                      </div>
                    </div>
                    <div className="wishlist-content enhanced">
                      <h3>{item.name}</h3>
                      <div className="wishlist-location enhanced">
                        <MapIcon className="h-4 w-4" />
                        <span>{item.destination}</span>
                      </div>
                      <div className="wishlist-rating enhanced">
                        {renderStars(item.rating)}
                        <span>({item.rating})</span>
                      </div>
                      <div className="wishlist-meta">
                        <span className="meta-item">
                          <Calendar className="h-4 w-4" />
                          <small>Added {item.addedDate}</small>
                        </span>
                      </div>
                      <div className="wishlist-footer enhanced">
                        <div className="wishlist-price enhanced">
                          <small>Starting from</small>
                          <strong>₹{item.price.toLocaleString()}</strong>
                        </div>
                        <div className="wishlist-actions">
                          <Link to="/customer/bookings" className="btn-primary enhanced">
                            Book Now
                          </Link>
                          <button 
                            onClick={() => removeFromWishlist(item.id)}
                            className="icon-btn delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="reviews-section enhanced">
              <button 
                onClick={() => setShowReviewModal(true)}
                className="btn-primary enhanced"
              >
                <Star className="h-4 w-4" /> Write a Review
              </button>
              <div className="reviews-list enhanced">
                {filteredReviews.map(review => (
                  <div key={review.id} className="review-card enhanced">
                    <div className="review-header enhanced">
                      <div className="review-image-wrapper">
                        <img className="cp-cover" src={review.image} alt={review.package} />
                      </div>
                      <div className="review-info">
                        <h3>{review.package}</h3>
                        <div className="review-rating enhanced">
                          {renderStars(review.rating)}
                        </div>
                      </div>
                      <div className="review-status-badge">
                        <CheckCircle className="h-4 w-4" />
                        <span>{review.status}</span>
                      </div>
                    </div>
                    <p className="review-comment enhanced">{review.comment}</p>
                    <div className="review-footer enhanced">
                      <span className="review-date">
                        <Calendar className="h-4 w-4" />
                        {review.date}
                      </span>
                      <div className="review-actions">
                        <button className="icon-btn">
                          <Edit className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="notifications-section enhanced">
              <button 
                onClick={() => alert('Mark all as read')}
                className="btn-secondary"
              >
                Mark All as Read
              </button>
              <div className="notifications-list enhanced">
                {filteredNotifications.map(notif => (
                  <div key={notif.id} className={`notification-card enhanced ${!notif.read ? 'unread' : ''}`}>
                    <div className="notification-icon enhanced" style={{ backgroundColor: getNotificationTypeColor(notif.type) }}>
                      {notif.icon}
                    </div>
                    <div className="notification-content enhanced">
                      <p>{notif.message}</p>
                      <span className="notification-date">
                        <Clock className="h-4 w-4" />
                        {notif.date}
                      </span>
                    </div>
                    <div className="notification-actions enhanced">
                      {!notif.read && (
                        <button 
                          onClick={() => markAsRead(notif.id)}
                          className="icon-btn"
                        >
                          <Check className="h-4 w-4" />
                        </button>
                      )}
                      <button 
                        onClick={() => deleteNotification(notif.id)}
                        className="icon-btn delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
      {showReviewModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Write a Review</h3>
              <button onClick={() => setShowReviewModal(false)} className="modal-close">×</button>
            </div>
            <div className="modal-body">
              <form className="review-form enhanced" onSubmit={submitReview}>
                <div className="form-group">
                  <label>Select Package</label>
                  <select required>
                    <option value="">Choose a package</option>
                    <option value="Goa Beach Paradise">Goa Beach Paradise</option>
                    <option value="Kerala Backwaters">Kerala Backwaters</option>
                    <option value="Himalayan Adventure">Himalayan Adventure</option>
                    <option value="Rajasthan Royal Tour">Rajasthan Royal Tour</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Rating</label>
                  <div className="rating-input enhanced">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button key={star} type="button" className="star-btn">
                        <Star className="h-6 w-6" />
                      </button>
                    ))}
                  </div>
                </div>
                <div className="form-group">
                  <label>Your Review</label>
                  <textarea 
                    rows="4" 
                    placeholder="Share your experience..."
                    required
                  ></textarea>
                </div>
                <div className="form-actions">
                  <button type="button" onClick={() => setShowReviewModal(false)} className="btn-secondary">
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary enhanced">
                    <Star className="h-4 w-4" /> Submit Review
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </CustomerLayout>
  )
}

export default WishlistReviewsNotifications
