import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import 'remixicon/fonts/remixicon.css'
import HeroImg from '../../assets/HeroSection.png'
import { useEffect } from "react";

const HeroSection = () => {
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchText, setSearchText] = useState("")
  const [selectedState, setSelectedState] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")

  const handleExplore = () => {
    if (selectedState) {
      navigate(`/state/${selectedState}`)
    } else if (searchText.trim()) {
      navigate(`/states?search=${encodeURIComponent(searchText.trim())}`)
    } else {
      navigate('/states')
    }
  }

  return (
    <div
      className="w-full min-h-screen bg-cover bg-center relative overflow-hidden"
      style={{ backgroundImage: `url(${HeroImg})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent">

        {/* ── NAVBAR ── */}
        <div className="w-full flex items-center justify-between px-5 md:px-10 py-5 text-white">

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
            <span className="text-orange-400 border-b-2 border-orange-400 pb-1 cursor-pointer">Home</span>
            <span onClick={() => navigate('/states')}       className="hover:text-orange-400 transition cursor-pointer">States</span>
            <span onClick={() => navigate('/categories')}   className="hover:text-orange-400 transition cursor-pointer">Categories</span>
            <span onClick={() => navigate('/destinations')} className="hover:text-orange-400 transition cursor-pointer">Destinations</span>
            <span onClick={() => navigate('/about')}        className="hover:text-orange-400 transition cursor-pointer">About Us</span>
            <span onClick={() => navigate('/contact')}      className="hover:text-orange-400 transition cursor-pointer">Contact</span>
          </div>

          {/* Icons */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex gap-4">
              <div className="bg-white text-black rounded-full w-11 h-11 flex items-center justify-center cursor-pointer hover:scale-110 transition">
                <i className="ri-moon-line"></i>
              </div>
              <div
                className="bg-white text-orange-500 rounded-full w-11 h-11 flex items-center justify-center cursor-pointer hover:scale-110 transition"
                onClick={() => document.getElementById('search-input').focus()}
              >
                <i className="ri-search-line"></i>
              </div>
            </div>
            <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden text-3xl">
              <i className={menuOpen ? "ri-close-line" : "ri-menu-line"}></i>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden bg-black/95 backdrop-blur-md px-6 py-6 flex flex-col gap-5 text-white text-lg font-semibold">
            <span className="text-orange-400 cursor-pointer"         onClick={() => { navigate('/');            setMenuOpen(false) }}>Home</span>
            <span className="hover:text-orange-400 cursor-pointer"   onClick={() => { navigate('/states');      setMenuOpen(false) }}>States</span>
            <span className="hover:text-orange-400 cursor-pointer"   onClick={() => { navigate('/categories');  setMenuOpen(false) }}>Categories</span>
            <span className="hover:text-orange-400 cursor-pointer"   onClick={() => { navigate('/destinations');setMenuOpen(false) }}>Destinations</span>
            <span className="hover:text-orange-400 cursor-pointer"   onClick={() => { navigate('/about');       setMenuOpen(false) }}>About Us</span>
            <span className="hover:text-orange-400 cursor-pointer"   onClick={() => { navigate('/contact');     setMenuOpen(false) }}>Contact</span>
          </div>
        )}

        {/* ── HERO TEXT ── */}
        <div className="flex items-center h-[70vh] md:h-[75vh] px-5 md:px-10 lg:px-16">
          <div className="text-white max-w-2xl">
            <h2 className="text-2xl md:text-4xl text-orange-400 font-[Pacifico] mb-4 md:mb-6">
              Incredible India
            </h2>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4 md:mb-6">
              EXPLORE INDIA <br /> STATE BY STATE
            </h1>
            <p className="text-sm md:text-lg text-gray-300 leading-7 md:leading-8 max-w-lg">
              Discover the beauty, culture, heritage and amazing destinations across India.
            </p>
          </div>
        </div>
      </div>

      {/* ── SEARCH BAR ── */}
      <div className="absolute bottom-5 md:bottom-10 left-1/2 -translate-x-1/2 w-[92%] lg:w-[75%] bg-white rounded-2xl p-3 shadow-2xl">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4">

          {/* Search Input */}
          <div className="flex items-center gap-3 flex-1 border border-gray-200 rounded-xl px-4 py-3">
            <i className="ri-search-line text-gray-400 text-xl"></i>
            <input
              id="search-input"
              type="text"
              placeholder="Search for places, states, cities..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleExplore()}
              className="outline-none w-full text-sm text-black"
            />
            {searchText && (
              <button onClick={() => setSearchText('')} className="text-gray-400 hover:text-gray-600 text-xs">✕</button>
            )}
          </div>

          {/* State Dropdown */}
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="w-full lg:w-auto px-6 py-3 border border-gray-200 rounded-xl outline-none text-sm text-black"
          >
            <option value="">All States & UTs</option>
            <option value="andhra-pradesh">Andhra Pradesh</option>
            <option value="arunachal-pradesh">Arunachal Pradesh</option>
            <option value="assam">Assam</option>
            <option value="bihar">Bihar</option>
            <option value="chhattisgarh">Chhattisgarh</option>
            <option value="goa">Goa</option>
            <option value="gujarat">Gujarat</option>
            <option value="haryana">Haryana</option>
            <option value="himachal-pradesh">Himachal Pradesh</option>
            <option value="jharkhand">Jharkhand</option>
            <option value="karnataka">Karnataka</option>
            <option value="kerala">Kerala</option>
            <option value="madhya-pradesh">Madhya Pradesh</option>
            <option value="maharashtra">Maharashtra</option>
            <option value="manipur">Manipur</option>
            <option value="meghalaya">Meghalaya</option>
            <option value="mizoram">Mizoram</option>
            <option value="nagaland">Nagaland</option>
            <option value="odisha">Odisha</option>
            <option value="punjab">Punjab</option>
            <option value="rajasthan">Rajasthan</option>
            <option value="sikkim">Sikkim</option>
            <option value="tamil-nadu">Tamil Nadu</option>
            <option value="telangana">Telangana</option>
            <option value="tripura">Tripura</option>
            <option value="uttar-pradesh">Uttar Pradesh</option>
            <option value="uttarakhand">Uttarakhand</option>
            <option value="west-bengal">West Bengal</option>
            <option value="delhi">Delhi</option>
            <option value="ladakh">Ladakh</option>
            <option value="puducherry">Puducherry</option>
            <option value="andaman-nicobar">Andaman & Nicobar Islands</option>
            <option value="lakshadweep">Lakshadweep</option>
            <option value="jammu-kashmir">Jammu & Kashmir</option>
          </select>

          {/* Category Dropdown */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full lg:w-auto px-6 py-3 border border-gray-200 rounded-xl outline-none text-sm text-black"
          >
            <option value="">All Categories</option>
            <option value="heritage">Heritage</option>
            <option value="nature">Nature</option>
            <option value="adventure">Adventure</option>
            <option value="religious">Religious</option>
            <option value="culture">Culture</option>
            <option value="beaches">Beaches</option>
            <option value="mountains">Mountains</option>
          </select>

          {/* Explore Button */}
          <button
            onClick={handleExplore}
            className="w-full lg:w-auto bg-orange-500 hover:bg-orange-600 text-white px-10 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition"
          >
            Explore <i className="ri-arrow-right-line"></i>
          </button>
        </div>
      </div>
    </div>
  )
}

export default HeroSection