import React, { createContext, useContext, useState, useEffect } from 'react'
import apiService from '../services/api'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Check if user is admin
  const isAdmin = user?.role === 'admin'

  useEffect(() => {
    // Check for existing session and validate token
    const checkAuthStatus = async () => {
      const token = apiService.getAuthToken()

      if (token) {
        try {
          const response = await apiService.getCurrentUser()
          if (response.success) {
            setUser(response.data.user)
            setIsAuthenticated(true)
          } else {
            // Token is invalid
            apiService.removeAuthToken()
          }
        } catch (error) {
          console.error('Auth check error:', error)
          apiService.removeAuthToken()
        }
      }

      setIsLoading(false)
    }

    checkAuthStatus()
  }, [])

  const login = async (credentials) => {
    try {
      setIsLoading(true)
      const response = await apiService.login(credentials)

      if (response.success) {
        setUser(response.data.user)
        setIsAuthenticated(true)
        return { success: true, user: response.data.user }
      } else {
        return { success: false, error: response.message }
      }
    } catch (error) {
      console.error('Login error:', error)
      return { success: false, error: error.message || 'Login failed' }
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (userData) => {
    try {
      setIsLoading(true)
      const response = await apiService.register(userData)

      if (response.success) {
        setUser(response.data.user)
        setIsAuthenticated(true)
        return { success: true, user: response.data.user }
      } else {
        return { success: false, error: response.message }
      }
    } catch (error) {
      console.error('Registration error:', error)
      return { success: false, error: error.message || 'Registration failed' }
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    try {
      await apiService.logout()
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      setUser(null)
      setIsAuthenticated(false)
    }
  }

  // Helper function to update user data
  const updateUser = (userData) => {
    setUser(userData)
  }

  const value = {
    user,
    isAuthenticated,
    isAdmin,
    isLoading,
    login,
    register,
    logout,
    updateUser
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
