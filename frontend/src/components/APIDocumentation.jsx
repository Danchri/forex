import React, { useState } from 'react'

const APIDocumentation = () => {
  const [activeAPI, setActiveAPI] = useState('mpesa')

  const apiDocs = {
    mpesa: {
      title: 'M-Pesa Daraja API Setup',
      icon: '💳',
      steps: [
        {
          title: 'Create Safaricom Developer Account',
          description: 'Visit https://developer.safaricom.co.ke and create an account',
          details: [
            'Go to Safaricom Developer Portal',
            'Click "Sign Up" and fill in your details',
            'Verify your email address',
            'Complete your profile information'
          ]
        },
        {
          title: 'Create a New App',
          description: 'Create an app to get Consumer Key and Secret',
          details: [
            'Login to your developer account',
            'Click "My Apps" → "Add a new app"',
            'Choose "Lipa Na M-Pesa Online" product',
            'Fill in app details and submit'
          ]
        },
        {
          title: 'Get API Credentials',
          description: 'Obtain your Consumer Key, Consumer Secret, and Passkey',
          details: [
            'Consumer Key: Found in your app dashboard',
            'Consumer Secret: Found in your app dashboard',
            'Business Short Code: Your M-Pesa business number',
            'Passkey: Provided by Safaricom for your shortcode'
          ]
        },
        {
          title: 'Configure Callback URLs',
          description: 'Set up URLs for payment notifications',
          details: [
            'Callback URL: Receives payment confirmations',
            'Confirmation URL: Validates transactions',
            'Validation URL: Pre-validates transactions',
            'Timeout URL: Handles timeout scenarios'
          ]
        }
      ],
      endpoints: [
        { method: 'POST', url: '/api/mpesa/stk-push', description: 'Initiate STK Push payment' },
        { method: 'POST', url: '/api/mpesa/callback', description: 'Handle payment callbacks' },
        { method: 'GET', url: '/api/mpesa/status/:id', description: 'Check transaction status' }
      ]
    },
    sms: {
      title: 'SMS API Integration',
      icon: '📱',
      steps: [
        {
          title: 'Choose SMS Provider',
          description: 'Select from supported SMS providers',
          details: [
            'Africa\'s Talking: Best for African markets',
            'Twilio: Global coverage, reliable',
            'Nexmo/Vonage: Good international rates',
            'Clickatell: Enterprise-focused'
          ]
        },
        {
          title: 'Get API Credentials',
          description: 'Register and obtain API keys',
          details: [
            'Create account with chosen provider',
            'Verify your identity and business',
            'Get API Key and Username',
            'Configure sender ID (if supported)'
          ]
        },
        {
          title: 'Test SMS Sending',
          description: 'Verify SMS functionality',
          details: [
            'Send test SMS to your number',
            'Check delivery reports',
            'Verify sender ID display',
            'Test different message types'
          ]
        }
      ],
      endpoints: [
        { method: 'POST', url: '/api/sms/send', description: 'Send SMS message' },
        { method: 'GET', url: '/api/sms/status/:id', description: 'Check SMS delivery status' },
        { method: 'GET', url: '/api/sms/balance', description: 'Check SMS balance' }
      ]
    },
    telegram: {
      title: 'Telegram Bot API Setup',
      icon: '📢',
      steps: [
        {
          title: 'Create Telegram Bot',
          description: 'Use BotFather to create your bot',
          details: [
            'Open Telegram and search for @BotFather',
            'Send /newbot command',
            'Choose a name and username for your bot',
            'Save the bot token provided'
          ]
        },
        {
          title: 'Create Telegram Channel',
          description: 'Set up your private channel',
          details: [
            'Create a new channel in Telegram',
            'Make it private',
            'Add your bot as an administrator',
            'Get the channel ID using @userinfobot'
          ]
        },
        {
          title: 'Configure Bot Permissions',
          description: 'Set up proper bot permissions',
          details: [
            'Add bot to channel as admin',
            'Grant "Add Members" permission',
            'Grant "Delete Messages" permission',
            'Grant "Pin Messages" permission'
          ]
        },
        {
          title: 'Set Up Webhook',
          description: 'Configure webhook for real-time updates',
          details: [
            'Set webhook URL in bot settings',
            'Configure SSL certificate if needed',
            'Test webhook connectivity',
            'Handle webhook security'
          ]
        }
      ],
      endpoints: [
        { method: 'POST', url: '/api/telegram/add-user', description: 'Add user to channel' },
        { method: 'POST', url: '/api/telegram/remove-user', description: 'Remove user from channel' },
        { method: 'POST', url: '/api/telegram/send-message', description: 'Send message to channel' },
        { method: 'POST', url: '/api/telegram/webhook', description: 'Handle Telegram webhooks' }
      ]
    }
  }

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-4">
        <h2 className="text-2xl font-bold text-gray-900">API Integration Guide</h2>
        <p className="text-gray-600 mt-1">Step-by-step setup instructions for all API integrations</p>
      </div>

      {/* API Selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.entries(apiDocs).map(([key, api]) => (
          <button
            key={key}
            onClick={() => setActiveAPI(key)}
            className={`p-4 rounded-xl border-2 transition-all text-left ${
              activeAPI === key
                ? 'border-purple-500 bg-purple-50 text-purple-700'
                : 'border-gray-200 bg-white hover:border-gray-300 text-gray-700'
            }`}
          >
            <div className="flex items-center mb-2">
              <span className="text-2xl mr-3">{api.icon}</span>
              <h3 className="font-semibold">{api.title}</h3>
            </div>
          </button>
        ))}
      </div>

      {/* API Documentation Content */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center mb-6">
          <span className="text-3xl mr-3">{apiDocs[activeAPI].icon}</span>
          <h3 className="text-2xl font-bold text-gray-900">{apiDocs[activeAPI].title}</h3>
        </div>

        {/* Setup Steps */}
        <div className="space-y-6">
          <h4 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
            Setup Instructions
          </h4>
          
          {apiDocs[activeAPI].steps.map((step, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-semibold text-sm mr-4">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h5 className="font-semibold text-gray-900 mb-2">{step.title}</h5>
                  <p className="text-gray-600 mb-3">{step.description}</p>
                  <ul className="space-y-1">
                    {step.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-start text-sm text-gray-600">
                        <span className="text-purple-500 mr-2">•</span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* API Endpoints */}
        <div className="mt-8">
          <h4 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2 mb-4">
            API Endpoints
          </h4>
          
          <div className="space-y-3">
            {apiDocs[activeAPI].endpoints.map((endpoint, index) => (
              <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                <span className={`px-2 py-1 rounded text-xs font-medium mr-3 ${
                  endpoint.method === 'GET' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                }`}>
                  {endpoint.method}
                </span>
                <code className="bg-gray-200 px-2 py-1 rounded text-sm font-mono mr-3 flex-shrink-0">
                  {endpoint.url}
                </code>
                <span className="text-gray-600 text-sm">{endpoint.description}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Resources */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <h5 className="font-semibold text-blue-900 mb-2">📚 Additional Resources</h5>
          <div className="space-y-1 text-sm text-blue-700">
            {activeAPI === 'mpesa' && (
              <>
                <div>• <a href="https://developer.safaricom.co.ke" className="underline" target="_blank" rel="noopener noreferrer">Safaricom Developer Portal</a></div>
                <div>• <a href="https://developer.safaricom.co.ke/docs" className="underline" target="_blank" rel="noopener noreferrer">M-Pesa API Documentation</a></div>
                <div>• <a href="https://github.com/safaricom/mpesa-php-sdk" className="underline" target="_blank" rel="noopener noreferrer">Official PHP SDK</a></div>
              </>
            )}
            {activeAPI === 'sms' && (
              <>
                <div>• <a href="https://africastalking.com" className="underline" target="_blank" rel="noopener noreferrer">Africa's Talking</a></div>
                <div>• <a href="https://twilio.com" className="underline" target="_blank" rel="noopener noreferrer">Twilio SMS API</a></div>
                <div>• <a href="https://vonage.com" className="underline" target="_blank" rel="noopener noreferrer">Vonage SMS API</a></div>
              </>
            )}
            {activeAPI === 'telegram' && (
              <>
                <div>• <a href="https://core.telegram.org/bots/api" className="underline" target="_blank" rel="noopener noreferrer">Telegram Bot API</a></div>
                <div>• <a href="https://core.telegram.org/bots" className="underline" target="_blank" rel="noopener noreferrer">Bot Development Guide</a></div>
                <div>• <a href="https://core.telegram.org/bots/webhooks" className="underline" target="_blank" rel="noopener noreferrer">Webhook Setup Guide</a></div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default APIDocumentation
