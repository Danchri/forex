import React from 'react'

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="card">
            <h3 className="text-lg font-semibold mb-2">Subscription Status</h3>
            <p className="text-green-600 font-medium">Premium Active</p>
            <p className="text-sm text-gray-500">Expires: Dec 31, 2024</p>
          </div>
          
          <div className="card">
            <h3 className="text-lg font-semibold mb-2">Courses Enrolled</h3>
            <p className="text-2xl font-bold text-blue-600">3</p>
            <p className="text-sm text-gray-500">2 completed</p>
          </div>
          
          <div className="card">
            <h3 className="text-lg font-semibold mb-2">Telegram Access</h3>
            <p className="text-green-600 font-medium">Connected</p>
            <p className="text-sm text-gray-500">Premium signals active</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="card">
            <h3 className="text-xl font-semibold mb-4">Recent Courses</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <div>
                  <h4 className="font-medium">Crypto Trading Fundamentals</h4>
                  <p className="text-sm text-gray-500">Progress: 80%</p>
                </div>
                <button className="text-blue-600 hover:text-blue-800">Continue</button>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <div>
                  <h4 className="font-medium">Advanced Forex Strategies</h4>
                  <p className="text-sm text-gray-500">Progress: 45%</p>
                </div>
                <button className="text-blue-600 hover:text-blue-800">Continue</button>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="text-xl font-semibold mb-4">Recent Signals</h3>
            <div className="space-y-3">
              <div className="p-3 bg-green-50 border border-green-200 rounded">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-green-800">BTC/USD Long</h4>
                    <p className="text-sm text-green-600">Entry: $42,500</p>
                  </div>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Active</span>
                </div>
              </div>
              <div className="p-3 bg-blue-50 border border-blue-200 rounded">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-blue-800">EUR/USD Short</h4>
                    <p className="text-sm text-blue-600">Entry: 1.0850</p>
                  </div>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Closed +50 pips</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
