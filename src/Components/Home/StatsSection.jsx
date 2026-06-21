import React from 'react'
import { useNavigate } from 'react-router-dom'
import 'remixicon/fonts/remixicon.css'

const statsData = [
  { icon: "ri-map-pin-2-fill",    number: "28+",   title: "States & UTs"    },
  { icon: "ri-building-4-fill",   number: "800+",  title: "Destinations"    },
  { icon: "ri-apps-2-fill",       number: "50+",   title: "Categories"      },
  { icon: "ri-image-2-fill",      number: "1000+", title: "Beautiful Images"},
  { icon: "ri-group-fill",        number: "50K+",  title: "Happy Travelers" },
  { icon: "ri-shield-check-fill", number: "95%+",  title: "Verified Content"},
]

const StatsSection = () => {
  const navigate = useNavigate()

  return (
    <div className="w-full px-5 md:px-10 lg:px-14 py-8 bg-white overflow-hidden">

      {/* Stats Bar */}
      <div className="w-full bg-gradient-to-r from-[#0B1736] to-[#12254D] rounded-2xl px-5 md:px-10 py-6 md:py-7">
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-6">
          {statsData.map((item, index) => (
            <div key={index} className="flex items-center gap-3 md:gap-4 xl:border-r border-white/10 last:border-r-0 xl:pr-6">
              <div className="text-orange-500 text-3xl md:text-4xl">
                <i className={item.icon}></i>
              </div>
              <div className="text-white">
                <h1 className="text-2xl md:text-3xl font-bold">{item.number}</h1>
                <p className="text-xs md:text-sm text-gray-300">{item.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="w-full mt-6 bg-[#FFF8F2] rounded-2xl px-5 md:px-10 py-8 flex flex-col lg:flex-row items-center justify-between gap-6 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600&q=80"
          alt="Kerala"
          className="w-full sm:w-[300px] lg:w-[250px] h-[140px] object-cover rounded-xl opacity-90"
        />
        <div className="text-center max-w-2xl">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1B2B4B] leading-tight">
            Incredible Places. Incredible India.
          </h1>
          <p className="text-gray-600 mt-3 text-sm md:text-base leading-7">
            Start your journey today and explore the unexplored beauty of India.
          </p>
          <button
            onClick={() => navigate('/states')}
            className="mt-6 bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-semibold flex items-center gap-2 mx-auto transition"
          >
            Start Exploring <i className="ri-arrow-right-line"></i>
          </button>
        </div>
        <img
          src="https://images.unsplash.com/photo-1564507592333-c60657eea523?w=600&q=80"
          alt="Taj Mahal"
          className="w-full sm:w-[300px] lg:w-[250px] h-[140px] object-cover rounded-xl opacity-90"
        />
      </div>
    </div>
  )
}

export default StatsSection