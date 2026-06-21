import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import 'remixicon/fonts/remixicon.css'

const statesData = [
  { id: "rajasthan",       name: "Rajasthan",       desc: "The Land of Kings",   image: "https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcRtvjs_9xj0V0hHARbAn502ZElQCPvpBOuqQ8dVHhftHnMOq_Ip_NNu-heLucwr18ESu2vz1GtoOHyz_S-ooZY0wI8&s=19" },
  { id: "kerala",          name: "Kerala",           desc: "God's Own Country",   image: "https://lh3.googleusercontent.com/gps-cs-s/APNQkAEyBZKY0qBYrYeuKghi1WF7cUsvEtZdcCydmen8hOmrzJPNGg2AqgQf6TiQtAJCPoQTgwD4U6W2bLmj-wPirvksHOWQ9mYjlz7CXZOt01i6dSVl25T7YsQqB0Si3oYJcbkS46K25OHtI_5A=w675-h390-n-k-no" },
  { id: "himachal-pradesh",name: "Himachal Pradesh", desc: "Heaven On Earth",     image: "https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcQv4gB3SwfcDgJw26cnJAMTnBv0gwQziW5ZjBRsIR_F2Bp0ecp8jguKNVCX9fVd_Oo_lMI3vHcL28pd1TtjNmwyz6k&s=19" },
  { id: "goa",             name: "Goa",              desc: "The Beach Paradise",  image: "https://clubmahindra.gumlet.io/blog/media/section_images/shuttersto-6d71496a31ac52b.jpg?w=376&dpr=2.6" },
  { id: "punjab",          name: "Punjab",           desc: "Land of Five Rivers", image: "https://cdn.britannica.com/53/176353-050-5B854179/Harmandir-Sahib-Amritsar-Punjab-India.jpg" },
  { id: "uttarakhand",     name: "Uttarakhand",      desc: "Devbhoomi",           image: "https://uttarakhandtourism.gov.in/assets/media/GodGrace.jpg" },
]

const PopularStates = () => {
  const navigate = useNavigate()
  const scrollRef = useRef()

  const scroll = (dir) => {
    scrollRef.current?.scrollBy({ left: dir === 'left' ? -300 : 300, behavior: 'smooth' })
  }

  return (
    <div className="w-full px-5 md:px-10 lg:px-14 py-8 md:py-10 bg-white overflow-hidden">

      {/* Header */}
      <div className="flex items-center justify-between mb-5 md:mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">POPULAR STATES</h1>
          <div className="w-10 h-[3px] bg-orange-500 rounded-full mt-1"></div>
        </div>
        <button
          onClick={() => navigate('/states')}
          className="text-orange-500 font-semibold flex items-center gap-2 text-xs md:text-sm hover:text-orange-600 transition"
        >
          <span className="hidden sm:block">View All States</span>
          <i className="ri-arrow-right-line text-lg"></i>
        </button>
      </div>

      {/* Slider */}
      <div className="relative">
        <button onClick={() => scroll('left')} className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md w-10 h-10 rounded-full items-center justify-center hover:bg-orange-500 hover:text-white transition">
          <i className="ri-arrow-left-s-line text-xl"></i>
        </button>
        <button onClick={() => scroll('right')} className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md w-10 h-10 rounded-full items-center justify-center hover:bg-orange-500 hover:text-white transition">
          <i className="ri-arrow-right-s-line text-xl"></i>
        </button>

        <div ref={scrollRef} className="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar">
          {statesData.map((state) => (
            <div
              key={state.id}
              onClick={() => navigate(`/state/${state.id}`)}
              className="min-w-[160px] sm:min-w-[180px] md:min-w-[200px] lg:min-w-[220px] h-[110px] sm:h-[120px] md:h-[130px] rounded-2xl overflow-hidden relative flex-shrink-0 group cursor-pointer"
            >
              <img src={state.image} alt={state.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <div className="absolute bottom-3 left-3 text-white">
                <h2 className="text-sm md:text-base font-bold leading-none">{state.name}</h2>
                <p className="text-[10px] md:text-[11px] text-gray-300 mt-1">{state.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PopularStates