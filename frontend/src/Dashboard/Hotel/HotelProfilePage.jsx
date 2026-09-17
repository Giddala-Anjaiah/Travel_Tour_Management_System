import React, { useState, useEffect } from 'react'
import { User, Mail, Phone, MapPin, Globe, Building, Save, Camera, Edit, X, Lock, CheckCircle, Clock, XCircle } from 'lucide-react'
import HotelLayout from './HotelLayout'
import '../Dashboard.css'

const HotelProfilePage = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [profileData, setProfileData] = useState({
    hotelName: '',
    email: user.email || '',
    phone: user.phone || '',
    address: '',
    city: '',
    state: '',
    country: '',
    postalCode: '',
    website: '',
    description: '',
    starRating: '',
    checkinTime: '',
    checkoutTime: '',
    amenities: '',
    registrationNumber: '',
    taxId: '',
    logo: '',
    password: '',
    confirmPassword: ''
  })
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('http://localhost:5000/api/hotel/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      const data = await response.json()
      if (data.profile) {
        setProfile(data.profile)
        setProfileData(prev => ({
          ...prev,
          ...data.profile
        }))
      }
    } catch (error) {
      console.error('Error fetching profile:', error)
    }
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('http://localhost:5000/api/hotel/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(profileData)
      })
      const data = await response.json()
      if (response.ok) {
        alert('Profile updated successfully!')
        setIsEditing(false)
        fetchProfile()
      } else {
        alert(data.message || 'Error updating profile')
      }
    } catch (error) {
      console.error('Error updating profile:', error)
      alert('Error updating profile')
    } finally {
      setLoading(false)
    }
  }

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  return (
    <HotelLayout active="profile" title="Hotel Profile & Management">
      <div className="profile-section enhanced">
        <div className="profile-header enhanced">
          <div className="profile-avatar">
            {profileData.logo ? (
              <img src={profileData.logo} alt="Logo" />
            ) : (
              <span>{getInitials(profileData.hotelName || 'Hotel')}</span>
            )}
            {isEditing && (
              <button className="avatar-upload">
                <Camera className="h-4 w-4" />
              </button>
            )}
          </div>
          <div className="profile-info">
            <h2>{profileData.hotelName || 'Hotel Name'}</h2>
            <p>{profileData.email}</p>
            <div className="verification-badge" style={{ backgroundColor: '#22c55e' }}>
              <CheckCircle className="h-4 w-4" />
              <span>Verified</span>
            </div>
          </div>
          <div className="profile-actions">
            {!isEditing ? (
              <button onClick={() => setIsEditing(true)} className="btn-primary enhanced">
                <Edit className="h-4 w-4" />
                Edit Profile
              </button>
            ) : (
              <div className="edit-actions">
                <button onClick={() => setIsEditing(false)} className="btn-secondary">
                  <X className="h-4 w-4" />
                  Cancel
                </button>
                <button onClick={handleSave} className="btn-primary enhanced" disabled={loading}>
                  <Save className="h-4 w-4" />
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            )}
          </div>
        </div>

        <form onSubmit={handleSave} className="profile-form enhanced">
          <div className="form-section">
            <h3>Basic Information</h3>
            <div className="form-grid">
              <div className="form-group full-width">
                <label>Hotel Name</label>
                <input
                  type="text"
                  value={profileData.hotelName}
                  onChange={(e) => setProfileData({ ...profileData, hotelName: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  value={profileData.phone}
                  onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Hotel Address</h3>
            <div className="form-grid">
              <div className="form-group full-width">
                <label>Address</label>
                <input
                  type="text"
                  value={profileData.address}
                  onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
              <div className="form-group">
                <label>City</label>
                <input
                  type="text"
                  value={profileData.city}
                  onChange={(e) => setProfileData({ ...profileData, city: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
              <div className="form-group">
                <label>State</label>
                <input
                  type="text"
                  value={profileData.state}
                  onChange={(e) => setProfileData({ ...profileData, state: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
              <div className="form-group">
                <label>Country</label>
                <input
                  type="text"
                  value={profileData.country}
                  onChange={(e) => setProfileData({ ...profileData, country: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
              <div className="form-group">
                <label>Postal Code</label>
                <input
                  type="text"
                  value={profileData.postalCode}
                  onChange={(e) => setProfileData({ ...profileData, postalCode: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Hotel Details</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Star Rating</label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={profileData.starRating}
                  onChange={(e) => setProfileData({ ...profileData, starRating: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
              <div className="form-group">
                <label>Check-in Time</label>
                <input
                  type="time"
                  value={profileData.checkinTime}
                  onChange={(e) => setProfileData({ ...profileData, checkinTime: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
              <div className="form-group">
                <label>Check-out Time</label>
                <input
                  type="time"
                  value={profileData.checkoutTime}
                  onChange={(e) => setProfileData({ ...profileData, checkoutTime: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
              <div className="form-group full-width">
                <label>Website</label>
                <input
                  type="url"
                  value={profileData.website}
                  onChange={(e) => setProfileData({ ...profileData, website: e.target.value })}
                  disabled={!isEditing}
                  placeholder="https://"
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Description & Amenities</h3>
            <div className="form-group full-width">
              <label>Hotel Description</label>
              <textarea
                value={profileData.description}
                onChange={(e) => setProfileData({ ...profileData, description: e.target.value })}
                disabled={!isEditing}
                rows={4}
                placeholder="Describe your hotel..."
              />
            </div>
            <div className="form-group full-width">
              <label>Amenities (comma-separated)</label>
              <textarea
                value={profileData.amenities}
                onChange={(e) => setProfileData({ ...profileData, amenities: e.target.value })}
                disabled={!isEditing}
                rows={3}
                placeholder="e.g., WiFi, Pool, Gym, Restaurant"
              />
            </div>
          </div>

          <div className="form-section">
            <h3>Registration & Tax</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Hotel Registration Number</label>
                <input
                  type="text"
                  value={profileData.registrationNumber}
                  onChange={(e) => setProfileData({ ...profileData, registrationNumber: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
              <div className="form-group">
                <label>Tax ID</label>
                <input
                  type="text"
                  value={profileData.taxId}
                  onChange={(e) => setProfileData({ ...profileData, taxId: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
            </div>
          </div>

          {isEditing && (
            <div className="form-section">
              <h3>Security</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>New Password</label>
                  <input
                    type="password"
                    value={profileData.password}
                    onChange={(e) => setProfileData({ ...profileData, password: e.target.value })}
                    placeholder="Leave blank to keep current password"
                  />
                </div>
                <div className="form-group">
                  <label>Confirm Password</label>
                  <input
                    type="password"
                    value={profileData.confirmPassword}
                    onChange={(e) => setProfileData({ ...profileData, confirmPassword: e.target.value })}
                    placeholder="Confirm new password"
                  />
                </div>
              </div>
            </div>
          )}
        </form>
      </div>
    </HotelLayout>
  )
}

export default HotelProfilePage
