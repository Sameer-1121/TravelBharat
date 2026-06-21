import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { usePlacesStore } from '../components/hooks/PlacesDataContext'
import Footer from '../components/Footer'
import 'remixicon/fonts/remixicon.css'

const PlaceDetail = () => {
  const { placeId } = useParams()
  const navigate = useNavigate()
  const { places } = usePlacesStore()
  const [menuOpen, setMenuOpen] = useState(false)
  const [liked, setLiked] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")

  const place = places.find(p => p.id === placeId)

  // Nearby places
  const nearbyPlaces = place
    ? places.filter(p => place.nearbyPlaces?.includes(p.id))
    : []

  if (!place) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="text-6xl mb-4">🗺️</div>
        <h2 className="text-2xl font-bold text-gray-700 mb-2">Place not found</h2>
        <p className="text-gray-400 mb-6">This destination doesn't exist in our database yet.</p>
        <button
          onClick={() => navigate('/states')}
          className="bg-orange-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-orange-600 transition"
        >
          Browse All States
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── HERO + NAVBAR ── */}
      <div
        className="w-full min-h-[75vh] bg-cover bg-center relative overflow-hidden"
        style={{ backgroundImage: `url(${place.image})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/20" />

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
            <span onClick={() => navigate('/')} className="hover:text-orange-400 cursor-pointer transition">Home</span>
            <span onClick={() => navigate('/states')} className="hover:text-orange-400 cursor-pointer transition">States</span>
            <span onClick={() => navigate('/categories')} className="hover:text-orange-400 cursor-pointer transition">Categories</span>
            <span onClick={() => navigate('/destinations')} className="text-orange-400 border-b-2 border-orange-400 pb-1 cursor-pointer">Destinations</span>
            <span onClick={() => navigate('/about')} className="hover:text-orange-400 cursor-pointer transition">About Us</span>
            <span onClick={() => navigate('/contact')} className="hover:text-orange-400 cursor-pointer transition">Contact</span>
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
            <span onClick={() => { navigate('/states'); setMenuOpen(false) }} className="hover:text-orange-400 cursor-pointer">States</span>
            <span onClick={() => { navigate('/categories'); setMenuOpen(false) }} className="hover:text-orange-400 cursor-pointer">Categories</span>
            <span onClick={() => { navigate('/destinations'); setMenuOpen(false) }} className="text-orange-400 cursor-pointer">Destinations</span>
            <span onClick={() => { navigate('/about'); setMenuOpen(false) }} className="hover:text-orange-400 cursor-pointer">About Us</span>
            <span onClick={() => { navigate('/contact'); setMenuOpen(false) }} className="hover:text-orange-400 cursor-pointer">Contact</span>
          </div>
        )}

        {/* Hero Content */}
        <div className="relative z-10 flex items-end h-[58vh] px-5 md:px-10 lg:px-16 pb-10">
          <div className="text-white max-w-3xl w-full">

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-gray-300 mb-4 flex-wrap">
              <span onClick={() => navigate('/')} className="hover:text-orange-400 cursor-pointer">Home</span>
              <i className="ri-arrow-right-s-line"></i>
              <span onClick={() => navigate('/states')} className="hover:text-orange-400 cursor-pointer">States</span>
              <i className="ri-arrow-right-s-line"></i>
              <span onClick={() => navigate(`/state/${place.state}`)} className="hover:text-orange-400 cursor-pointer">{place.stateName}</span>
              <i className="ri-arrow-right-s-line"></i>
              <span className="text-orange-400">{place.name}</span>
            </div>

            {/* Category Badge */}
            <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full mb-4 inline-block">
              {place.category}
            </span>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-3">
              {place.name}
            </h1>

            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-1 text-gray-300">
                <i className="ri-map-pin-line text-orange-400"></i>
                <span className="text-sm">{place.city}, {place.stateName}</span>
              </div>
              <div className="flex items-center gap-1">
                <i className="ri-star-fill text-yellow-400 text-sm"></i>
                <span className="text-white font-bold text-sm">{place.rating}</span>
                <span className="text-gray-400 text-xs">/ 5.0</span>
              </div>

              {/* Like Button */}
              <button
                onClick={() => setLiked(!liked)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold transition-all ${
                  liked ? 'bg-red-500 text-white' : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                <i className={liked ? "ri-heart-fill" : "ri-heart-line"}></i>
                {liked ? 'Saved' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* LEFT — Main Info */}
          <div className="lg:col-span-2">

            {/* Tabs */}
            <div className="flex gap-4 border-b border-gray-200 mb-6">
              {["overview", "details"].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-3 text-sm font-semibold capitalize transition-all ${
                    activeTab === tab
                      ? "text-orange-500 border-b-2 border-orange-500"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {activeTab === "overview" && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">About {place.name}</h2>
                <p className="text-gray-600 leading-8 text-base">{place.description}</p>

                {/* Quick Info Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                  {[
                    { icon: "ri-calendar-line",  label: "Best Time to Visit", value: place.bestTime },
                    { icon: "ri-money-rupee-circle-line", label: "Entry Fee", value: place.entryFee },
                    { icon: "ri-time-line",       label: "Timings",           value: place.timings },
                    { icon: "ri-map-pin-2-line",  label: "Location",          value: `${place.city}, ${place.stateName}` },
                  ].map((info, i) => (
                    <div key={i} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-start gap-3">
                      <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center flex-shrink-0">
                        <i className={`${info.icon} text-orange-500 text-lg`}></i>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 font-medium">{info.label}</p>
                        <p className="text-sm font-semibold text-gray-800 mt-0.5">{info.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "details" && (
              <div className="space-y-4">
                {[
                  { icon: "ri-calendar-line",  label: "Best Time to Visit", value: place.bestTime,   color: "bg-blue-50 text-blue-500"   },
                  { icon: "ri-money-rupee-circle-line", label: "Entry Fee", value: place.entryFee,  color: "bg-green-50 text-green-500" },
                  { icon: "ri-time-line",       label: "Opening Timings",   value: place.timings,    color: "bg-purple-50 text-purple-500"},
                  { icon: "ri-map-pin-2-line",  label: "City",              value: place.city,       color: "bg-orange-50 text-orange-500"},
                  { icon: "ri-map-2-line",      label: "State",             value: place.stateName,  color: "bg-red-50 text-red-500"     },
                  { icon: "ri-price-tag-3-line","label": "Category",        value: place.category,   color: "bg-yellow-50 text-yellow-500"},
                ].map((item, i) => (
                  <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${item.color.split(' ')[0]}`}>
                      <i className={`${item.icon} text-xl ${item.color.split(' ')[1]}`}></i>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-medium">{item.label}</p>
                      <p className="text-base font-semibold text-gray-800 mt-0.5">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Nearby Places */}
            {nearbyPlaces.length > 0 && (
              <div className="mt-10">
                <h2 className="text-xl font-bold text-gray-900 mb-1">Nearby Attractions</h2>
                <div className="w-10 h-[3px] bg-orange-500 rounded-full mb-5"></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {nearbyPlaces.map(nearby => (
                    <div
                      key={nearby.id}
                      onClick={() => navigate(`/place/${nearby.id}`)}
                      className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex cursor-pointer hover:shadow-md transition group"
                    >
                      <img
                        src={nearby.image}
                        alt={nearby.name}
                        className="w-24 h-24 object-cover flex-shrink-0 group-hover:scale-105 transition duration-300"
                        onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400&q=80" }}
                      />
                      <div className="p-3 flex flex-col justify-center">
                        <span className="text-xs text-orange-500 font-semibold">{nearby.category}</span>
                        <h4 className="font-bold text-gray-900 text-sm mt-0.5">{nearby.name}</h4>
                        <div className="flex items-center gap-1 mt-1">
                          <i className="ri-map-pin-line text-gray-400 text-xs"></i>
                          <span className="text-xs text-gray-500">{nearby.city}</span>
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                          <i className="ri-star-fill text-yellow-400 text-xs"></i>
                          <span className="text-xs font-semibold">{nearby.rating}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT — Sidebar */}
          <div className="space-y-5">

            {/* Quick Facts Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <i className="ri-information-line text-orange-500"></i> Quick Facts
              </h3>
              <div className="space-y-3">
                {[
                  { label: "Category",   value: place.category  },
                  { label: "City",       value: place.city       },
                  { label: "State",      value: place.stateName  },
                  { label: "Rating",     value: `⭐ ${place.rating} / 5.0` },
                  { label: "Best Time",  value: place.bestTime   },
                  { label: "Entry Fee",  value: place.entryFee   },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-start text-sm border-b border-gray-50 pb-2 last:border-0 last:pb-0">
                    <span className="text-gray-400 font-medium">{item.label}</span>
                    <span className="text-gray-800 font-semibold text-right max-w-[55%]">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Explore State Button */}
            <button
              onClick={() => navigate(`/state/${place.state}`)}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 rounded-2xl transition flex items-center justify-center gap-2"
            >
              <i className="ri-map-2-line"></i>
              Explore All of {place.stateName}
            </button>

            {/* Back to States */}
            <button
              onClick={() => navigate('/states')}
              className="w-full border-2 border-gray-200 hover:border-orange-400 hover:text-orange-500 text-gray-600 font-bold py-3.5 rounded-2xl transition flex items-center justify-center gap-2"
            >
              <i className="ri-arrow-left-line"></i>
              All States
            </button>

            {/* Google Maps Button */}
            <a
              href={`https://www.google.com/maps/search/${encodeURIComponent(place.name + ' ' + place.city + ' ' + place.stateName + ' India')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3.5 rounded-2xl transition flex items-center justify-center gap-2"
            >
              <i className="ri-map-pin-2-line"></i>
              View on Google Maps
            </a>

            {/* Share Card */}
            <div className="bg-[#0f172a] rounded-2xl p-5 text-center">
              <p className="text-white font-bold mb-1">Share this Place</p>
              <p className="text-gray-400 text-xs mb-4">Let your friends know about {place.name}</p>
              <div className="flex justify-center gap-3">
                {[
                  { icon: "ri-whatsapp-line",  color: "bg-green-500",  href: `https://wa.me/?text=Check out ${place.name} in ${place.stateName}!` },
                  { icon: "ri-twitter-x-line", color: "bg-black",      href: `https://twitter.com/intent/tweet?text=Explore ${place.name} in ${place.stateName}!` },
                  { icon: "ri-facebook-fill",  color: "bg-blue-600",   href: `https://facebook.com/sharer/sharer.php?u=${window.location.href}` },
                  { icon: "ri-links-line",     color: "bg-orange-500", href: "#" },
                ].map((s, i) => (
                  <a
                    key={i}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${s.color} text-white w-9 h-9 rounded-full flex items-center justify-center hover:scale-110 transition`}
                  >
                    <i className={s.icon}></i>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />

    </div>
  )
}

export default PlaceDetail