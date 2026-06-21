import React from 'react'
import 'remixicon/fonts/remixicon.css'

const categories = ["All", "Heritage", "Nature", "Adventure", "Religious", "Culture"]

const DestinationsFilter = ({ search, setSearch, activeCategory, setActiveCategory, sortBy, setSortBy }) => {
  return (
    <div className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">

          {/* Search */}
          <div className="relative w-full sm:w-80">
            <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
            <input
              type="text"
              placeholder="Search destinations, states..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs"
              >
                ✕
              </button>
            )}
          </div>

          {/* Category Pills */}
          <div className="flex gap-2 flex-wrap justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  activeCategory === cat
                    ? "bg-orange-500 text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-orange-50 hover:text-orange-500"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-sm border border-gray-300 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-orange-400 cursor-pointer bg-white text-gray-700"
          >
            <option value="rating">Sort: Top Rated</option>
            <option value="name">Sort: A–Z</option>
          </select>
        </div>
      </div>
    </div>
  )
}

export default DestinationsFilter