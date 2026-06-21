import React from 'react'
import DestinationCard from './DestinationCard'

const DestinationsGrid = ({ filtered, likedPlaces, onToggleLike, onClearFilters }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

      {/* Results count */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-gray-500 text-sm">
          Showing <span className="font-bold text-gray-800">{filtered.length}</span> destinations
        </p>
        {onClearFilters && (
          <button
            onClick={onClearFilters}
            className="text-xs text-orange-500 font-semibold underline"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Grid or Empty State */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((place) => (
            <DestinationCard
              key={place.id}
              place={place}
              isLiked={likedPlaces.includes(place.id)}
              onToggleLike={onToggleLike}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-24">
          <div className="text-6xl mb-4">🏔️</div>
          <h3 className="text-xl font-bold text-gray-700 mb-2">No destinations found</h3>
          <p className="text-gray-400 mb-6">Try a different search or category.</p>
          <button
            onClick={onClearFilters}
            className="bg-orange-500 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-orange-600 transition"
          >
            Show All
          </button>
        </div>
      )}
    </div>
  )
}

export default DestinationsGrid