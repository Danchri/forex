import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCurrency } from '../hooks/useCurrency'
import AdminSettings from '../components/AdminSettings'
import AddUserModal from '../components/AddUserModal'
import AddPackageModal from '../components/AddPackageModal'
import WebsiteManagement from '../components/WebsiteManagement'

const AdminPage = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showAddUserModal, setShowAddUserModal] = useState(false)
  const [showAddPackageModal, setShowAddPackageModal] = useState(false)
  const { formatUSDToKSH, exchangeRate } = useCurrency()

  // Mock admin data - in real app, this would come from API
  const [stats] = useState({
    totalUsers: 1247,
    activeSubscriptions: 892,
    totalRevenue: 89250,
    pendingTransactions: 23,
    telegramMembers: 856,
    monthlyGrowth: 12.5
  })

  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+254712345678',
      telegram: '@johndoe',
      plan: 'Premium',
      status: 'active',
      joinDate: '2024-01-15',
      expiryDate: '2024-02-15',
      lastPayment: '$99',
      telegramStatus: 'added'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+254723456789',
      telegram: '@janesmith',
      plan: 'Basic',
      status: 'expired',
      joinDate: '2024-01-10',
      expiryDate: '2024-01-25',
      lastPayment: '$29',
      telegramStatus: 'removed'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike@example.com',
      phone: '+254734567890',
      telegram: '@mikej',
      plan: 'VIP',
      status: 'active',
      joinDate: '2024-01-20',
      expiryDate: '2024-02-20',
      lastPayment: '$199',
      telegramStatus: 'added'
    }
  ])

  const [packages, setPackages] = useState([
    {
      id: 1,
      name: 'Basic',
      price: 29,
      duration: 30,
      features: ['Basic courses', 'Email support', 'Community access'],
      isActive: true,
      subscribers: 156
    },
    {
      id: 2,
      name: 'Premium',
      price: 99,
      duration: 30,
      features: ['All courses', 'Telegram signals', '1-on-1 mentoring', 'Priority support'],
      isActive: true,
      subscribers: 642
    },
    {
      id: 3,
      name: 'VIP',
      price: 199,
      duration: 30,
      features: ['Everything in Premium', 'Personal coach', 'Custom strategies', 'Weekly sessions'],
      isActive: true,
      subscribers: 94
    }
  ])

  const [transactions, setTransactions] = useState([
    {
      id: 'TXN001',
      user: 'John Doe',
      email: 'john@example.com',
      plan: 'Premium',
      amount: '$99',
      amountKSH: 'KSH 14,850',
      mpesaNumber: '+254712345678',
      status: 'completed',
      date: '2024-01-15 14:30',
      mpesaCode: 'QA12B3C4D5'
    },
    {
      id: 'TXN002',
      user: 'Jane Smith',
      email: 'jane@example.com',
      plan: 'Basic',
      amount: '$29',
      amountKSH: 'KSH 4,350',
      mpesaNumber: '+254723456789',
      status: 'pending',
      date: '2024-01-16 09:15',
      mpesaCode: 'Pending'
    },
    {
      id: 'TXN003',
      user: 'Mike Johnson',
      email: 'mike@example.com',
      plan: 'VIP',
      amount: '$199',
      amountKSH: 'KSH 29,850',
      mpesaNumber: '+254734567890',
      status: 'failed',
      date: '2024-01-16 16:45',
      mpesaCode: 'Failed'
    }
  ])

  const [messageData, setMessageData] = useState({
    recipient: 'all',
    subject: '',
    message: '',
    sendToTelegram: false
  })

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100'
      case 'expired': return 'text-red-600 bg-red-100'
      case 'pending': return 'text-yellow-600 bg-yellow-100'
      case 'completed': return 'text-green-600 bg-green-100'
      case 'failed': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const handleUserAction = (userId, action) => {
    setUsers(users.map(user => {
      if (user.id === userId) {
        switch (action) {
          case 'activate':
            return { ...user, status: 'active', telegramStatus: 'added' }
          case 'deactivate':
            return { ...user, status: 'expired', telegramStatus: 'removed' }
          case 'addToTelegram':
            return { ...user, telegramStatus: 'added' }
          case 'removeFromTelegram':
            return { ...user, telegramStatus: 'removed' }
          default:
            return user
        }
      }
      return user
    }))
  }

  const handlePackageUpdate = (packageId, field, value) => {
    setPackages(packages.map(pkg => 
      pkg.id === packageId ? { ...pkg, [field]: value } : pkg
    ))
  }

  const handleSendMessage = (e) => {
    e.preventDefault()
    console.log('Sending message:', messageData)
    alert('Message sent successfully!')
    setMessageData({ recipient: 'all', subject: '', message: '', sendToTelegram: false })
  }

  const handleUserAdded = (newUser) => {
    setUsers([...users, newUser])
  }

  const handlePackageAdded = (newPackage) => {
    setPackages([...packages, newPackage])
  }

  const handleLogout = () => {
    logout()
    navigate('/admin')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Left Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white shadow-xl border-r border-gray-200
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 bg-gradient-to-r from-purple-600 to-blue-600">
          <h1 className="text-xl font-bold text-white">ForexClass Admin</h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white hover:text-gray-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* User Info */}
        <div className="p-6 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-sm">{user?.firstName?.charAt(0)}</span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">Welcome back,</p>
              <p className="text-sm text-gray-600">{user?.firstName} {user?.lastName}</p>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {[
            { id: 'overview', name: 'Dashboard', icon: '📊', description: 'Overview & Analytics' },
            { id: 'users', name: 'Users', icon: '👥', description: 'Manage Users' },
            { id: 'packages', name: 'Packages', icon: '📦', description: 'Pricing Plans' },
            { id: 'transactions', name: 'Transactions', icon: '💳', description: 'Payments' },
            { id: 'telegram', name: 'Telegram', icon: '📱', description: 'Channel Management' },
            { id: 'messages', name: 'Messages', icon: '✉️', description: 'Notifications' },
            { id: 'website', name: 'Website', icon: '🌐', description: 'Content Management' },
            { id: 'settings', name: 'Settings', icon: '⚙️', description: 'API Configuration' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id)
                setSidebarOpen(false)
              }}
              className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition-all group ${
                activeTab === item.id
                  ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <span className="text-xl mr-3">{item.icon}</span>
              <div className="flex-1">
                <div className="font-medium">{item.name}</div>
                <div className={`text-xs ${activeTab === item.id ? 'text-purple-100' : 'text-gray-500'}`}>
                  {item.description}
                </div>
              </div>
              {activeTab === item.id && (
                <div className="w-2 h-2 bg-white rounded-full"></div>
              )}
            </button>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-gray-200 space-y-2">
          <button
            onClick={() => navigate('/')}
            className="w-full flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            <span className="text-sm">View Website</span>
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span className="text-sm">Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 lg:ml-0">
        {/* Top Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 lg:pl-0">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {/* Mobile menu button */}
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden mr-4 p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                    <span className="text-3xl mr-3">
                      {activeTab === 'overview' && '📊'}
                      {activeTab === 'users' && '👥'}
                      {activeTab === 'packages' && '📦'}
                      {activeTab === 'transactions' && '💳'}
                      {activeTab === 'telegram' && '📱'}
                      {activeTab === 'messages' && '✉️'}
                      {activeTab === 'website' && '🌐'}
                      {activeTab === 'settings' && '⚙️'}
                    </span>
                    {activeTab === 'overview' && 'Dashboard Overview'}
                    {activeTab === 'users' && 'User Management'}
                    {activeTab === 'packages' && 'Package Management'}
                    {activeTab === 'transactions' && 'Transaction Management'}
                    {activeTab === 'telegram' && 'Telegram Management'}
                    {activeTab === 'messages' && 'Message Center'}
                    {activeTab === 'website' && 'Website Management'}
                    {activeTab === 'settings' && 'API Settings'}
                  </h1>
                  <p className="text-gray-600 text-sm mt-1">
                    {activeTab === 'overview' && 'Monitor your platform performance and activity'}
                    {activeTab === 'users' && 'Manage user accounts and subscriptions'}
                    {activeTab === 'packages' && 'Configure pricing plans and features'}
                    {activeTab === 'transactions' && 'Review payments and transaction history'}
                    {activeTab === 'telegram' && 'Control Telegram channel access and members'}
                    {activeTab === 'messages' && 'Send notifications and announcements'}
                    {activeTab === 'website' && 'Manage website content and appearance'}
                    {activeTab === 'settings' && 'Configure M-Pesa, SMS, and Telegram API settings'}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="hidden sm:block text-right">
                  <div className="text-sm text-gray-500">Exchange Rate</div>
                  <div className="text-lg font-semibold text-gray-900">1 USD = {exchangeRate.toFixed(2)} KSH</div>
                </div>
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">{user?.firstName?.charAt(0)}</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {/* Stats Overview - Only show on overview tab */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <div className="text-2xl font-bold text-gray-900">{stats.totalUsers}</div>
                    <div className="text-sm text-gray-600">Total Users</div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <div className="text-2xl font-bold text-gray-900">{stats.activeSubscriptions}</div>
                    <div className="text-sm text-gray-600">Active Subscriptions</div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <div className="text-2xl font-bold text-gray-900">${stats.totalRevenue.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">Total Revenue</div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className="p-3 bg-yellow-100 rounded-lg">
                    <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <div className="text-2xl font-bold text-gray-900">{stats.pendingTransactions}</div>
                    <div className="text-sm text-gray-600">Pending Payments</div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className="p-3 bg-indigo-100 rounded-lg">
                    <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <div className="text-2xl font-bold text-gray-900">{stats.telegramMembers}</div>
                    <div className="text-sm text-gray-600">Telegram Members</div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className="p-3 bg-emerald-100 rounded-lg">
                    <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <div className="text-2xl font-bold text-gray-900">+{stats.monthlyGrowth}%</div>
                    <div className="text-sm text-gray-600">Monthly Growth</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Content Container */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Recent Activity */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-xl font-semibold mb-6 flex items-center">
                      <span className="mr-2">📈</span>
                      Recent Activity
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                        <div>
                          <div className="font-medium text-green-800">New Premium Subscription</div>
                          <div className="text-sm text-green-600">John Doe - {formatUSDToKSH('$99')}</div>
                        </div>
                        <div className="text-sm text-green-500">2 min ago</div>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <div>
                          <div className="font-medium text-blue-800">M-Pesa Payment Received</div>
                          <div className="text-sm text-blue-600">Transaction: QA12B3C4D5</div>
                        </div>
                        <div className="text-sm text-blue-500">5 min ago</div>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                        <div>
                          <div className="font-medium text-yellow-800">Subscription Expiring Soon</div>
                          <div className="text-sm text-yellow-600">Jane Smith - 2 days remaining</div>
                        </div>
                        <div className="text-sm text-yellow-500">1 hour ago</div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-xl font-semibold mb-6 flex items-center">
                      <span className="mr-2">⚡</span>
                      Quick Actions
                    </h3>
                    <div className="space-y-4">
                      <button
                        onClick={() => setActiveTab('website')}
                        className="w-full bg-indigo-600 text-white p-4 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center"
                      >
                        <span className="mr-2">🌐</span>
                        Website Content Management
                      </button>
                      <button
                        onClick={() => setActiveTab('telegram')}
                        className="w-full bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                      >
                        <span className="mr-2">📱</span>
                        Manage Telegram Channel
                      </button>
                      <button
                        onClick={() => setActiveTab('messages')}
                        className="w-full bg-green-600 text-white p-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center"
                      >
                        <span className="mr-2">✉️</span>
                        Send Broadcast Message
                      </button>
                      <button
                        onClick={() => setActiveTab('packages')}
                        className="w-full bg-purple-600 text-white p-4 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center"
                      >
                        <span className="mr-2">📦</span>
                        Update Package Prices
                      </button>
                      <button
                        onClick={() => setActiveTab('users')}
                        className="w-full bg-cyan-600 text-white p-4 rounded-lg hover:bg-cyan-700 transition-colors flex items-center justify-center"
                      >
                        <span className="mr-2">👥</span>
                        Manage Users
                      </button>
                      <button className="w-full bg-orange-600 text-white p-4 rounded-lg hover:bg-orange-700 transition-colors flex items-center justify-center">
                        <span className="mr-2">📊</span>
                        Export Analytics Report
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Users Tab */}
            {activeTab === 'users' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <h3 className="text-2xl font-semibold flex items-center">
                    <span className="mr-2">👥</span>
                    User Management
                  </h3>
                  <div className="flex gap-3">
                    <input
                      type="search"
                      placeholder="Search users..."
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <button
                      onClick={() => setShowAddUserModal(true)}
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Add User
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">User Details</th>
                          <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Plan</th>
                          <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Status</th>
                          <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Expiry Date</th>
                          <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Telegram</th>
                          <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {users.map((user) => (
                          <tr key={user.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4">
                              <div>
                                <div className="font-medium text-gray-900">{user.name}</div>
                                <div className="text-sm text-gray-600">{user.email}</div>
                                <div className="text-sm text-gray-600">{user.phone}</div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                                {user.plan}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(user.status)}`}>
                                {user.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900">{user.expiryDate}</td>
                            <td className="px-6 py-4">
                              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                user.telegramStatus === 'added' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                              }`}>
                                {user.telegramStatus}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex gap-2">
                                <button
                                  onClick={() => handleUserAction(user.id, user.status === 'active' ? 'deactivate' : 'activate')}
                                  className={`px-3 py-1 text-xs rounded-lg font-medium transition-colors ${
                                    user.status === 'active' 
                                      ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                                      : 'bg-green-100 text-green-700 hover:bg-green-200'
                                  }`}
                                >
                                  {user.status === 'active' ? 'Deactivate' : 'Activate'}
                                </button>
                                <button
                                  onClick={() => handleUserAction(user.id, user.telegramStatus === 'added' ? 'removeFromTelegram' : 'addToTelegram')}
                                  className={`px-3 py-1 text-xs rounded-lg font-medium transition-colors ${
                                    user.telegramStatus === 'added'
                                      ? 'bg-red-100 text-red-700 hover:bg-red-200'
                                      : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                                  }`}
                                >
                                  {user.telegramStatus === 'added' ? 'Remove' : 'Add'} TG
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Packages Tab */}
            {activeTab === 'packages' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-semibold flex items-center">
                    <span className="mr-2">📦</span>
                    Package Management
                  </h3>
                  <button
                    onClick={() => setShowAddPackageModal(true)}
                    className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Add Package
                  </button>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {packages.map((pkg) => (
                    <div key={pkg.id} className="bg-gray-50 rounded-xl p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h4 className="text-xl font-bold">{pkg.name}</h4>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${pkg.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {pkg.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Price (USD)</label>
                          <input
                            type="number"
                            value={pkg.price}
                            onChange={(e) => handlePackageUpdate(pkg.id, 'price', parseFloat(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                          />
                          <div className="text-sm text-gray-500 mt-1">
                            {formatUSDToKSH(`$${pkg.price}`)}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                            Update
                          </button>
                          <button
                            onClick={() => handlePackageUpdate(pkg.id, 'isActive', !pkg.isActive)}
                            className={`flex-1 py-2 rounded-lg ${pkg.isActive ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'} text-white`}
                          >
                            {pkg.isActive ? 'Disable' : 'Enable'}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Transactions Tab */}
            {activeTab === 'transactions' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold flex items-center">
                  <span className="mr-2">💳</span>
                  Transaction Management
                </h3>
                <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Transaction</th>
                          <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">User</th>
                          <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Amount</th>
                          <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Status</th>
                          <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {transactions.map((txn) => (
                          <tr key={txn.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4">
                              <div className="font-mono text-sm">{txn.id}</div>
                              <div className="text-sm text-gray-600">{txn.date}</div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="font-medium">{txn.user}</div>
                              <div className="text-sm text-gray-600">{txn.email}</div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="font-medium">{txn.amountKSH}</div>
                              <div className="text-sm text-gray-600">{txn.amount}</div>
                            </td>
                            <td className="px-6 py-4">
                              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(txn.status)}`}>
                                {txn.status}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              {txn.status === 'pending' && (
                                <div className="flex gap-2">
                                  <button className="bg-green-600 text-white px-3 py-1 text-sm rounded hover:bg-green-700">
                                    Approve
                                  </button>
                                  <button className="bg-red-600 text-white px-3 py-1 text-sm rounded hover:bg-red-700">
                                    Reject
                                  </button>
                                </div>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Telegram Tab */}
            {activeTab === 'telegram' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold flex items-center">
                  <span className="mr-2">📱</span>
                  Telegram Management
                </h3>
                <div className="bg-blue-50 rounded-xl p-6">
                  <div className="grid md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-white rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-blue-600">{stats.telegramMembers}</div>
                      <div className="text-sm text-gray-600">Total Members</div>
                    </div>
                    <div className="bg-white rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-green-600">{users.filter(u => u.telegramStatus === 'added').length}</div>
                      <div className="text-sm text-gray-600">Active</div>
                    </div>
                    <div className="bg-white rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-red-600">{users.filter(u => u.telegramStatus === 'removed').length}</div>
                      <div className="text-sm text-gray-600">Removed</div>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700">
                      Bulk Add Active Users
                    </button>
                    <button className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700">
                      Remove Expired Users
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Messages Tab */}
            {activeTab === 'messages' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold flex items-center">
                  <span className="mr-2">✉️</span>
                  Send Messages
                </h3>
                <div className="bg-gray-50 rounded-xl p-6">
                  <form onSubmit={handleSendMessage} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Recipients</label>
                      <select
                        value={messageData.recipient}
                        onChange={(e) => setMessageData({...messageData, recipient: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      >
                        <option value="all">All Users</option>
                        <option value="active">Active Subscribers</option>
                        <option value="expired">Expired Subscribers</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                      <input
                        type="text"
                        value={messageData.subject}
                        onChange={(e) => setMessageData({...messageData, subject: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                      <textarea
                        value={messageData.message}
                        onChange={(e) => setMessageData({...messageData, message: e.target.value})}
                        rows={6}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        required
                      />
                    </div>
                    <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* Website Management Tab */}
            {activeTab === 'website' && (
              <WebsiteManagement />
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <AdminSettings />
            )}
          </div>
        </main>
      </div>

      {/* Modals */}
      <AddUserModal
        isOpen={showAddUserModal}
        onClose={() => setShowAddUserModal(false)}
        onUserAdded={handleUserAdded}
      />

      <AddPackageModal
        isOpen={showAddPackageModal}
        onClose={() => setShowAddPackageModal(false)}
        onPackageAdded={handlePackageAdded}
      />
    </div>
  )
}

export default AdminPage
