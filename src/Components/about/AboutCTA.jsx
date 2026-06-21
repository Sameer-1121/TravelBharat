import React from 'react'
import { useNavigate } from 'react-router-dom'

const AboutCTA = () => {
  const navigate = useNavigate()

  return (
    <div className="bg-[#0B1736] py-14 text-center">
      <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
        Ready to Explore Incredible India?
      </h2>
      <p className="text-gray-400 mb-6 max-w-lg mx-auto text-sm">
        Join thousands of travelers who use TravelBharat to plan their perfect Indian adventure.
      </p>
      <div className="flex gap-4 justify-center flex-wrap">
        <button
          onClick={() => navigate('/states')}
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3 rounded-full transition"
        >
          Explore States →
        </button>
        <button
          onClick={() => navigate('/contact')}
          className="border-2 border-white/20 hover:border-orange-500 text-white font-bold px-8 py-3 rounded-full transition"
        >
          Contact Us
        </button>
      </div>
    </div>
  )
}

export default AboutCTA