import React from 'react'
import { useNavigate } from 'react-router-dom'
import 'remixicon/fonts/remixicon.css'

const CategoryCard = ({ cat, placesCount }) => {
  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate(`/states?category=${cat.id.toLowerCase()}`)}
      className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer group"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={cat.image}
          alt={cat.title}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className={`absolute top-4 left-4 bg-gradient-to-r ${cat.gradient} text-white text-xs font-bold px-3 py-1.5 rounded-full`}>
          {placesCount} Places
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className={`w-14 h-14 ${cat.bg} border ${cat.border} rounded-2xl flex items-center justify-center mb-4`}>
          <i className={`${cat.icon} text-3xl ${cat.color}`}></i>
        </div>
        <h3 className="text-xl font-extrabold text-gray-900 mb-1">{cat.title}</h3>
        <p className={`text-sm font-semibold ${cat.color} mb-3`}>{cat.subtitle}</p>
        <p className="text-gray-500 text-sm leading-relaxed mb-5">{cat.description}</p>

        <div className={`flex items-center gap-2 text-sm font-bold bg-gradient-to-r ${cat.gradient} bg-clip-text text-transparent`}>
          Explore {cat.title} Places <i className="ri-arrow-right-line text-orange-500"></i>
        </div>
      </div>
    </div>
  )
}

export default CategoryCard