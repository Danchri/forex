import React, { useState } from 'react'
import { useCurrency } from '../hooks/useCurrency'

const AdminDashboard = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview')
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

  if (!isOpen) return null

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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-7xl w-full max-h-[95vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-bold">Admin Dashboard</h2>
              <p className="text-purple-100">Manage users, packages, and transactions</p>
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="p-6 bg-gray-50 border-b">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="bg-white rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.totalUsers}</div>
              <div className="text-sm text-gray-600">Total Users</div>
            </div>
            <div className="bg-white rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{stats.activeSubscriptions}</div>
              <div className="text-sm text-gray-600">Active Subs</div>
            </div>
            <div className="bg-white rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">${stats.totalRevenue.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Revenue</div>
            </div>
            <div className="bg-white rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600">{stats.pendingTransactions}</div>
              <div className="text-sm text-gray-600">Pending</div>
            </div>
            <div className="bg-white rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-indigo-600">{stats.telegramMembers}</div>
              <div className="text-sm text-gray-600">Telegram</div>
            </div>
            <div className="bg-white rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-emerald-600">+{stats.monthlyGrowth}%</div>
              <div className="text-sm text-gray-600">Growth</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex overflow-x-auto">
            {[
              { id: 'overview', name: 'Overview', icon: '📊' },
              { id: 'users', name: 'Users', icon: '👥' },
              { id: 'packages', name: 'Packages', icon: '📦' },
              { id: 'transactions', name: 'Transactions', icon: '💳' },
              { id: 'telegram', name: 'Telegram', icon: '📱' },
              { id: 'messages', name: 'Messages', icon: '✉️' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[50vh] overflow-y-auto">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Recent Activity */}
                <div className="bg-white rounded-lg border p-6">
                  <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded">
                      <div>
                        <div className="font-medium">New subscription</div>
                        <div className="text-sm text-gray-600">John Doe - Premium Plan</div>
                      </div>
                      <div className="text-sm text-gray-500">2 min ago</div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded">
                      <div>
                        <div className="font-medium">Payment received</div>
                        <div className="text-sm text-gray-600">KSH 14,850 via M-Pesa</div>
                      </div>
                      <div className="text-sm text-gray-500">5 min ago</div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-yellow-50 rounded">
                      <div>
                        <div className="font-medium">Subscription expiring</div>
                        <div className="text-sm text-gray-600">Jane Smith - 2 days left</div>
                      </div>
                      <div className="text-sm text-gray-500">1 hour ago</div>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-lg border p-6">
                  <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <button className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors">
                      Add User to Telegram
                    </button>
                    <button className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition-colors">
                      Send Broadcast Message
                    </button>
                    <button className="w-full bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 transition-colors">
                      Update Package Prices
                    </button>
                    <button className="w-full bg-orange-600 text-white p-3 rounded-lg hover:bg-orange-700 transition-colors">
                      Export User Data
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Users Tab */}
          {activeTab === 'users' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">User Management</h3>
                <div className="flex gap-2">
                  <input
                    type="search"
                    placeholder="Search users..."
                    className="px-3 py-2 border border-gray-300 rounded-lg"
                  />
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                    Add User
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border border-gray-200 rounded-lg">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">User</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Plan</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Expiry</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Telegram</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {users.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <div>
                            <div className="font-medium">{user.name}</div>
                            <div className="text-sm text-gray-600">{user.email}</div>
                            <div className="text-sm text-gray-600">{user.phone}</div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                            {user.plan}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded text-sm ${getStatusColor(user.status)}`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm">{user.expiryDate}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded text-sm ${
                            user.telegramStatus === 'added' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {user.telegramStatus}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-1">
                            <button
                              onClick={() => handleUserAction(user.id, user.status === 'active' ? 'deactivate' : 'activate')}
                              className={`px-2 py-1 text-xs rounded ${
                                user.status === 'active' 
                                  ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                                  : 'bg-green-100 text-green-700 hover:bg-green-200'
                              }`}
                            >
                              {user.status === 'active' ? 'Deactivate' : 'Activate'}
                            </button>
                            <button
                              onClick={() => handleUserAction(user.id, user.telegramStatus === 'added' ? 'removeFromTelegram' : 'addToTelegram')}
                              className={`px-2 py-1 text-xs rounded ${
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
          )}

          {/* Packages Tab */}
          {activeTab === 'packages' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Package Management</h3>
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                  Add Package
                </button>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {packages.map((pkg) => (
                  <div key={pkg.id} className="bg-white border rounded-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="text-xl font-bold">{pkg.name}</h4>
                      <span className={`px-2 py-1 rounded text-sm ${pkg.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {pkg.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Price (USD)</label>
                        <input
                          type="number"
                          value={pkg.price}
                          onChange={(e) => handlePackageUpdate(pkg.id, 'price', parseFloat(e.target.value))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        />
                        <div className="text-sm text-gray-500 mt-1">
                          KSH {formatUSDToKSH(`$${pkg.price}`)}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Duration (days)</label>
                        <input
                          type="number"
                          value={pkg.duration}
                          onChange={(e) => handlePackageUpdate(pkg.id, 'duration', parseInt(e.target.value))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Features</label>
                        <div className="space-y-1">
                          {pkg.features.map((feature, index) => (
                            <div key={index} className="flex items-center text-sm">
                              <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              {feature}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-between items-center pt-3 border-t">
                        <span className="text-sm text-gray-600">{pkg.subscribers} subscribers</span>
                        <div className="flex gap-2">
                          <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                            Edit
                          </button>
                          <button
                            onClick={() => handlePackageUpdate(pkg.id, 'isActive', !pkg.isActive)}
                            className={`px-3 py-1 rounded text-sm ${pkg.isActive ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'} text-white`}
                          >
                            {pkg.isActive ? 'Disable' : 'Enable'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Transactions Tab */}
          {activeTab === 'transactions' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Transaction Management</h3>
                <div className="flex gap-2">
                  <select className="px-3 py-2 border border-gray-300 rounded-lg">
                    <option>All Status</option>
                    <option>Completed</option>
                    <option>Pending</option>
                    <option>Failed</option>
                  </select>
                  <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                    Export
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border border-gray-200 rounded-lg">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Transaction ID</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">User</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Plan</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Amount</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">M-Pesa</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Date</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {transactions.map((txn) => (
                      <tr key={txn.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 font-mono text-sm">{txn.id}</td>
                        <td className="px-4 py-3">
                          <div>
                            <div className="font-medium">{txn.user}</div>
                            <div className="text-sm text-gray-600">{txn.email}</div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                            {txn.plan}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div>
                            <div className="font-medium">{txn.amountKSH}</div>
                            <div className="text-sm text-gray-600">{txn.amount}</div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div>
                            <div className="font-medium">{txn.mpesaNumber}</div>
                            <div className="text-sm text-gray-600">{txn.mpesaCode}</div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded text-sm ${getStatusColor(txn.status)}`}>
                            {txn.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm">{txn.date}</td>
                        <td className="px-4 py-3">
                          <div className="flex gap-1">
                            {txn.status === 'pending' && (
                              <>
                                <button className="bg-green-600 text-white px-2 py-1 text-xs rounded hover:bg-green-700">
                                  Approve
                                </button>
                                <button className="bg-red-600 text-white px-2 py-1 text-xs rounded hover:bg-red-700">
                                  Reject
                                </button>
                              </>
                            )}
                            <button className="bg-blue-600 text-white px-2 py-1 text-xs rounded hover:bg-blue-700">
                              View
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Telegram Tab */}
          {activeTab === 'telegram' && (
            <div className="space-y-6">
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Telegram Channel Management</h3>
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-white rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600">{stats.telegramMembers}</div>
                    <div className="text-sm text-gray-600">Total Members</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">{users.filter(u => u.telegramStatus === 'added').length}</div>
                    <div className="text-sm text-gray-600">Active Members</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-red-600">{users.filter(u => u.telegramStatus === 'removed').length}</div>
                    <div className="text-sm text-gray-600">Removed Members</div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                    Bulk Add Active Users
                  </button>
                  <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">
                    Remove Expired Users
                  </button>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                    Sync with Telegram
                  </button>
                </div>
              </div>

              <div className="bg-white border rounded-lg p-6">
                <h4 className="font-semibold mb-4">Add User to Telegram Channel</h4>
                <div className="flex gap-4">
                  <input
                    type="text"
                    placeholder="Enter Telegram username (@username)"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                  />
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                    Add to Channel
                  </button>
                </div>
              </div>

              <div className="bg-white border rounded-lg p-6">
                <h4 className="font-semibold mb-4">Channel Settings</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Channel Name</label>
                    <input
                      type="text"
                      value="@ForexClassSignals"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bot Token</label>
                    <input
                      type="password"
                      value="1234567890:ABCDEFGHIJKLMNOPQRSTUVWXYZ"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                    Update Settings
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Messages Tab */}
          {activeTab === 'messages' && (
            <div className="space-y-6">
              <div className="bg-white border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Send Message to Users</h3>
                <form onSubmit={handleSendMessage} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Recipients</label>
                    <select
                      value={messageData.recipient}
                      onChange={(e) => setMessageData({...messageData, recipient: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    >
                      <option value="all">All Users</option>
                      <option value="active">Active Subscribers Only</option>
                      <option value="expired">Expired Subscribers</option>
                      <option value="premium">Premium Users</option>
                      <option value="basic">Basic Users</option>
                      <option value="vip">VIP Users</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                    <input
                      type="text"
                      value={messageData.subject}
                      onChange={(e) => setMessageData({...messageData, subject: e.target.value})}
                      placeholder="Enter message subject"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <textarea
                      value={messageData.message}
                      onChange={(e) => setMessageData({...messageData, message: e.target.value})}
                      placeholder="Enter your message here..."
                      rows={6}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      required
                    />
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="sendToTelegram"
                      checked={messageData.sendToTelegram}
                      onChange={(e) => setMessageData({...messageData, sendToTelegram: e.target.checked})}
                      className="mr-2"
                    />
                    <label htmlFor="sendToTelegram" className="text-sm text-gray-700">
                      Also send to Telegram channel
                    </label>
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="submit"
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                    >
                      Send Message
                    </button>
                    <button
                      type="button"
                      className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700"
                    >
                      Save as Draft
                    </button>
                  </div>
                </form>
              </div>

              <div className="bg-white border rounded-lg p-6">
                <h4 className="font-semibold mb-4">Message Templates</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4">
                    <h5 className="font-medium mb-2">Welcome Message</h5>
                    <p className="text-sm text-gray-600 mb-3">Welcome new subscribers to the platform</p>
                    <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                      Use Template
                    </button>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h5 className="font-medium mb-2">Expiry Reminder</h5>
                    <p className="text-sm text-gray-600 mb-3">Remind users about subscription expiry</p>
                    <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                      Use Template
                    </button>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h5 className="font-medium mb-2">Payment Confirmation</h5>
                    <p className="text-sm text-gray-600 mb-3">Confirm successful payments</p>
                    <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                      Use Template
                    </button>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h5 className="font-medium mb-2">Trading Signal Alert</h5>
                    <p className="text-sm text-gray-600 mb-3">Send trading signals to users</p>
                    <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                      Use Template
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
