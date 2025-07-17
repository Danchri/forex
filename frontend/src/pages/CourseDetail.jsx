import React from 'react'

const CourseDetail = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="card mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Crypto Trading Fundamentals</h1>
              <p className="text-lg text-gray-600 mb-6">
                Learn the basics of cryptocurrency trading, market analysis, and risk management from expert traders.
              </p>
              
              <div className="flex items-center space-x-6 mb-6">
                <div className="flex items-center">
                  <span className="text-sm text-gray-500">Duration:</span>
                  <span className="ml-2 font-medium">8 hours</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm text-gray-500">Level:</span>
                  <span className="ml-2 font-medium">Beginner</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm text-gray-500">Students:</span>
                  <span className="ml-2 font-medium">1,234</span>
                </div>
              </div>

              <div className="aspect-video bg-gray-200 rounded-lg mb-6 flex items-center justify-center">
                <span className="text-gray-500">Course Preview Video</span>
              </div>
            </div>

            <div className="card">
              <h2 className="text-2xl font-bold mb-4">Course Content</h2>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold mb-2">1. Introduction to Cryptocurrency</h3>
                  <p className="text-sm text-gray-600 mb-2">Understanding blockchain technology and digital currencies</p>
                  <span className="text-xs text-gray-500">45 minutes</span>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold mb-2">2. Market Analysis Basics</h3>
                  <p className="text-sm text-gray-600 mb-2">Learn to read charts and identify market trends</p>
                  <span className="text-xs text-gray-500">60 minutes</span>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold mb-2">3. Risk Management</h3>
                  <p className="text-sm text-gray-600 mb-2">Protect your capital with proper risk management techniques</p>
                  <span className="text-xs text-gray-500">40 minutes</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="card sticky top-8">
              <div className="text-center mb-6">
                <span className="text-3xl font-bold text-blue-600">$99</span>
                <p className="text-gray-500">One-time payment</p>
              </div>
              
              <button className="btn-primary w-full mb-4">
                Enroll Now
              </button>
              
              <div className="space-y-3 text-sm">
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Lifetime access
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Certificate of completion
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Mobile and desktop access
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Community access
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseDetail
