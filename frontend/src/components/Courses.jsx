import React from 'react'

const Courses = () => {
  const courses = [
    {
      id: 1,
      title: "Crypto Trading Fundamentals",
      description: "Learn the basics of cryptocurrency trading, market analysis, and risk management from expert traders.",
      price: "$99",
      originalPrice: "$149",
      duration: "8 hours",
      lessons: "24 lessons",
      level: "Beginner",
      rating: 4.8,
      students: 1234,
      image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=400&h=250&fit=crop&crop=center",
      features: ["Lifetime access", "Certificate", "Mobile access", "Community support"]
    },
    {
      id: 2,
      title: "Advanced Forex Strategies",
      description: "Master advanced forex trading techniques, professional strategies, and institutional trading methods.",
      price: "$149",
      originalPrice: "$199",
      duration: "12 hours",
      lessons: "36 lessons",
      level: "Advanced",
      rating: 4.9,
      students: 856,
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=250&fit=crop&crop=center",
      features: ["Lifetime access", "Certificate", "1-on-1 mentoring", "Advanced strategies"]
    },
    {
      id: 3,
      title: "Technical Analysis Mastery",
      description: "Deep dive into technical analysis, chart patterns, trading indicators, and market psychology.",
      price: "$129",
      originalPrice: "$179",
      duration: "10 hours",
      lessons: "30 lessons",
      level: "Intermediate",
      rating: 4.7,
      students: 967,
      image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=400&h=250&fit=crop&crop=center",
      features: ["Lifetime access", "Certificate", "Trading tools", "Market analysis"]
    }
  ]

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="courses" className="py-12 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Our Premium Courses</h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Choose from our comprehensive trading education programs designed by industry experts
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {courses.map((course) => (
            <div key={course.id} className="card hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="relative">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-40 sm:h-48 object-cover rounded-lg mb-4"
                />
                <div className="absolute top-3 left-3">
                  <span className="bg-blue-600 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                    {course.level}
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <span className="bg-white text-gray-800 px-2 py-1 rounded text-xs sm:text-sm font-medium shadow">
                    ⭐ {course.rating}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900">{course.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{course.description}</p>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs sm:text-sm text-gray-500">
                  <span>📚 {course.lessons}</span>
                  <span>⏱️ {course.duration}</span>
                  <span>👥 {course.students} students</span>
                </div>

                <div className="space-y-2">
                  {course.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-blue-600">{course.price}</span>
                    <span className="text-lg text-gray-400 line-through">{course.originalPrice}</span>
                  </div>
                  <button 
                    onClick={() => scrollToSection('pricing')}
                    className="btn-primary"
                  >
                    Enroll Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button 
            onClick={() => scrollToSection('pricing')}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 px-8 rounded-lg text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
          >
            Get Access to All Courses
          </button>
        </div>
      </div>
    </section>
  )
}

export default Courses
