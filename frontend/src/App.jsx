import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import AdminLogin from './pages/AdminLogin'
import AdminPage from './pages/AdminPage'
import ProtectedRoute from './components/ProtectedRoute'
import BackToTop from './components/BackToTop'

// Create a client
const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Main Website Routes */}
            <Route
              path="/"
              element={
                <div className="min-h-screen bg-gray-50">
                  <Navbar />
                  <main>
                    <HomePage />
                  </main>
                  <BackToTop />
                </div>
              }
            />

            {/* Admin Routes - No main navbar */}
            <Route path="/admin" element={<AdminLogin />} />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute requireAdmin={true}>
                  <AdminPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
