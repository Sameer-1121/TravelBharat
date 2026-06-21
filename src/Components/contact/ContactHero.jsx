import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import 'remixicon/fonts/remixicon.css'

const ContactHero = () => {
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div
      className="w-full min-h-[75vh] bg-cover bg-center relative overflow-hidden"
      style={{
        backgroundImage: `url(https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1600&q=80)`,
      }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />

      {/* ── NAVBAR ── */}
      <div className="relative z-10 w-full flex items-center justify-between px-5 md:px-10 py-5 text-white">

        {/* Logo */}
        <div className="cursor-pointer" onClick={() => navigate('/')}>
          <h1 className="text-2xl md:text-4xl font-bold">
            <i className="ri-map-pin-line mr-2"></i>
            Travel<span className="text-orange-500">Bharat</span>
          </h1>
          <p className="text-[10px] md:text-xs ml-2">EXPLORE INDIA STATE BY STATE</p>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex gap-10 font-semibold">
          <span onClick={() => navigate('/')}            className="hover:text-orange-400 cursor-pointer transition">Home</span>
          <span onClick={() => navigate('/states')}       className="hover:text-orange-400 cursor-pointer transition">States</span>
          <span onClick={() => navigate('/categories')}   className="hover:text-orange-400 cursor-pointer transition">Categories</span>
          <span onClick={() => navigate('/destinations')} className="hover:text-orange-400 cursor-pointer transition">Destinations</span>
          <span onClick={() => navigate('/about')}        className="hover:text-orange-400 cursor-pointer transition">About Us</span>
          <span className="text-orange-400 border-b-2 border-orange-400 pb-1 cursor-pointer">Contact</span>
        </div>

        {/* Right Icons */}
        <div className="hidden md:flex gap-4">
          <div className="bg-white text-black rounded-full w-11 h-11 flex items-center justify-center cursor-pointer hover:scale-110 transition">
            <i className="ri-moon-line"></i>
          </div>
          <div className="bg-white text-orange-500 rounded-full w-11 h-11 flex items-center justify-center cursor-pointer hover:scale-110 transition">
            <i className="ri-search-line"></i>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden text-3xl">
          <i className={menuOpen ? "ri-close-line" : "ri-menu-line"}></i>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="relative z-10 lg:hidden bg-black/95 px-6 py-6 flex flex-col gap-5 text-white text-lg font-semibold">
          <span onClick={() => { navigate('/');            setMenuOpen(false) }} className="hover:text-orange-400 cursor-pointer">Home</span>
          <span onClick={() => { navigate('/states');      setMenuOpen(false) }} className="hover:text-orange-400 cursor-pointer">States</span>
          <span onClick={() => { navigate('/categories');  setMenuOpen(false) }} className="hover:text-orange-400 cursor-pointer">Categories</span>
          <span onClick={() => { navigate('/destinations'); setMenuOpen(false) }} className="hover:text-orange-400 cursor-pointer">Destinations</span>
          <span onClick={() => { navigate('/about');       setMenuOpen(false) }} className="hover:text-orange-400 cursor-pointer">About Us</span>
          <span className="text-orange-400">Contact</span>
        </div>
      )}

      {/* ── HERO CONTENT ── */}
      <div className="relative z-10 flex items-center h-[60vh] px-5 md:px-10 lg:px-16">
        <div className="text-white max-w-2xl">
          <h2 className="text-2xl md:text-4xl text-orange-400 font-[Pacifico] mb-4 md:mb-6">
            Get in Touch
          </h2>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4 md:mb-6">
            CONTACT US
          </h1>
          <p className="text-sm md:text-lg text-gray-300 leading-7 md:leading-8 max-w-lg">
            Have a question, suggestion, or want to report an issue? We'd love to hear from you!
          </p>
        </div>
      </div>
    </div>
  )
}

export default ContactHero