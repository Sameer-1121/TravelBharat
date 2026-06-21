import React from 'react'
import { useNavigate } from 'react-router-dom'
import 'remixicon/fonts/remixicon.css'

const DestinationCard = ({ place, isLiked, onToggleLike }) => {
  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate(`/place/${place.id}`)}
      className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
    >
      {/* Image */}
      <div className="relative overflow-hidden h-48">
        <img
          src={place.image}
          alt={place.name}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
          onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&q=80" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

        <span className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
          {place.category}
        </span>

        <div className="absolute top-3 right-3 bg-white/90 rounded-full px-2 py-1 flex items-center gap-1">
          <i className="ri-star-fill text-yellow-400 text-xs"></i>
          <span className="text-xs font-bold">{place.rating}</span>
        </div>

        <button
          onClick={(e) => onToggleLike(place.id, e)}
          className={`absolute bottom-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition ${
            isLiked ? 'bg-red-500 text-white' : 'bg-white/80 text-gray-700 hover:bg-red-500 hover:text-white'
          }`}
        >
          <i className={`text-sm ${isLiked ? 'ri-heart-fill' : 'ri-heart-line'}`}></i>
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-base font-bold text-gray-900 mb-1">{place.name}</h3>
        <div className="flex items-center gap-1 text-gray-500 text-xs mb-2">
          <i className="ri-map-pin-line text-orange-400"></i>
          <span>{place.city}, {place.stateName}</span>
        </div>
        <p className="text-gray-500 text-xs leading-relaxed line-clamp-2 mb-3">{place.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <i className="ri-time-line text-orange-400"></i>
            <span>{place.bestTime}</span>
          </div>
          <span className="text-orange-500 text-xs font-bold">View Details →</span>
        </div>
      </div>
    </div>
  )
}

export default DestinationCard