import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import 'remixicon/fonts/remixicon.css'

const categoriesData = [
  { icon: "ri-building-4-line",   title: "Heritage",  desc: "Historical Wonders",  color: "text-orange-500", bg: "bg-orange-50", id: "heritage"  },
  { icon: "ri-landscape-line",    title: "Nature",    desc: "Natural Beauty",      color: "text-green-600",  bg: "bg-green-50",  id: "nature"    },
  { icon: "ri-treasure-map-line", title: "Adventure", desc: "Thrill & Excitement", color: "text-purple-600", bg: "bg-purple-50", id: "adventure" },
  { icon: "ri-bank-line",         title: "Religious", desc: "Sacred Destinations", color: "text-pink-500",   bg: "bg-pink-50",   id: "religious" },
  { icon: "ri-flower-line",       title: "Culture",   desc: "Traditions & Art",    color: "text-yellow-500", bg: "bg-yellow-50", id: "culture"   },
]

const destinationsData = [
  { id: "taj-mahal",  name: "Taj Mahal",  location: "Agra, Uttar Pradesh", rating: "4.8", state: "uttar-pradesh", image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=600&q=80" },
  { id: "leh-ladakh", name: "Leh Ladakh", location: "Ladakh",              rating: "4.9", state: "ladakh",        image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=600&q=80" },
  { id: "meghalaya",  name: "Meghalaya",  location: "Meghalaya",           rating: "4.7", state: "meghalaya",     image: "https://lh3.googleusercontent.com/gps-cs-s/APNQkAEI9uJ0763jTDI7MCDN6GxbM2MgykqmCa46OKz6_0v2AWKYLm6Q5zhVE_xvbhz3eYzsKqxMQ8jlW1UczaYmatfinUdyUVfwtkaEXcpCI0xzLE_g15bzfH-lRTK7yOdRbOmsKGp-kw=w675-h390-n-k-no" },
  { id: "badrinath",  name: "Badrinath",  location: "Uttarakhand",         rating: "4.8", state: "uttarakhand",   image: "https://lh3.googleusercontent.com/gps-cs-s/APNQkAHXgpPZJ6NkaviKe7JCLf9Wtia4_Z0uKV5aR4vhIwPSVk8dcwU5xFpeO49skaz7jdtab_MgRugfRkDogClp4cNzoWzY5CmCmVyUP24Q8vNbd4rTSH6cX9jlAcwP8Dz4FOkWJNDb=w675-h390-n-k-no" },
  { id: "jaipur",     name: "Jaipur",     location: "Rajasthan",           rating: "4.6", state: "rajasthan",     image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=600&q=80" },
]

const ExploreSection = () => {
  const navigate = useNavigate()
  const destScrollRef = useRef()
  const [likedDestinations, setLikedDestinations] = useState([])

  const toggleLike = (id, e) => {
    e.stopPropagation()
    setLikedDestinations(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }

  const scroll = (dir) => {
    destScrollRef.current?.scrollBy({ left: dir === 'left' ? -300 : 300, behavior: 'smooth' })
  }

  return (
    <div className="w-full px-5 md:px-10 lg:px-14 py-8 bg-white overflow-hidden">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">

        {/* ── CATEGORIES ── */}
        <div>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-gray-900">EXPLORE BY CATEGORIES</h1>
              <div className="w-10 h-[3px] bg-orange-500 rounded-full mt-1"></div>
            </div>
            <button onClick={() => navigate('/categories')} className="text-orange-500 text-xs md:text-sm font-semibold flex items-center gap-2 hover:text-orange-600 transition">
              <span className="hidden sm:block">View All Categories</span>
              <i className="ri-arrow-right-line text-lg"></i>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 xl:grid-cols-5 gap-4">
            {categoriesData.map((item) => (
              <div
                key={item.id}
                onClick={() => navigate(`/categories`)}
                className={`w-full min-h-[120px] rounded-2xl ${item.bg} flex flex-col items-center justify-center text-center cursor-pointer hover:scale-105 transition p-4`}
              >
                <i className={`${item.icon} text-4xl md:text-5xl ${item.color}`}></i>
                <h2 className="font-bold text-sm mt-3">{item.title}</h2>
                <p className="text-[11px] text-gray-500 mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── FEATURED DESTINATIONS ── */}
        <div>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-gray-900">FEATURED DESTINATIONS</h1>
              <div className="w-10 h-[3px] bg-orange-500 rounded-full mt-1"></div>
            </div>
            <button onClick={() => navigate('/destinations')} className="text-orange-500 text-xs md:text-sm font-semibold flex items-center gap-2 hover:text-orange-600 transition">
              <span className="hidden sm:block">View All Destinations</span>
              <i className="ri-arrow-right-line text-lg"></i>
            </button>
          </div>

          <div className="relative">
            <button onClick={() => scroll('left')} className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md w-8 h-8 rounded-full items-center justify-center hover:bg-orange-500 hover:text-white transition">
              <i className="ri-arrow-left-s-line"></i>
            </button>
            <button onClick={() => scroll('right')} className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md w-8 h-8 rounded-full items-center justify-center hover:bg-orange-500 hover:text-white transition">
              <i className="ri-arrow-right-s-line"></i>
            </button>

            <div ref={destScrollRef} className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth">
              {destinationsData.map((item) => (
                <div
                  key={item.id}
                  onClick={() => navigate(`/place/${item.id}`)}
                  className="min-w-[170px] sm:min-w-[180px] bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex-shrink-0 cursor-pointer hover:shadow-md transition"
                >
                  <div className="relative">
                    <img src={item.image} alt={item.name} className="w-full h-[100px] md:h-[110px] object-cover" />
                    <div onClick={(e) => toggleLike(item.id, e)} className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm rounded-full w-6 h-6 flex items-center justify-center cursor-pointer hover:scale-110 transition">
                      <i className={`text-xs ${likedDestinations.includes(item.id) ? 'ri-heart-fill text-red-500' : 'ri-heart-line'}`}></i>
                    </div>
                  </div>
                  <div className="p-3">
                    <h2 className="font-bold text-sm md:text-base">{item.name}</h2>
                    <p className="text-xs text-gray-500 mt-1">{item.location}</p>
                    <div className="flex items-center gap-1 mt-2">
                      <i className="ri-star-fill text-yellow-400 text-xs"></i>
                      <span className="text-xs">{item.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExploreSection