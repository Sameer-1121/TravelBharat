import React from 'react'
import { useNavigate } from 'react-router-dom'
import 'remixicon/fonts/remixicon.css'

const stats = [
  { icon: "ri-map-pin-2-fill",    value: "28+",  label: "States & UTs"    },
  { icon: "ri-building-4-fill",   value: "800+", label: "Destinations"    },
  { icon: "ri-group-fill",        value: "50K+", label: "Happy Travelers" },
  { icon: "ri-shield-check-fill", value: "95%+", label: "Verified Content"},
]

const MissionSection = () => {
  const navigate = useNavigate()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* Text */}
        <div>
          <p className="text-orange-500 font-semibold text-sm uppercase tracking-widest mb-3">
            Our Mission
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
            Making India's Tourism <span className="text-orange-500">Accessible to All</span>
          </h2>
          <p className="text-gray-600 leading-8 mb-4">
            TravelBharat was created with a simple but powerful mission — to provide a single, reliable platform where anyone can discover the beauty, culture, and heritage of every corner of India.
          </p>
          <p className="text-gray-600 leading-8 mb-6">
            Whether you're planning a family vacation, a solo adventure, a pilgrimage, or a student project — TravelBharat gives you everything you need: state-wise destination listings, accurate travel details, images, entry fees, timings, and nearby attractions.
          </p>
          <button
            onClick={() => navigate('/states')}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3 rounded-full transition flex items-center gap-2"
          >
            Start Exploring <i className="ri-arrow-right-line"></i>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center hover:shadow-md transition">
              <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center mx-auto mb-3">
                <i className={`${stat.icon} text-orange-500 text-2xl`}></i>
              </div>
              <div className="text-3xl font-extrabold text-gray-900">{stat.value}</div>
              <div className="text-gray-500 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MissionSection