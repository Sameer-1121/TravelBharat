import React, { useState, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { usePlacesStore } from '../components/hooks/PlacesDataContext'
import 'remixicon/fonts/remixicon.css'

const categories = ["All", "Heritage", "Nature", "Adventure", "Religious", "Culture"]

const StatePage = () => {
  const { stateId } = useParams()
  const navigate = useNavigate()
  const { places: allPlaces, statesInfo } = usePlacesStore()
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState("All")
  const [search, setSearch] = useState("")

  const stateInfo = statesInfo[stateId] || {
    name: stateId?.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
    tagline: "Explore the beauty",
    image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1600&q=80"
  }

  const places = useMemo(() => {
    return allPlaces.filter(p => {
      const matchState = p.state === stateId
      const matchCat = activeCategory === "All" || p.category === activeCategory
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
                          p.city.toLowerCase().includes(search.toLowerCase())
      return matchState && matchCat && matchSearch
    })
  }, [allPlaces, stateId, activeCategory, search])

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── NAVBAR + HERO ── */}
      <div
        className="w-full min-h-[80vh] bg-cover bg-center relative overflow-hidden"
        style={{ backgroundImage: `url(${stateInfo.image})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />

        {/* NAVBAR */}
        <div className="relative z-10 w-full flex items-center justify-between px-5 md:px-10 py-5 text-white">
          <div className="cursor-pointer" onClick={() => navigate('/')}>
            <h1 className="text-2xl md:text-4xl font-bold">
              <i className="ri-map-pin-line mr-2"></i>
              Travel<span className="text-orange-500">Bharat</span>
            </h1>
            <p className="text-[10px] md:text-xs ml-2">EXPLORE INDIA STATE BY STATE</p>
          </div>

          <div className="hidden lg:flex gap-10 font-semibold">
            <span onClick={() => navigate('/')} className="hover:text-orange-400 transition cursor-pointer">Home</span>
            <span onClick={() => navigate('/states')} className="text-orange-400 border-b-2 border-orange-400 pb-1 cursor-pointer">States</span>
            <span onClick={() => navigate('/categories')} className="hover:text-orange-400 transition cursor-pointer">Categories</span>
            <span onClick={() => navigate('/destinations')} className="hover:text-orange-400 transition cursor-pointer">Destinations</span>
            <span onClick={() => navigate('/about')} className="hover:text-orange-400 transition cursor-pointer">About Us</span>
            <span onClick={() => navigate('/contact')} className="hover:text-orange-400 transition cursor-pointer">Contact</span>
          </div>

          <div className="hidden md:flex gap-4">
            <div className="bg-white text-black rounded-full w-11 h-11 flex items-center justify-center cursor-pointer hover:scale-110 transition">
              <i className="ri-moon-line"></i>
            </div>
            <div className="bg-white text-orange-500 rounded-full w-11 h-11 flex items-center justify-center cursor-pointer hover:scale-110 transition">
              <i className="ri-search-line"></i>
            </div>
          </div>
          <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden text-3xl text-white">
            <i className={menuOpen ? "ri-close-line" : "ri-menu-line"}></i>
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="relative z-10 lg:hidden bg-black/95 px-6 py-6 flex flex-col gap-5 text-white text-lg font-semibold">
            <span onClick={() => { navigate('/'); setMenuOpen(false) }} className="hover:text-orange-400 cursor-pointer">Home</span>
            <span onClick={() => { navigate('/states'); setMenuOpen(false) }} className="text-orange-400 cursor-pointer">States</span>
            <span onClick={() => { navigate('/categories'); setMenuOpen(false) }} className="hover:text-orange-400 cursor-pointer">Categories</span>
            <span onClick={() => { navigate('/destinations'); setMenuOpen(false) }} className="hover:text-orange-400 cursor-pointer">Destinations</span>
            <span onClick={() => { navigate('/about'); setMenuOpen(false) }} className="hover:text-orange-400 cursor-pointer">About Us</span>
            <span onClick={() => { navigate('/contact'); setMenuOpen(false) }} className="hover:text-orange-400 cursor-pointer">Contact</span>
          </div>
        )}

        {/* Hero Content */}
        <div className="relative z-10 flex items-center h-[60vh] px-5 md:px-10 lg:px-16">
          <div className="text-white max-w-2xl">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-gray-300 mb-4">
              <span onClick={() => navigate('/')} className="hover:text-orange-400 cursor-pointer">Home</span>
              <i className="ri-arrow-right-s-line"></i>
              <span onClick={() => navigate('/states')} className="hover:text-orange-400 cursor-pointer">States</span>
              <i className="ri-arrow-right-s-line"></i>
              <span className="text-orange-400">{stateInfo.name}</span>
            </div>

            <h2 className="text-xl md:text-2xl text-orange-400 font-semibold mb-3">
              {stateInfo.tagline}
            </h2>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-4">
              {stateInfo.name.toUpperCase()}
            </h1>
            <p className="text-gray-300 text-sm md:text-base leading-7 max-w-lg mb-6">
              Explore the most beautiful destinations, heritage sites, and natural wonders of {stateInfo.name}.
            </p>
            <div className="flex gap-6">
              <div>
                <div className="text-3xl font-extrabold text-orange-500">{places.length}+</div>
                <div className="text-gray-400 text-xs mt-1">Destinations</div>
              </div>
              <div>
                <div className="text-3xl font-extrabold text-orange-500">{[...new Set(places.map(p => p.city))].length}+</div>
                <div className="text-gray-400 text-xs mt-1">Cities</div>
              </div>
              <div>
                <div className="text-3xl font-extrabold text-orange-500">{[...new Set(places.map(p => p.category))].length}+</div>
                <div className="text-gray-400 text-xs mt-1">Categories</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── FILTER BAR ── */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">

            {/* Search */}
            <div className="relative w-full sm:w-72">
              <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
              <input
                type="text"
                placeholder="Search places, cities..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm"
              />
              {search && (
                <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs">✕</button>
              )}
            </div>

            {/* Category Pills */}
            <div className="flex gap-2 flex-wrap justify-center">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                    activeCategory === cat
                      ? "bg-orange-500 text-white shadow-md"
                      : "bg-gray-100 text-gray-600 hover:bg-orange-50 hover:text-orange-500"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Back Button */}
            <button
              onClick={() => navigate('/states')}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-orange-500 transition font-semibold"
            >
              <i className="ri-arrow-left-line"></i> All States
            </button>
          </div>
        </div>
      </div>

      {/* ── PLACES GRID ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-500 text-sm">
            Showing <span className="font-bold text-gray-800">{places.length}</span> places in{" "}
            <span className="font-bold text-orange-500">{stateInfo.name}</span>
          </p>
          {(search || activeCategory !== "All") && (
            <button
              onClick={() => { setSearch(""); setActiveCategory("All") }}
              className="text-xs text-orange-500 hover:text-orange-700 font-semibold underline underline-offset-2"
            >
              Clear filters
            </button>
          )}
        </div>

        {places.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {places.map(place => (
              <div
                key={place.id}
                onClick={() => navigate(`/place/${place.id}`)}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
              >
                {/* Image */}
                <div className="relative overflow-hidden h-52">
                  <img
                    src={place.image}
                    alt={place.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                    onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&q=80" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                  {/* Category Badge */}
                  <span className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                    {place.category}
                  </span>

                  {/* Rating Badge */}
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
                    <i className="ri-star-fill text-yellow-400 text-xs"></i>
                    <span className="text-xs font-bold">{place.rating}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{place.name}</h3>
                  <div className="flex items-center gap-1 text-gray-500 text-sm mb-3">
                    <i className="ri-map-pin-line text-orange-400"></i>
                    <span>{place.city}, {place.stateName}</span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 mb-4">
                    {place.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <i className="ri-time-line text-orange-400"></i>
                      <span>{place.bestTime}</span>
                    </div>
                    <button className="text-orange-500 text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                      Explore <i className="ri-arrow-right-line"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <div className="text-6xl mb-4">🏔️</div>
            <h3 className="text-xl font-bold text-gray-700 mb-2">No places found</h3>
            <p className="text-gray-400 mb-6">Try a different search or category filter.</p>
            <button
              onClick={() => { setSearch(""); setActiveCategory("All") }}
              className="bg-orange-500 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-orange-600 transition"
            >
              Show All Places
            </button>
          </div>
        )}
      </div>

      {/* ── BOTTOM CTA ── */}
      <div className="bg-[#0f172a] mt-8 py-12 text-center">
        <p className="text-orange-400 font-semibold text-sm uppercase tracking-widest mb-2">Explore More</p>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">Discover Other States</h2>
        <p className="text-gray-400 mb-6 max-w-lg mx-auto text-sm">India has 28 states and 8 UTs — each with its own unique culture and beauty.</p>
        <button
          onClick={() => navigate('/states')}
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3 rounded-full transition-all"
        >
          View All States →
        </button>
      </div>

    </div>
  )
}

export default StatePage