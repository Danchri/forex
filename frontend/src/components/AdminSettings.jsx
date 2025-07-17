import React, { useState } from 'react'
import APIDocumentation from './APIDocumentation'

const AdminSettings = () => {
  const [activeSection, setActiveSection] = useState('mpesa')
  const [isSaving, setIsSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState('')

  // M-Pesa API Settings
  const [mpesaSettings, setMpesaSettings] = useState({
    consumerKey: '',
    consumerSecret: '',
    businessShortCode: '',
    passkey: '',
    environment: 'sandbox', // sandbox or production
    callbackUrl: '',
    confirmationUrl: '',
    validationUrl: '',
    timeoutUrl: ''
  })

  // SMS API Settings
  const [smsSettings, setSmsSettings] = useState({
    provider: 'africastalking', // africastalking, twilio, etc
    apiKey: '',
    username: '',
    senderId: 'ForexClass',
    environment: 'sandbox'
  })

  // Telegram API Settings
  const [telegramSettings, setTelegramSettings] = useState({
    botToken: '',
    channelId: '',
    channelUsername: '',
    webhookUrl: '',
    adminChatId: '',
    welcomeMessage: 'Welcome to ForexClass Premium Signals! 🚀',
    removeMessage: 'Your access has been revoked. Contact support for assistance.'
  })

  // General Settings
  const [generalSettings, setGeneralSettings] = useState({
    siteName: 'ForexClass',
    supportEmail: 'support@forexclass.com',
    currency: 'USD',
    timezone: 'Africa/Nairobi',
    maintenanceMode: false,
    registrationEnabled: true
  })

  const handleSave = async (section) => {
    setIsSaving(true)
    setSaveMessage('')

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      let settingsData
      switch (section) {
        case 'mpesa':
          settingsData = mpesaSettings
          break
        case 'sms':
          settingsData = smsSettings
          break
        case 'telegram':
          settingsData = telegramSettings
          break
        case 'general':
          settingsData = generalSettings
          break
        default:
          settingsData = {}
      }

      console.log(`Saving ${section} settings:`, settingsData)
      setSaveMessage(`${section.toUpperCase()} settings saved successfully!`)
      
      setTimeout(() => setSaveMessage(''), 3000)
    } catch (error) {
      setSaveMessage(`Error saving ${section} settings. Please try again.`)
    } finally {
      setIsSaving(false)
    }
  }

  const testConnection = async (type) => {
    setIsSaving(true)
    setSaveMessage('')

    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      setSaveMessage(`${type} connection test successful! ✅`)
      setTimeout(() => setSaveMessage(''), 3000)
    } catch (error) {
      setSaveMessage(`${type} connection test failed. Please check your settings.`)
    } finally {
      setIsSaving(false)
    }
  }

  const sections = [
    { id: 'mpesa', name: 'M-Pesa API', icon: '💳', description: 'Payment gateway settings' },
    { id: 'sms', name: 'SMS API', icon: '📱', description: 'SMS notifications' },
    { id: 'telegram', name: 'Telegram API', icon: '📢', description: 'Bot and channel settings' },
    { id: 'general', name: 'General', icon: '⚙️', description: 'Site configuration' },
    { id: 'documentation', name: 'Documentation', icon: '📚', description: 'Setup guides & help' }
  ]

  return (
    <div className="space-y-6">
      {/* Settings Navigation */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`p-4 rounded-xl border-2 transition-all text-left ${
              activeSection === section.id
                ? 'border-purple-500 bg-purple-50 text-purple-700'
                : 'border-gray-200 bg-white hover:border-gray-300 text-gray-700'
            }`}
          >
            <div className="flex items-center mb-2">
              <span className="text-2xl mr-3">{section.icon}</span>
              <h3 className="font-semibold">{section.name}</h3>
            </div>
            <p className="text-sm opacity-75">{section.description}</p>
          </button>
        ))}
      </div>

      {/* Save Message */}
      {saveMessage && (
        <div className={`p-4 rounded-lg ${
          saveMessage.includes('Error') || saveMessage.includes('failed')
            ? 'bg-red-50 border border-red-200 text-red-700'
            : 'bg-green-50 border border-green-200 text-green-700'
        }`}>
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {saveMessage.includes('Error') || saveMessage.includes('failed') ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              )}
            </svg>
            {saveMessage}
          </div>
        </div>
      )}

      {/* Settings Content */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        {/* M-Pesa Settings */}
        {activeSection === 'mpesa' && (
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-4">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <span className="text-3xl mr-3">💳</span>
                M-Pesa API Configuration
              </h2>
              <p className="text-gray-600 mt-1">Configure Safaricom M-Pesa Daraja API settings</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Consumer Key
                </label>
                <input
                  type="text"
                  value={mpesaSettings.consumerKey}
                  onChange={(e) => setMpesaSettings({...mpesaSettings, consumerKey: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Enter M-Pesa Consumer Key"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Consumer Secret
                </label>
                <input
                  type="password"
                  value={mpesaSettings.consumerSecret}
                  onChange={(e) => setMpesaSettings({...mpesaSettings, consumerSecret: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Enter M-Pesa Consumer Secret"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business Short Code
                </label>
                <input
                  type="text"
                  value={mpesaSettings.businessShortCode}
                  onChange={(e) => setMpesaSettings({...mpesaSettings, businessShortCode: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="e.g., 174379"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Passkey
                </label>
                <input
                  type="password"
                  value={mpesaSettings.passkey}
                  onChange={(e) => setMpesaSettings({...mpesaSettings, passkey: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Enter M-Pesa Passkey"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Environment
                </label>
                <select
                  value={mpesaSettings.environment}
                  onChange={(e) => setMpesaSettings({...mpesaSettings, environment: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value="sandbox">Sandbox (Testing)</option>
                  <option value="production">Production (Live)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Callback URL
                </label>
                <input
                  type="url"
                  value={mpesaSettings.callbackUrl}
                  onChange={(e) => setMpesaSettings({...mpesaSettings, callbackUrl: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="https://yourdomain.com/api/mpesa/callback"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => handleSave('mpesa')}
                disabled={isSaving}
                className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving ? 'Saving...' : 'Save M-Pesa Settings'}
              </button>
              <button
                onClick={() => testConnection('M-Pesa')}
                disabled={isSaving}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Test Connection
              </button>
            </div>
          </div>
        )}

        {/* SMS Settings */}
        {activeSection === 'sms' && (
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-4">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <span className="text-3xl mr-3">📱</span>
                SMS API Configuration
              </h2>
              <p className="text-gray-600 mt-1">Configure SMS notifications and alerts</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  SMS Provider
                </label>
                <select
                  value={smsSettings.provider}
                  onChange={(e) => setSmsSettings({...smsSettings, provider: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value="africastalking">Africa's Talking</option>
                  <option value="twilio">Twilio</option>
                  <option value="nexmo">Nexmo/Vonage</option>
                  <option value="clickatell">Clickatell</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  API Key
                </label>
                <input
                  type="password"
                  value={smsSettings.apiKey}
                  onChange={(e) => setSmsSettings({...smsSettings, apiKey: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Enter SMS API Key"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  value={smsSettings.username}
                  onChange={(e) => setSmsSettings({...smsSettings, username: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Enter SMS Username"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sender ID
                </label>
                <input
                  type="text"
                  value={smsSettings.senderId}
                  onChange={(e) => setSmsSettings({...smsSettings, senderId: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="ForexClass"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => handleSave('sms')}
                disabled={isSaving}
                className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving ? 'Saving...' : 'Save SMS Settings'}
              </button>
              <button
                onClick={() => testConnection('SMS')}
                disabled={isSaving}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Send Test SMS
              </button>
            </div>
          </div>
        )}

        {/* Telegram Settings */}
        {activeSection === 'telegram' && (
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-4">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <span className="text-3xl mr-3">📢</span>
                Telegram API Configuration
              </h2>
              <p className="text-gray-600 mt-1">Configure Telegram bot and channel settings</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bot Token
                </label>
                <input
                  type="password"
                  value={telegramSettings.botToken}
                  onChange={(e) => setTelegramSettings({...telegramSettings, botToken: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="1234567890:ABCDEFGHIJKLMNOPQRSTUVWXYZ"
                />
                <p className="text-xs text-gray-500 mt-1">Get from @BotFather on Telegram</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Channel ID
                </label>
                <input
                  type="text"
                  value={telegramSettings.channelId}
                  onChange={(e) => setTelegramSettings({...telegramSettings, channelId: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="-1001234567890"
                />
                <p className="text-xs text-gray-500 mt-1">Channel ID (starts with -100)</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Channel Username
                </label>
                <input
                  type="text"
                  value={telegramSettings.channelUsername}
                  onChange={(e) => setTelegramSettings({...telegramSettings, channelUsername: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="@ForexClassSignals"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Admin Chat ID
                </label>
                <input
                  type="text"
                  value={telegramSettings.adminChatId}
                  onChange={(e) => setTelegramSettings({...telegramSettings, adminChatId: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="123456789"
                />
                <p className="text-xs text-gray-500 mt-1">Your Telegram user ID for notifications</p>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Webhook URL
                </label>
                <input
                  type="url"
                  value={telegramSettings.webhookUrl}
                  onChange={(e) => setTelegramSettings({...telegramSettings, webhookUrl: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="https://yourdomain.com/api/telegram/webhook"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Welcome Message
                </label>
                <textarea
                  value={telegramSettings.welcomeMessage}
                  onChange={(e) => setTelegramSettings({...telegramSettings, welcomeMessage: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Welcome message for new members"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Removal Message
                </label>
                <textarea
                  value={telegramSettings.removeMessage}
                  onChange={(e) => setTelegramSettings({...telegramSettings, removeMessage: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Message sent when removing users"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => handleSave('telegram')}
                disabled={isSaving}
                className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving ? 'Saving...' : 'Save Telegram Settings'}
              </button>
              <button
                onClick={() => testConnection('Telegram')}
                disabled={isSaving}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Test Bot Connection
              </button>
            </div>
          </div>
        )}

        {/* General Settings */}
        {activeSection === 'general' && (
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-4">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <span className="text-3xl mr-3">⚙️</span>
                General Configuration
              </h2>
              <p className="text-gray-600 mt-1">Configure general site settings and preferences</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Site Name
                </label>
                <input
                  type="text"
                  value={generalSettings.siteName}
                  onChange={(e) => setGeneralSettings({...generalSettings, siteName: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="ForexClass"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Support Email
                </label>
                <input
                  type="email"
                  value={generalSettings.supportEmail}
                  onChange={(e) => setGeneralSettings({...generalSettings, supportEmail: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="support@forexclass.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Default Currency
                </label>
                <select
                  value={generalSettings.currency}
                  onChange={(e) => setGeneralSettings({...generalSettings, currency: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value="USD">USD - US Dollar</option>
                  <option value="KES">KES - Kenyan Shilling</option>
                  <option value="EUR">EUR - Euro</option>
                  <option value="GBP">GBP - British Pound</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Timezone
                </label>
                <select
                  value={generalSettings.timezone}
                  onChange={(e) => setGeneralSettings({...generalSettings, timezone: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value="Africa/Nairobi">Africa/Nairobi (EAT)</option>
                  <option value="UTC">UTC</option>
                  <option value="America/New_York">America/New_York (EST)</option>
                  <option value="Europe/London">Europe/London (GMT)</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">Maintenance Mode</h4>
                      <p className="text-sm text-gray-600">Temporarily disable site access for maintenance</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={generalSettings.maintenanceMode}
                        onChange={(e) => setGeneralSettings({...generalSettings, maintenanceMode: e.target.checked})}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">User Registration</h4>
                      <p className="text-sm text-gray-600">Allow new users to register on the platform</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={generalSettings.registrationEnabled}
                        onChange={(e) => setGeneralSettings({...generalSettings, registrationEnabled: e.target.checked})}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => handleSave('general')}
                disabled={isSaving}
                className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving ? 'Saving...' : 'Save General Settings'}
              </button>
            </div>
          </div>
        )}

        {/* Documentation Tab */}
        {activeSection === 'documentation' && (
          <APIDocumentation />
        )}
      </div>
    </div>
  )
}

export default AdminSettings
