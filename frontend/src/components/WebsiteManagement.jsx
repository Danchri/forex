import React, { useState } from 'react'

const WebsiteManagement = () => {
  const [activeSection, setActiveSection] = useState('hero')
  const [isSaving, setIsSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState('')

  // Website content state
  const [heroContent, setHeroContent] = useState({
    title: 'Master Forex Trading with Expert Guidance',
    subtitle: 'Join thousands of successful traders who have transformed their financial future with our comprehensive forex education platform.',
    ctaText: 'Start Your Trading Journey',
    backgroundImage: '/hero-bg.jpg',
    videoUrl: 'https://youtube.com/watch?v=example'
  })

  const [featuresContent, setFeaturesContent] = useState({
    title: 'Why Choose ForexClass?',
    subtitle: 'Everything you need to become a successful forex trader',
    features: [
      {
        title: 'Expert Instructors',
        description: 'Learn from professional traders with years of market experience',
        icon: '👨‍🏫'
      },
      {
        title: 'Live Trading Sessions',
        description: 'Join real-time trading sessions and see strategies in action',
        icon: '📈'
      },
      {
        title: 'Private Telegram Channel',
        description: 'Get exclusive trading signals and market analysis daily',
        icon: '📱'
      }
    ]
  })

  const [coursesContent, setCoursesContent] = useState({
    title: 'Comprehensive Trading Courses',
    subtitle: 'From beginner to advanced, we have courses for every level',
    courses: [
      {
        title: 'Forex Fundamentals',
        description: 'Master the basics of forex trading, market analysis, and risk management',
        duration: '4 weeks',
        level: 'Beginner',
        image: '/course1.jpg'
      },
      {
        title: 'Technical Analysis Mastery',
        description: 'Advanced chart patterns, indicators, and trading strategies',
        duration: '6 weeks',
        level: 'Intermediate',
        image: '/course2.jpg'
      }
    ]
  })

  const [contactContent, setContactContent] = useState({
    title: 'Get in Touch',
    subtitle: 'Have questions? We\'re here to help you succeed',
    email: 'support@forexclass.com',
    phone: '+254 700 000 000',
    address: 'Nairobi, Kenya',
    socialLinks: {
      telegram: '@ForexClassSignals',
      twitter: '@ForexClass',
      instagram: '@forexclass_official'
    }
  })

  const handleSave = async (section) => {
    setIsSaving(true)
    setSaveMessage('')

    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      let contentData
      switch (section) {
        case 'hero':
          contentData = heroContent
          break
        case 'features':
          contentData = featuresContent
          break
        case 'courses':
          contentData = coursesContent
          break
        case 'contact':
          contentData = contactContent
          break
        default:
          contentData = {}
      }

      console.log(`Saving ${section} content:`, contentData)
      setSaveMessage(`${section.toUpperCase()} section updated successfully!`)
      
      setTimeout(() => setSaveMessage(''), 3000)
    } catch (error) {
      setSaveMessage(`Error updating ${section} section. Please try again.`)
    } finally {
      setIsSaving(false)
    }
  }

  const sections = [
    { id: 'hero', name: 'Hero Section', icon: '🏠', description: 'Main landing section' },
    { id: 'features', name: 'Features', icon: '⭐', description: 'Platform features' },
    { id: 'courses', name: 'Courses', icon: '📚', description: 'Course listings' },
    { id: 'contact', name: 'Contact', icon: '📞', description: 'Contact information' }
  ]

  return (
    <div className="space-y-6">
      {/* Section Navigation */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`p-4 rounded-xl border-2 transition-all text-left ${
              activeSection === section.id
                ? 'border-blue-500 bg-blue-50 text-blue-700'
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
          saveMessage.includes('Error')
            ? 'bg-red-50 border border-red-200 text-red-700'
            : 'bg-green-50 border border-green-200 text-green-700'
        }`}>
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {saveMessage.includes('Error') ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              )}
            </svg>
            {saveMessage}
          </div>
        </div>
      )}

      {/* Content Editor */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        {/* Hero Section */}
        {activeSection === 'hero' && (
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-4">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <span className="text-3xl mr-3">🏠</span>
                Hero Section Content
              </h2>
              <p className="text-gray-600 mt-1">Edit the main landing section content</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Main Title
                </label>
                <input
                  type="text"
                  value={heroContent.title}
                  onChange={(e) => setHeroContent({...heroContent, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter main title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subtitle
                </label>
                <textarea
                  value={heroContent.subtitle}
                  onChange={(e) => setHeroContent({...heroContent, subtitle: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter subtitle description"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Call-to-Action Text
                  </label>
                  <input
                    type="text"
                    value={heroContent.ctaText}
                    onChange={(e) => setHeroContent({...heroContent, ctaText: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Button text"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Background Image URL
                  </label>
                  <input
                    type="url"
                    value={heroContent.backgroundImage}
                    onChange={(e) => setHeroContent({...heroContent, backgroundImage: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Image URL"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Intro Video URL (Optional)
                </label>
                <input
                  type="url"
                  value={heroContent.videoUrl}
                  onChange={(e) => setHeroContent({...heroContent, videoUrl: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="YouTube or Vimeo URL"
                />
              </div>
            </div>

            <button
              onClick={() => handleSave('hero')}
              disabled={isSaving}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? 'Saving...' : 'Save Hero Section'}
            </button>
          </div>
        )}

        {/* Features Section */}
        {activeSection === 'features' && (
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-4">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <span className="text-3xl mr-3">⭐</span>
                Features Section Content
              </h2>
              <p className="text-gray-600 mt-1">Edit platform features and benefits</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Section Title
                </label>
                <input
                  type="text"
                  value={featuresContent.title}
                  onChange={(e) => setFeaturesContent({...featuresContent, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Section Subtitle
                </label>
                <input
                  type="text"
                  value={featuresContent.subtitle}
                  onChange={(e) => setFeaturesContent({...featuresContent, subtitle: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Features
                </label>
                {featuresContent.features.map((feature, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4">
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Icon</label>
                        <input
                          type="text"
                          value={feature.icon}
                          onChange={(e) => {
                            const newFeatures = [...featuresContent.features]
                            newFeatures[index].icon = e.target.value
                            setFeaturesContent({...featuresContent, features: newFeatures})
                          }}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                          placeholder="📈"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Title</label>
                        <input
                          type="text"
                          value={feature.title}
                          onChange={(e) => {
                            const newFeatures = [...featuresContent.features]
                            newFeatures[index].title = e.target.value
                            setFeaturesContent({...featuresContent, features: newFeatures})
                          }}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Description</label>
                        <textarea
                          value={feature.description}
                          onChange={(e) => {
                            const newFeatures = [...featuresContent.features]
                            newFeatures[index].description = e.target.value
                            setFeaturesContent({...featuresContent, features: newFeatures})
                          }}
                          rows={2}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => handleSave('features')}
              disabled={isSaving}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? 'Saving...' : 'Save Features Section'}
            </button>
          </div>
        )}

        {/* Contact Section */}
        {activeSection === 'contact' && (
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-4">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <span className="text-3xl mr-3">📞</span>
                Contact Section Content
              </h2>
              <p className="text-gray-600 mt-1">Edit contact information and social links</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Section Title
                  </label>
                  <input
                    type="text"
                    value={contactContent.title}
                    onChange={(e) => setContactContent({...contactContent, title: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subtitle
                  </label>
                  <input
                    type="text"
                    value={contactContent.subtitle}
                    onChange={(e) => setContactContent({...contactContent, subtitle: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={contactContent.email}
                    onChange={(e) => setContactContent({...contactContent, email: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={contactContent.phone}
                    onChange={(e) => setContactContent({...contactContent, phone: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    value={contactContent.address}
                    onChange={(e) => setContactContent({...contactContent, address: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Telegram Channel
                  </label>
                  <input
                    type="text"
                    value={contactContent.socialLinks.telegram}
                    onChange={(e) => setContactContent({
                      ...contactContent,
                      socialLinks: {...contactContent.socialLinks, telegram: e.target.value}
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="@ForexClassSignals"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={() => handleSave('contact')}
              disabled={isSaving}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? 'Saving...' : 'Save Contact Section'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default WebsiteManagement
