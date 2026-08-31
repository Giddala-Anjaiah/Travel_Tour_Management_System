import React, { useState } from 'react'
import { User, Mail, Phone, MapPin, Calendar, Shield, Save, Camera, Sparkles, Award, CheckCircle, Lock, Globe, CreditCard, MapPin as LocationIcon, User as UserIcon, Calendar as CalendarIcon, Shield as ShieldIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import '../Dashboard.css'

const ProfileManagement = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    fullName: user.fullName || 'John Doe',
    email: user.email || 'john.doe@example.com',
    phone: user.phone || '+91 98765 43210',
    address: user.address || '123 Main Street, City',
    dateOfBirth: user.dateOfBirth || '1990-01-15',
    nationality: user.nationality || 'Indian',
    passportNumber: user.passportNumber || 'AB1234567'
  })

  const handleSave = (e) => {
    e.preventDefault()
    const updatedUser = { ...user, ...profileData }
    localStorage.setItem('user', JSON.stringify(updatedUser))
    setIsEditing(false)
    alert('Profile updated successfully!')
  }

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  return (
    <div className="dashboard-container">
      <aside className="dashboard-sidebar">
        <div className="sidebar-header">
          <UserIcon className="h-8 w-8" />
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
          <Link to="/customer/hotels" className="nav-item">
            <Calendar className="h-5 w-5" />
            <span>Hotel Search & Availability</span>
          </Link>
          <Link to="/customer/bookings" className="nav-item">
            <Calendar className="h-5 w-5" />
            <span>Bookings & Payments</span>
          </Link>
          <Link to="/customer/invoices" className="nav-item">
            <Calendar className="h-5 w-5" />
            <span>Invoices & Booking History</span>
          </Link>
          <Link to="/customer/wishlist" className="nav-item">
            <Calendar className="h-5 w-5" />
            <span>Wishlist, Reviews & Notifications</span>
          </Link>
          <Link to="/customer/profile" className="nav-item active">
            <User className="h-5 w-5" />
            <span>Profile Management</span>
          </Link>
        </nav>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-header">
          <div>
            <h1>Profile Management</h1>
            <p className="header-subtitle">Manage your personal information and preferences</p>
          </div>
          <div className="header-stats">
            <div className="stat-badge">
              <Sparkles className="h-4 w-4" />
              <span>Verified Account</span>
            </div>
            <div className="stat-badge">
              <ShieldIcon className="h-4 w-4" />
              <span>Secure Profile</span>
            </div>
          </div>
        </header>

        <div className="dashboard-content">
          <div className="profile-section enhanced">
            <div className="profile-header enhanced">
              <div className="profile-avatar enhanced">
                <div className="avatar-circle">
                  <span className="avatar-initials">{getInitials(profileData.fullName)}</span>
                </div>
                <button className="avatar-upload-btn">
                  <Camera className="h-4 w-4" />
                </button>
              </div>
              <div className="profile-info enhanced">
                <h2>{profileData.fullName}</h2>
                <p className="profile-email">{profileData.email}</p>
                <div className="profile-badges">
                  <span className="profile-badge">
                    <CheckCircle className="h-3 w-3" />
                    Email Verified
                  </span>
                  <span className="profile-badge">
                    <Award className="h-3 w-3" />
                    Premium Member
                  </span>
                </div>
              </div>
              <button 
                onClick={() => setIsEditing(!isEditing)} 
                className={`btn-primary enhanced ${isEditing ? 'cancel' : ''}`}
              >
                {isEditing ? <><Lock className="h-4 w-4" /> Cancel</> : <><Save className="h-4 w-4" /> Edit Profile</>}
              </button>
            </div>

            <div className="profile-stats-grid enhanced">
              <div className="profile-stat-card enhanced">
                <CalendarIcon className="stat-icon" />
                <div className="stat-content">
                  <small>Member Since</small>
                  <strong>Jan 2024</strong>
                </div>
              </div>
              <div className="profile-stat-card enhanced">
                <Globe className="stat-icon" />
                <div className="stat-content">
                  <small>Nationality</small>
                  <strong>{profileData.nationality}</strong>
                </div>
              </div>
              <div className="profile-stat-card enhanced">
                <CreditCard className="stat-icon" />
                <div className="stat-content">
                  <small>Passport</small>
                  <strong>{profileData.passportNumber}</strong>
                </div>
              </div>
              <div className="profile-stat-card enhanced">
                <LocationIcon className="stat-icon" />
                <div className="stat-content">
                  <small>Location</small>
                  <strong>India</strong>
                </div>
              </div>
            </div>

            <form className="profile-form enhanced" onSubmit={handleSave}>
              <div className="form-section enhanced">
                <div className="section-header">
                  <User className="section-icon" />
                  <h3>Personal Information</h3>
                </div>
                <div className="form-row enhanced">
                  <div className="form-group enhanced">
                    <label>Full Name</label>
                    <input 
                      type="text" 
                      value={profileData.fullName}
                      onChange={(e) => setProfileData({...profileData, fullName: e.target.value})}
                      disabled={!isEditing}
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div className="form-group enhanced">
                    <label>Email Address</label>
                    <input 
                      type="email" 
                      value={profileData.email}
                      onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                      disabled={!isEditing}
                      placeholder="Enter your email"
                    />
                  </div>
                </div>
                <div className="form-row enhanced">
                  <div className="form-group enhanced">
                    <label>Phone Number</label>
                    <input 
                      type="tel" 
                      value={profileData.phone}
                      onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                      disabled={!isEditing}
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div className="form-group enhanced">
                    <label>Date of Birth</label>
                    <input 
                      type="date" 
                      value={profileData.dateOfBirth}
                      onChange={(e) => setProfileData({...profileData, dateOfBirth: e.target.value})}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </div>

              <div className="form-section enhanced">
                <div className="section-header">
                  <LocationIcon className="section-icon" />
                  <h3>Address Information</h3>
                </div>
                <div className="form-group enhanced full-width">
                  <label>Full Address</label>
                  <input 
                    type="text" 
                    value={profileData.address}
                    onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                    disabled={!isEditing}
                    placeholder="Enter your complete address"
                  />
                </div>
                <div className="form-row enhanced">
                  <div className="form-group enhanced">
                    <label>Nationality</label>
                    <input 
                      type="text" 
                      value={profileData.nationality}
                      onChange={(e) => setProfileData({...profileData, nationality: e.target.value})}
                      disabled={!isEditing}
                      placeholder="Enter your nationality"
                    />
                  </div>
                  <div className="form-group enhanced">
                    <label>Passport Number</label>
                    <input 
                      type="text" 
                      value={profileData.passportNumber}
                      onChange={(e) => setProfileData({...profileData, passportNumber: e.target.value})}
                      disabled={!isEditing}
                      placeholder="Enter your passport number"
                    />
                  </div>
                </div>
              </div>

              {isEditing && (
                <div className="form-actions enhanced">
                  <button type="button" onClick={() => setIsEditing(false)} className="btn-secondary enhanced">
                    Cancel Changes
                  </button>
                  <button type="submit" className="btn-primary enhanced">
                    <Save className="h-4 w-4" /> Save Profile
                  </button>
                </div>
              )}
            </form>

            <div className="profile-security-section enhanced">
              <div className="section-header">
                <ShieldIcon className="section-icon" />
                <h3>Security Settings</h3>
              </div>
              <div className="security-actions">
                <button className="security-btn enhanced">
                  <Lock className="h-4 w-4" />
                  <div>
                    <strong>Change Password</strong>
                    <small>Update your password regularly</small>
                  </div>
                </button>
                <button className="security-btn enhanced">
                  <ShieldIcon className="h-4 w-4" />
                  <div>
                    <strong>Two-Factor Authentication</strong>
                    <small>Add an extra layer of security</small>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default ProfileManagement
