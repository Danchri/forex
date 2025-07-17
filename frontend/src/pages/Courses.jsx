import React from 'react'

const Courses = () => {
  const courses = [
    {
      id: 1,
      title: "Crypto Trading Fundamentals",
      description: "Learn the basics of cryptocurrency trading, market analysis, and risk management.",
      price: "$99",
      duration: "8 hours",
      level: "Beginner",
      image: "https://via.placeholder.com/300x200?text=Crypto+Course"
    },
    {
      id: 2,
      title: "Advanced Forex Strategies",
      description: "Master advanced forex trading techniques and professional strategies.",
      price: "$149",
      duration: "12 hours",
      level: "Advanced",
      image: "https://via.placeholder.com/300x200?text=Forex+Course"
    },
    {
      id: 3,
      title: "Technical Analysis Mastery",
      description: "Deep dive into technical analysis, chart patterns, and trading indicators.",
      price: "$129",
      duration: "10 hours",
      level: "Intermediate",
      image: "https://via.placeholder.com/300x200?text=Technical+Analysis"
    }
  ]

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Courses</h1>
          <p className="text-lg text-gray-600">Choose from our comprehensive trading education programs</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div key={course.id} className="card hover:shadow-lg transition-shadow">
              <img 
                src={course.image} 
                alt={course.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">{course.level}</span>
                <span className="text-sm text-gray-500">{course.duration}</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
              <p className="text-gray-600 mb-4">{course.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-blue-600">{course.price}</span>
                <button className="btn-primary">Enroll Now</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Courses
