import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { isAuthenticated, isAdmin, isLoading, user } = useAuth()

  // Debug logging
  console.log('ProtectedRoute Debug:', {
    isAuthenticated,
    isAdmin,
    isLoading,
    requireAdmin,
    user
  })

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    console.log('Not authenticated, redirecting to admin login')
    return <Navigate to="/admin" replace />
  }

  if (requireAdmin && !isAdmin) {
    console.log('Not admin, redirecting to admin login')
    return <Navigate to="/admin" replace />
  }

  console.log('Access granted to admin dashboard')
  return children
}

export default ProtectedRoute
