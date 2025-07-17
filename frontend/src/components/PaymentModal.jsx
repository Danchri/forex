import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useCurrency } from '../hooks/useCurrency'

const PaymentModal = ({ isOpen, onClose, selectedPlan }) => {
  const { user } = useAuth()
  const { exchangeRate, formatUSDToKSH, convertUSDToKSH, isLoading: currencyLoading, lastUpdated, refreshRate } = useCurrency()
  const [formData, setFormData] = useState({
    fullName: user ? `${user.firstName} ${user.lastName}` : '',
    email: user ? user.email : '',
    mpesaNumber: '',
    agreeToTerms: false
  })
  const [isLoading, setIsLoading] = useState(false)
  const [paymentStep, setPaymentStep] = useState('form') // 'form', 'processing', 'success'
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    })
    setError('')
  }

  const formatMpesaNumber = (number) => {
    // Remove any non-digit characters
    const cleaned = number.replace(/\D/g, '')
    
    // Format as Kenyan phone number
    if (cleaned.startsWith('254')) {
      return cleaned
    } else if (cleaned.startsWith('0')) {
      return '254' + cleaned.substring(1)
    } else if (cleaned.startsWith('7') || cleaned.startsWith('1')) {
      return '254' + cleaned
    }
    return cleaned
  }

  const validateMpesaNumber = (number) => {
    const formatted = formatMpesaNumber(number)
    // Kenyan M-Pesa numbers: 254 7XX XXX XXX or 254 1XX XXX XXX
    const mpesaRegex = /^254[71]\d{8}$/
    return mpesaRegex.test(formatted)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // Validate M-Pesa number
    if (!validateMpesaNumber(formData.mpesaNumber)) {
      setError('Please enter a valid M-Pesa number (e.g., 0712345678)')
      setIsLoading(false)
      return
    }

    if (!formData.agreeToTerms) {
      setError('Please agree to the terms and conditions')
      setIsLoading(false)
      return
    }

    try {
      setPaymentStep('processing')
      
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      // Simulate M-Pesa payment request
      const usdAmount = selectedPlan?.price.replace('$', '')
      const kshAmount = convertUSDToKSH(usdAmount)

      const paymentData = {
        plan: selectedPlan,
        amountUSD: usdAmount,
        amountKSH: kshAmount,
        exchangeRate: exchangeRate,
        mpesaNumber: formatMpesaNumber(formData.mpesaNumber),
        email: formData.email,
        fullName: formData.fullName
      }

      console.log('Processing payment:', paymentData)
      
      // Simulate successful payment
      setPaymentStep('success')
      
    } catch (error) {
      setError('Payment failed. Please try again.')
      setPaymentStep('form')
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    setPaymentStep('form')
    setError('')
    setFormData({
      fullName: user ? `${user.firstName} ${user.lastName}` : '',
      email: user ? user.email : '',
      mpesaNumber: '',
      agreeToTerms: false
    })
    onClose()
  }

  if (!isOpen || !selectedPlan) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 sm:p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {paymentStep === 'success' ? 'Payment Successful!' : 'Complete Payment'}
            </h2>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Plan Summary */}
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="font-bold text-gray-900">{selectedPlan.name} Plan</h3>
                <p className="text-sm text-gray-600 mb-2">{selectedPlan.description}</p>

                {/* Exchange Rate Info */}
                <div className="flex items-center text-xs text-gray-500">
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Rate: 1 USD = {exchangeRate.toFixed(2)} KSH
                  {lastUpdated && (
                    <span className="ml-2">
                      (Updated: {lastUpdated.toLocaleTimeString()})
                    </span>
                  )}
                  <button
                    onClick={refreshRate}
                    className="ml-2 text-blue-600 hover:text-blue-700"
                    disabled={currencyLoading}
                  >
                    {currencyLoading ? '⟳' : '↻'}
                  </button>
                </div>
              </div>

              <div className="text-right ml-4">
                <div className="text-lg font-bold text-gray-600 line-through">{selectedPlan.price}</div>
                <div className="text-2xl font-bold text-blue-600">
                  {formatUSDToKSH(selectedPlan.price)}
                </div>
                <div className="text-sm text-gray-500">{selectedPlan.period}</div>
                <div className="text-xs text-green-600 font-medium mt-1">
                  Pay in Kenyan Shillings
                </div>
              </div>
            </div>
          </div>

          {paymentStep === 'form' && (
            <>
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    M-Pesa Number
                  </label>
                  <input
                    type="tel"
                    name="mpesaNumber"
                    value={formData.mpesaNumber}
                    onChange={handleChange}
                    placeholder="0712345678"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Enter your M-Pesa registered phone number
                  </p>
                </div>

                <div className="flex items-start">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleChange}
                    className="mt-1 mr-3"
                    required
                  />
                  <label className="text-sm text-gray-600">
                    I agree to the{' '}
                    <a href="#" className="text-blue-600 hover:text-blue-700">
                      Terms and Conditions
                    </a>{' '}
                    and{' '}
                    <a href="#" className="text-blue-600 hover:text-blue-700">
                      Privacy Policy
                    </a>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full btn-primary py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Processing...' : `Pay ${formatUSDToKSH(selectedPlan.price)} via M-Pesa`}
                </button>
              </form>

              <div className="mt-4 p-4 bg-green-50 rounded-lg">
                <div className="flex items-center mb-2">
                  <svg className="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.374 0 0 5.373 0 12s5.374 12 12 12 12-5.373 12-12S18.626 0 12 0zm5.568 8.16c-.169 1.858-.896 6.728-.896 6.728-.377 2.655-.377 2.655-1.377 2.655-.896 0-1.377-.896-1.377-2.655 0 0-.727-4.87-.896-6.728-.169-1.858.727-2.655 1.858-2.655s2.027.797 1.858 2.655z"/>
                  </svg>
                  <h4 className="font-medium text-green-800">What happens next?</h4>
                </div>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• You'll receive an M-Pesa prompt on your phone</li>
                  <li>• Enter your M-Pesa PIN to complete payment</li>
                  <li>• Instant access to our Telegram channel</li>
                  <li>• Welcome email with course access</li>
                </ul>
              </div>
            </>
          )}

          {paymentStep === 'processing' && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Processing Payment</h3>
              <p className="text-gray-600 mb-4">
                Please check your phone for the M-Pesa prompt and enter your PIN
              </p>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 space-y-2">
                <p className="text-sm text-yellow-800">
                  <strong>M-Pesa Number:</strong> {formatMpesaNumber(formData.mpesaNumber)}
                </p>
                <p className="text-sm text-yellow-800">
                  <strong>Amount:</strong> {formatUSDToKSH(selectedPlan.price)}
                  <span className="text-xs ml-1">({selectedPlan.price} USD)</span>
                </p>
                <p className="text-xs text-yellow-700">
                  Exchange Rate: 1 USD = {exchangeRate.toFixed(2)} KSH
                </p>
              </div>
            </div>
          )}

          {paymentStep === 'success' && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Payment Successful!</h3>
              <p className="text-gray-600 mb-6">
                Welcome to ForexClass! You now have access to our premium features.
              </p>
              
              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-blue-900 mb-2">🎉 You now have access to:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>✅ Private Telegram Channel</li>
                  <li>✅ Daily Trading Signals</li>
                  <li>✅ All Premium Courses</li>
                  <li>✅ Expert Support</li>
                </ul>
              </div>

              <button
                onClick={handleClose}
                className="btn-primary w-full py-3"
              >
                Continue to Dashboard
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PaymentModal
