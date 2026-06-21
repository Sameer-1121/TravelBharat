import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import 'remixicon/fonts/remixicon.css'

const NotFound = () => {
  const navigate = useNavigate()
  const [count, setCount] = useState(10)

  // Auto redirect after 10 seconds
  useEffect(() => {
    if (count === 0) { navigate('/'); return }
    const timer = setTimeout(() => setCount(c => c - 1), 1000)
    return () => clearTimeout(timer)
  }, [count, navigate])

  const suggestions = [
    { label: "Go Home",       icon: "ri-home-4-line",      path: "/"        },
    { label: "All States",    icon: "ri-map-2-line",       path: "/states"  },
    { label: "Rajasthan",     icon: "ri-castle-line",      path: "/state/rajasthan"  },
    { label: "Kerala",        icon: "ri-sailboat-line",    path: "/state/kerala"     },
  ]

  return (
    <div className="min-h-screen bg-[#0B1736] flex flex-col items-center justify-center px-4 text-white text-center">

      {/* Animated 404 */}
      <div className="relative mb-8">
        <h1 className="text-[120px] sm:text-[160px] font-extrabold text-white/5 leading-none select-none">
          404
        </h1>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-6xl mb-2">🗺️</div>
          <p className="text-orange-500 font-bold text-lg tracking-widest uppercase">
            Lost in India?
          </p>
        </div>
      </div>

      <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">
        Page Not Found
      </h2>
      <p className="text-gray-400 text-sm sm:text-base max-w-md mb-2 leading-7">
        The destination you're looking for doesn't exist or has been moved. Let's get you back on track!
      </p>

      {/* Auto redirect countdown */}
      <p className="text-gray-500 text-xs mb-8">
        Redirecting to Home in{" "}
        <span className="text-orange-400 font-bold text-sm">{count}s</span>
      </p>

      {/* Quick Links */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8 w-full max-w-lg">
        {suggestions.map((s, i) => (
          <button
            key={i}
            onClick={() => navigate(s.path)}
            className="flex flex-col items-center gap-2 bg-white/5 hover:bg-orange-500 border border-white/10 hover:border-orange-500 rounded-2xl p-4 transition-all duration-300 group"
          >
            <i className={`${s.icon} text-2xl text-orange-400 group-hover:text-white transition`}></i>
            <span className="text-xs font-semibold text-gray-400 group-hover:text-white transition">
              {s.label}
            </span>
          </button>
        ))}
      </div>

      {/* Main CTA */}
      <button
        onClick={() => navigate('/')}
        className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3 rounded-full transition flex items-center gap-2"
      >
        <i className="ri-home-4-line"></i>
        Back to Home
      </button>

      {/* Decorative bottom text */}
      <p className="mt-12 text-gray-600 text-xs">
        © 2025 TravelBharat — Explore Incredible India
      </p>
    </div>
  )
}

export default NotFound