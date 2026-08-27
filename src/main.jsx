import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Login from './Login.jsx'
import Signup from './Signup.jsx'
import ProtectedRoute from './ProtectedRoute.jsx'
import AdminDashboard from './Dashboard/AdminDashboard.jsx'
import CustomerDashboard from './Dashboard/CustomerDashboard.jsx'
import TourOperatorDashboard from './Dashboard/TourOperatorDashboard.jsx'
import HotelPartnerDashboard from './Dashboard/HotelPartnerDashboard.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* Admin Routes */}
        <Route 
          path="/admin/dashboard" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
        
        {/* Customer Routes */}
        <Route 
          path="/customer/dashboard" 
          element={
            <ProtectedRoute allowedRoles={['customer']}>
              <CustomerDashboard />
            </ProtectedRoute>
          } 
        />
        
        {/* Tour Operator Routes */}
        <Route 
          path="/tour-operator/dashboard" 
          element={
            <ProtectedRoute allowedRoles={['tour_operator']}>
              <TourOperatorDashboard />
            </ProtectedRoute>
          } 
        />
        
        {/* Hotel Partner Routes */}
        <Route 
          path="/hotel-partner/dashboard" 
          element={
            <ProtectedRoute allowedRoles={['hotel_partner']}>
              <HotelPartnerDashboard />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
