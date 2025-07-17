import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useCurrency } from '../hooks/useCurrency'
import AuthModal from './AuthModal'
import PaymentModal from './PaymentModal'

const Pricing = () => {
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState(null)
  const { isAuthenticated } = useAuth()
  const { formatUSDToKSH, exchangeRate, isLoading: currencyLoading } = useCurrency()
  const plans = [
    {
      name: "Basic",
      price: "$29",
      period: "/month",
      description: "Perfect for beginners starting their trading journey",
      features: [
        "Access to basic courses",
        "Community forum access",
        "Email support",
        "Basic trading guides",
        "Mobile app access"
      ],
      popular: false,
      color: "gray"
    },
    {
      name: "Premium",
      price: "$99",
      period: "/month",
      description: "Most popular choice for serious traders",
      features: [
        "Access to all courses",
        "Premium Telegram signals",
        "1-on-1 mentoring sessions",
        "Advanced trading strategies",
        "Priority support",
        "Market analysis reports",
        "Live trading sessions",
        "Risk management tools"
      ],
      popular: true,
      color: "blue"
    },
    {
      name: "VIP",
      price: "$199",
      period: "/month",
      description: "For professional traders seeking maximum results",
      features: [
        "Everything in Premium",
        "Personal trading coach",
        "Custom trading strategies",
        "Direct access to expert traders",
        "Weekly live sessions",
        "Portfolio review",
        "Exclusive market insights",
        "Priority Telegram channel"
      ],
      popular: false,
      color: "purple"
    }
  ]

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handlePlanSelect = (plan) => {
    if (isAuthenticated) {
      setSelectedPlan(plan)
      setShowPaymentModal(true)
    } else {
      setSelectedPlan(plan)
      setShowAuthModal(true)
    }
  }

  const handleAuthSuccess = () => {
    setShowAuthModal(false)
    if (selectedPlan) {
      setShowPaymentModal(true)
    }
  }

  return (
    <section id="pricing" className="py-12 sm:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Choose Your Plan</h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-6">
            Select the perfect plan for your trading journey. All plans include access to our private Telegram channel.
          </p>

          {/* Exchange Rate Display */}
          <div className="inline-flex items-center bg-green-50 border border-green-200 rounded-full px-4 py-2 text-sm">
            <svg className="w-4 h-4 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-green-800 font-medium">
              {currencyLoading ? 'Loading exchange rate...' : `Current Rate: 1 USD = ${exchangeRate.toFixed(2)} KSH`}
            </span>
            <span className="text-green-600 ml-2">• Pay with M-Pesa</span>
          </div>
        </div>

        {/* Telegram Channel Benefits */}
        <div className="bg-blue-600 rounded-2xl p-6 sm:p-8 mb-12 text-white text-center">
          <h3 className="text-2xl sm:text-3xl font-bold mb-4">🚀 What You Get in Our Telegram Channel</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="bg-white/20 rounded-lg p-4">
              <div className="text-3xl mb-2">📊</div>
              <h4 className="font-bold text-sm sm:text-base">Daily Signals</h4>
              <p className="text-xs sm:text-sm opacity-90">5-10 premium signals daily</p>
            </div>
            <div className="bg-white/20 rounded-lg p-4">
              <div className="text-3xl mb-2">💬</div>
              <h4 className="font-bold text-sm sm:text-base">Expert Chat</h4>
              <p className="text-xs sm:text-sm opacity-90">Direct access to traders</p>
            </div>
            <div className="bg-white/20 rounded-lg p-4">
              <div className="text-3xl mb-2">📈</div>
              <h4 className="font-bold text-sm sm:text-base">Market Analysis</h4>
              <p className="text-xs sm:text-sm opacity-90">Daily market breakdowns</p>
            </div>
            <div className="bg-white/20 rounded-lg p-4">
              <div className="text-3xl mb-2">🔔</div>
              <h4 className="font-bold text-sm sm:text-base">Instant Alerts</h4>
              <p className="text-xs sm:text-sm opacity-90">Real-time notifications</p>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {plans.map((plan, index) => (
            <div key={index} className={`card relative ${plan.popular ? 'ring-2 ring-blue-500 sm:transform sm:scale-105' : ''} hover:shadow-xl transition-all duration-300`}>
              {plan.popular && (
                <div className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-4 sm:px-6 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-bold">
                    🔥 Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-6 sm:mb-8 pt-4 sm:pt-0">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-4 text-sm sm:text-base">{plan.description}</p>

                {/* Pricing Display */}
                <div className="mb-4">
                  {/* USD Price (smaller, crossed out) */}
                  <div className="flex items-center justify-center mb-1">
                    <span className="text-lg text-gray-400 line-through">{plan.price}</span>
                    <span className="text-gray-400 ml-1 text-sm">{plan.period}</span>
                  </div>

                  {/* KSH Price (prominent) */}
                  <div className="flex items-center justify-center">
                    <span className={`text-3xl sm:text-4xl font-bold ${plan.color === 'blue' ? 'text-blue-600' : plan.color === 'purple' ? 'text-purple-600' : 'text-gray-700'}`}>
                      {currencyLoading ? '...' : formatUSDToKSH(plan.price)}
                    </span>
                    <span className="text-gray-500 ml-2 text-base sm:text-lg">{plan.period}</span>
                  </div>

                  {/* Currency info */}
                  <div className="text-xs text-gray-500 mt-1">
                    Pay in Kenyan Shillings via M-Pesa
                  </div>
                </div>

                {plan.popular && (
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs sm:text-sm font-medium inline-block">
                    Save 30% - Limited Time
                  </div>
                )}
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handlePlanSelect(plan)}
                className={`w-full py-4 px-6 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 ${
                  plan.popular
                    ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg'
                    : plan.color === 'purple'
                    ? 'bg-purple-600 hover:bg-purple-700 text-white'
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                }`}
              >
                {plan.popular ? '🚀 Start Premium' : 'Get Started'}
              </button>

              {plan.popular && (
                <div className="text-center mt-4">
                  <p className="text-sm text-gray-500">
                    💳 30-day money-back guarantee
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="bg-blue-50 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">🎯 What You Get With Any Plan</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl mb-2">📱</div>
                <h4 className="font-semibold text-gray-900">Telegram Access</h4>
                <p className="text-sm text-gray-600">Private channel with signals</p>
              </div>
              <div>
                <div className="text-3xl mb-2">🎓</div>
                <h4 className="font-semibold text-gray-900">Expert Training</h4>
                <p className="text-sm text-gray-600">Learn from professionals</p>
              </div>
              <div>
                <div className="text-3xl mb-2">📊</div>
                <h4 className="font-semibold text-gray-900">Market Analysis</h4>
                <p className="text-sm text-gray-600">Daily market insights</p>
              </div>
              <div>
                <div className="text-3xl mb-2">🤝</div>
                <h4 className="font-semibold text-gray-900">Community</h4>
                <p className="text-sm text-gray-600">Connect with traders</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => {
          setShowAuthModal(false)
          setSelectedPlan(null)
        }}
        onSuccess={handleAuthSuccess}
      />

      {/* Payment Modal */}
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => {
          setShowPaymentModal(false)
          setSelectedPlan(null)
        }}
        selectedPlan={selectedPlan}
      />
    </section>
  )
}

export default Pricing
