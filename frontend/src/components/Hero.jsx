import React from 'react'

const Hero = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="hero" className="relative bg-gradient-to-r from-blue-600 to-purple-700 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Master Crypto & Forex Trading
          </h1>
          <p className="text-lg sm:text-xl text-blue-100 mb-6 max-w-3xl mx-auto leading-relaxed">
            Learn from expert traders with our comprehensive courses and get exclusive access to premium Telegram signals.
          </p>

          {/* Telegram Channel Highlight */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 mb-8 max-w-2xl mx-auto border border-white/20">
            <div className="flex items-center justify-center mb-3">
              <svg className="w-8 h-8 text-white mr-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.374 0 0 5.373 0 12s5.374 12 12 12 12-5.373 12-12S18.626 0 12 0zm5.568 8.16c-.169 1.858-.896 6.728-.896 6.728-.377 2.655-.377 2.655-1.377 2.655-.896 0-1.377-.896-1.377-2.655 0 0-.727-4.87-.896-6.728-.169-1.858.727-2.655 1.858-2.655s2.027.797 1.858 2.655z"/>
              </svg>
              <h3 className="text-xl sm:text-2xl font-bold text-white">Join Our Private Telegram Channel</h3>
            </div>
            <p className="text-blue-100 text-sm sm:text-base mb-4">
              🎯 Get real-time trading signals • 📊 Daily market analysis • 💬 Direct access to expert traders
            </p>
            <div className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-bold inline-block">
              ✅ Automatic Access with Premium Subscription
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => scrollToSection('courses')}
              className="w-full sm:w-auto bg-white text-blue-600 hover:bg-gray-100 font-bold py-3 px-6 sm:px-8 rounded-lg text-lg transition-colors"
            >
              Browse Courses
            </button>
            <button
              onClick={() => scrollToSection('pricing')}
              className="w-full sm:w-auto border-2 border-white text-white hover:bg-white hover:text-blue-600 font-bold py-3 px-6 sm:px-8 rounded-lg text-lg transition-colors"
            >
              Join Telegram Channel
            </button>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <button 
          onClick={() => scrollToSection('features')}
          className="text-white hover:text-blue-200 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>
      </div>
    </section>
  )
}

export default Hero
