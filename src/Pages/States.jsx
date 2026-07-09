import React, { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import 'remixicon/fonts/remixicon.css'
import StatesBg from '../assets/StatesBg.png'
import Footer from '../components/Footer'

// ─── STATES DATA ──────────────────────────────────────────────────────────────
const statesData = [
  { id: "andhra-pradesh",                     name: "Andhra Pradesh",          tagline: "The Essence of Incredible India",          region: "South",     places: 15, image: "https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcR0RHfPONTYZl9Mzf15N_fGoe6v2MniPKP0sDLIWtopfwsWJggZWPndvVQfoNHS0SYcRogavisPSFcve9pMplTPAG4&s=19" },
  { id: "arunachal-pradesh",                  name: "Arunachal Pradesh",       tagline: "Land of the Dawn-Lit Mountains",           region: "Northeast", places: 10, image: "https://lh3.googleusercontent.com/gps-cs-s/APNQkAGyGUJeLIHkyk2KMRiSNMH4sglVkIYV9cfxehKR3ohS0ntOLmUaTKw__LXykgj0p7t4vb45puJmWkfvEk8QGU-oxb6_msDFtdgOgnLg3hXihTu5TKdeOdO8ck9BWqnaWONZ3XUIKA=w675-h390-n-k-no" },
  { id: "assam",                              name: "Assam",                   tagline: "The Land of Red River and Blue Hills",     region: "Northeast", places: 12, image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Kamakhya_Temple_-_DEV_8829.jpg/330px-Kamakhya_Temple_-_DEV_8829.jpg" },
  { id: "bihar",                              name: "Bihar",                   tagline: "The Blisful Bihar",                        region: "East",      places: 18, image: "https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcSoUY2lRKT94517yK6_1flncGIfUlx3lcCU4UUTD2KNtbWgsGG-zp0FVzZh73tumoA7_3iqwGJyVTjUQmD8QQih3l0&s=19" },
  { id: "chhattisgarh",                       name: "Chhattisgarh",            tagline: "Full of surprises",                        region: "Central",   places: 14, image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/7th_century_Lakshmana_Hindu_temple%2C_Sirpur_Chhattisgarh_India_1.jpg/330px-7th_century_Lakshmana_Hindu_temple%2C_Sirpur_Chhattisgarh_India_1.jpg" },
  { id: "goa",                                name: "Goa",                     tagline: "The Pearl of the Orient",                  region: "West",      places: 20, image: "https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcStqnVamfax1aZK-DI8boRHlu7nllUodlbJGJtYWBc9ZxHupVlZgt-ndAHabils2H9dsOLvFm8zqg4-VpCV1E5gCSs&s=19" },
  { id: "gujarat",                            name: "Gujarat",                 tagline: "Land of Legends and Lions",                region: "West",      places: 22, image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Statue_of_Unity_-_View_from_the_other_bank_of_Narmada.jpg/330px-Statue_of_Unity_-_View_from_the_other_bank_of_Narmada.jpg" },
  { id: "haryana",                            name: "Haryana",                 tagline: "The Land of Warriors and Saints",          region: "North",     places: 16, image: "https://lh3.googleusercontent.com/gps-cs-s/APNQkAGHP2lTygFZhiIc6Nvvw34CNQkp_csmnAzTDRVQwxXaYpdcaOcl6y6rMsMmLiMoDHrahrKm-4MPbl6CJgXBWrGYmETFnTVzNQc98IkCMEjekMZHPh3wgxVLKh0plLRJYv4raxSIftWLWNnk=w675-h390-n-k-no" },
  { id: "himachal-pradesh",                   name: "Himachal Pradesh",        tagline: "The Land of Gods and Snow",                region: "North",     places: 25, image: "https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcQv4gB3SwfcDgJw26cnJAMTnBv0gwQziW5ZjBRsIR_F2Bp0ecp8jguKNVCX9fVd_Oo_lMI3vHcL28pd1TtjNmwyz6k&s=19" },  
  { id: "jharkhand",                          name: "Jharkhand",               tagline: "The Land of Forests and Culture",          region: "East",      places: 13, image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Wild_Abode.jpg/330px-Wild_Abode.jpg" },
  { id: "karnataka",                          name: "Karnataka",               tagline: "The Land of Heritage and Nature",          region: "South",     places: 30, image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Hampi_virupaksha_temple.jpg/960px-Hampi_virupaksha_temple.jpg" },
  { id: "kerala",                             name: "Kerala",                  tagline: "God's Own Country",                       region: "South",     places: 28, image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Boathouse_%287063399547%29.jpg/960px-Boathouse_%287063399547%29.jpg" },
  { id: "madhya-pradesh",                     name: "Madhya Pradesh",          tagline: "The Heart of Incredible India",           region: "Central",   places: 26, image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/India-5749_-_Visvanatha_Temple_-_Flickr_-_archer10_%28Dennis%29.jpg/960px-India-5749_-_Visvanatha_Temple_-_Flickr_-_archer10_%28Dennis%29.jpg" },
  { id: "maharashtra",                        name: "Maharashtra",              tagline: "The Land of Diversity and Dreams",        region: "West",      places: 35, image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Cave_26%2C_Ajanta.jpg/960px-Cave_26%2C_Ajanta.jpg" },
  { id: "manipur",                            name: "Manipur",                 tagline: "The Jewel of India’s Northeast",          region: "Northeast", places: 9,  image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/%EA%AF%85%EA%AF%A3%EA%AF%A1%EA%AF%83%EA%AF%A5%EA%AF%8F%EA%AF%86%EA%AF%A4%EA%AF%A1_%EA%AF%86%EA%AF%A4%EA%AF%A1%EA%AF%92%EA%AF%A4_%EA%AF%82%EA%AF%A5%EA%AF%8F%EA%AF%85%EA%AF%A4%EA%AF%A1%EA%AF%8A%EA%AF%A7_%EA%AF%81%EA%AF%85%EA%AF%A5%EA%AF%83%EA%AF%8D%EA%AF%A4_%EA%AF%82%EA%AF%A5%EA%AF%8F%EA%AF%81%EA%AF%AA_%28%EA%AF%81%EA%AF%85%EA%AF%A5%EA%AF%83%EA%AF%8D%EA%AF%A4_%EA%AF%80%EA%AF%A4%EA%AF%8C%EA%AF%A3%EA%AF%A1%29%EA%AF%92%EA%AF%A4_%EA%AF%91%EA%AF%8B%EA%AF%A5%EA%AF%A1_%EA%AF%85%EA%AF%A3%EA%AF%A1%EA%AF%86%EA%AF%A8%EA%AF%9E_%EA%AF%8A%EA%AF%AA%EA%AF%95_%EA%AF%83%EA%AF%A5%EA%AF%8F%EA%AF%80%EA%AF%A9%EA%AF%97%EA%AF%92%EA%AF%A4_%EA%AF%80%EA%AF%A5%EA%AF%9E%EA%AF%84_%EA%AF%83%EA%AF%83%EA%AF%A4.jpg/960px-thumbnail.jpg" },
  { id: "meghalaya",                          name: "Meghalaya",               tagline: "Abode of Clouds and Waterfalls",         region: "Northeast",  places: 11, image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Dawki_River%2C_Meghalaya%2C_India.jpg/960px-Dawki_River%2C_Meghalaya%2C_India.jpg" },
  { id: "mizoram",                            name: "Mizoram",                 tagline: "The Land of Hill People",                region: "Northeast",  places: 8,  image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Embossed_Figures_Kawtchhuah_Ropui_Vangchhia_Mapuia_Hnamte_%281%29.JPG/960px-Embossed_Figures_Kawtchhuah_Ropui_Vangchhia_Mapuia_Hnamte_%281%29.JPG" },
  { id: "nagaland",                           name: "Nagaland",                tagline: "The Land of Festivals and Tribes",        region: "Northeast",  places: 7,  image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Kohima_24_July_2021.jpeg/960px-Kohima_24_July_2021.jpeg" },
  { id: "odisha",                             name: "Odisha",                  tagline: "The Soul of India’s East Coast",         region: "East",       places: 17, image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Konark_Temple_Panorama2.jpg/960px-Konark_Temple_Panorama2.jpg" },
  { id: "punjab",                             name: "Punjab",                  tagline: "The Land of Five Rivers and Vibrant Culture", region: "North",  places: 14, image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Golden_Temple%2C_Amritsar%2C_Punjab_UNAG.jpg/960px-Golden_Temple%2C_Amritsar%2C_Punjab_UNAG.jpg" },
  { id: "rajasthan",                          name: "Rajasthan",              tagline: "The Land of Kings and Deserts",          region: "West",       places: 24, image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Thar_Khuri.jpg/960px-Thar_Khuri.jpg" },
  { id: "sikkim",                             name: "Sikkim",                               tagline: "The Land of Mystical Mountains",         region: "Northeast",  places: 6,  image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Kanchenjunga_range_viewed_from_Hanuman_Tok_temple%2C_Gangtok%2C_Sikkim%2C_India.jpg/960px-Kanchenjunga_range_viewed_from_Hanuman_Tok_temple%2C_Gangtok%2C_Sikkim%2C_India.jpg" },
  { id: "tamil-nadu",                         name: "Tamil Nadu",                           tagline: "The Land of Temples and Culture",        region: "South",      places: 27, image: "https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcSRxbRNCvGEvaJOS5ZIMFX01_N6f2q5l3LlKIcZ9UtNScB-YrlTeCaHPc7YcRdtXHDN3ivGMvp8azHq0PAWiSsSLJk&s=19" },
  { id: "telangana",                          name: "Telangana",                            tagline: "The Land of Pearls and Heritage",         region: "South",       places: 19, image: "https://upload.wikimedia.org/wikipedia/commons/f/f7/A_typical_charminar_evening.jpg" },
  { id: "tripura",                            name: "Tripura",                              tagline: "The Land of Unexplored Beauty",           region: "Northeast",   places: 5,  image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Ujjayanta_palace_Tripura_State_Museum_Agartala_India.jpg/960px-Ujjayanta_palace_Tripura_State_Museum_Agartala_India.jpg" },
  { id: "uttar-pradesh",                      name: "Uttar Pradesh",                        tagline: "The Land of Temples and Heritage",        region: "North",       places: 30, image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Shri_Ram_Janambhoomi_Mandir%2C_Ayodhya_Dham.jpg/960px-Shri_Ram_Janambhoomi_Mandir%2C_Ayodhya_Dham.jpg" },
  { id: "uttarakhand",                        name: "Uttarakhand",                          tagline: "The Land of Gods and Nature",             region: "North",       places: 20, image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Kedarnath_Temple_in_Rainy_season.jpg/960px-Kedarnath_Temple_in_Rainy_season.jpg" },  
  { id: "west-bengal",                        name: "West Bengal",                          tagline: "The Land of Culture and Diversity",       region: "East",        places: 21, image: "https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcQPD9wNu30Fy5meuC5vYry-x0zgrmDVdHrarPr7xK03KY3ndO-12LpKyONj3Z7UVRZSEZni7rWm8v1aaw6DPnsFH_c&s=19" }, 
  { id: "andaman-nicobar-islands",            name: "Andaman & Nicobar Islands",            tagline: "The Tropical Paradise of India",          region: "UT",          places: 8,  image: "https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcTMvToRnVYNagM-Ho2M3cBME3PY0Y7aZ4lToUIK4-WpJAAWBaMvAPKx_qGs8jK7Z5QdhjeZWFWq5c1FHInN0elnf6eG&s=19" },
  { id: "chandigarh",                         name: "Chandigarh",                           tagline: "The City Beautiful and Modern",           region: "UT",          places: 5,  image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Open_Hand_monument%2C_Chandigarh.jpg/330px-Open_Hand_monument%2C_Chandigarh.jpg" },
  { id: "dadra-nagar-haveli-and-daman-diu",   name: "Dadra & Nagar Haveli and Daman & Diu", tagline: "The Coastal Gems of India",               region: "UT",          places: 4,  image: "data:image/jpeg;base64,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" },
  { id: "delhi",                              name: "Delhi",                                tagline: "The Capital City of India",               region: "UT",          places: 25, image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Tomb_of_Humayun%2C_Delhi.jpg/500px-Tomb_of_Humayun%2C_Delhi.jpg" },
  { id: "jammu-kashmir-ladakh",               name: "Jammu & Kashmir and Ladakh",           tagline: "The Crown of India’s North",              region: "UT",          places: 18, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFGiM7todgP4yk116ehou5qrSoSNmHBSCcIg&s" },
  { id: "ladakh",                             name: "Ladakh",                               tagline: "The Land of High Passes and Serenity",    region: "UT",          places: 10, image: "https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcQRubr_9AOTLET5xqioNR_j9Qf0jKmrgcQSaVfnObOPXSaTodbewYEyox0xvTdPX0rOKKrImxWh53GzkxoWXoN6Xcs&s=19" },
  { id: "puducherry",                         name: "Puducherry",                           tagline: "The French Riviera of the East",          region: "UT",          places: 6,  image: "https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcQZDrIdmmjnSzkpfZF26Hkqd9dgxeJw1YyCmU_EXLKS1sddV0jJrhyWwnidKstJNCK7o4SOysP_TOHIHX0FTfaYbWI&s=19" },
  { id: "Lakshadweep",                        name: "Lakshadweep",                          tagline: "The Tropical Paradise of India",          region: "UT",          places: 4,  image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/A_beach_side_resort_at_Kadmat_Island%2C_Lakshadweep.jpg/500px-A_beach_side_resort_at_Kadmat_Island%2C_Lakshadweep.jpg" },

]

const regions = ["All", "North", "South", "East", "West", "Central", "Northeast", "UT"]

// ─── STATE CARD ───────────────────────────────────────────────────────────────
function StateCard({ state, onClick }) {
  return (
    <div
      onClick={() => onClick(state.id)}
      className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
      style={{ height: "260px" }}
    >
      <img
        src={state.image}
        alt={state.name}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&q=80" }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

      <div className="absolute top-3 right-3">
        <span className="text-xs font-semibold px-2 py-1 rounded-full bg-orange-500/90 text-white backdrop-blur-sm">
          {state.region}
        </span>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100">
        <div className="bg-orange-500 text-white text-sm font-bold px-5 py-2 rounded-full shadow-lg">
          Explore →
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h3 className="text-white font-bold text-lg leading-tight">{state.name}</h3>
        <p className="text-gray-300 text-xs mt-0.5">{state.tagline}</p>
        <div className="flex items-center gap-1 mt-2">
          <i className="ri-map-pin-fill text-orange-400 text-sm"></i>
          <span className="text-orange-400 text-xs font-semibold">{state.places}+ Places</span>
        </div>
      </div>
    </div>
  )
}

// ─── MAIN STATES PAGE ─────────────────────────────────────────────────────────
const States = () => {
  const navigate = useNavigate()
  const [search, setSearch] = useState("")
  const [activeRegion, setActiveRegion] = useState("All")
  const [sortBy, setSortBy] = useState("name")
  const [menuOpen, setMenuOpen] = useState(false)

  const filtered = useMemo(() => {
    let result = statesData.filter((s) => {
      const matchSearch =
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.tagline.toLowerCase().includes(search.toLowerCase())
      const matchRegion = activeRegion === "All" || s.region === activeRegion
      return matchSearch && matchRegion
    })
    if (sortBy === "name") result.sort((a, b) => a.name.localeCompare(b.name))
    if (sortBy === "places") result.sort((a, b) => b.places - a.places)
    return result
  }, [search, activeRegion, sortBy])

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── NAVBAR + HERO ── */}
      <div
        className="w-full min-h-[85vh] bg-cover bg-center relative overflow-hidden"
        style={{ backgroundImage: `url(${StatesBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />

        {/* NAVBAR */}
        <div className="relative z-10 w-full flex items-center justify-between px-5 md:px-10 py-5 text-white">
          <div>
            <h1 className="text-2xl md:text-4xl font-bold">
              <i className="ri-map-pin-line mr-2"></i>
              Travel<span className="text-orange-500">Bharat</span>
            </h1>
            <p className="text-[10px] md:text-xs ml-2">EXPLORE INDIA STATE BY STATE</p>
          </div>

          <div className="hidden lg:flex gap-10 font-semibold">
            <a href="/" className="hover:text-orange-400 transition" onClick={() => setMenuOpen(false)}>
              Home
            </a>
            <a href="/states" className="text-orange-400 border-b-2 border-orange-400 pb-1" onClick={() => setMenuOpen(false)}>
              States
            </a>
            <a href="/categories" className="hover:text-orange-400 transition" onClick={() => setMenuOpen(false)}>
              Categories
            </a>
            <a href="/destinations" className="hover:text-orange-400 transition" onClick={() => setMenuOpen(false)}>
              Destinations
            </a>
            <a href="/about" className="hover:text-orange-400 transition" onClick={() => setMenuOpen(false)}>
              About Us
            </a>
            <a href="/contact" className="hover:text-orange-400 transition" onClick={() => setMenuOpen(false)}>
              Contact
            </a>
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
            <a href="/" className="hover:text-orange-400 transition" onClick={() => setMenuOpen(false)}>
              Home
            </a>
            <a href="/states" className="text-orange-400" onClick={() => setMenuOpen(false)}>
              States
            </a>
            <a href="/categories" className="hover:text-orange-400 transition" onClick={() => setMenuOpen(false)}>
              Categories
            </a>
            <a href="/destinations" className="hover:text-orange-400 transition" onClick={() => setMenuOpen(false)}>
              Destinations
            </a>
            <a href="/about" className="hover:text-orange-400 transition" onClick={() => setMenuOpen(false)}>
              About Us
            </a>
            <a href="/contact" className="hover:text-orange-400 transition" onClick={() => setMenuOpen(false)}>
              Contact
            </a>
          </div>
        )}

        {/* Hero Content */}
        <div className="relative z-10 flex items-center h-[65vh] px-5 md:px-10 lg:px-16">
          <div className="text-white max-w-2xl">
            <h2 className="text-2xl md:text-4xl text-orange-400 font-[Pacifico] mb-4 md:mb-6">
              Incredible India
            </h2>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4 md:mb-6">
              EXPLORE ALL <br /> 28 STATES
            </h1>
            <p className="text-sm md:text-lg text-gray-300 leading-7 max-w-lg mb-8">
              From the snow-capped Himalayas to tropical beaches — discover every corner of India.
            </p>
            <div className="flex gap-8 flex-wrap">
              {[
                { label: "States",             value: "28+" },
                { label: "Union Territories",  value: "8"   },
                { label: "Destinations",       value: "800+"},
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-3xl font-extrabold text-orange-500">{stat.value}</div>
                  <div className="text-gray-400 text-xs mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── STICKY FILTER BAR ── */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">

            <div className="relative w-full sm:w-80">
              <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
              <input
                type="text"
                placeholder="Search states..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-sm"
              />
              {search && (
                <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs">✕</button>
              )}
            </div>

            <div className="flex gap-2 flex-wrap justify-center">
              {regions.map((region) => (
                <button
                  key={region}
                  onClick={() => setActiveRegion(region)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                    activeRegion === region
                      ? "bg-orange-500 text-white shadow-md shadow-orange-200"
                      : "bg-gray-100 text-gray-600 hover:bg-orange-50 hover:text-orange-500"
                  }`}
                >
                  {region}
                </button>
              ))}
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-sm border border-gray-300 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-orange-400 cursor-pointer bg-white text-gray-700"
            >
              <option value="name">Sort: A–Z</option>
              <option value="places">Sort: Most Places</option>
            </select>
          </div>
        </div>
      </div>

      {/* ── STATES GRID ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-500 text-sm">
            Showing <span className="font-bold text-gray-800">{filtered.length}</span> of{" "}
            <span className="font-bold text-gray-800">{statesData.length}</span> states
            {activeRegion !== "All" && (
              <span className="ml-2 text-orange-500 font-semibold">in {activeRegion}</span>
            )}
          </p>
          {(search || activeRegion !== "All") && (
            <button
              onClick={() => { setSearch(""); setActiveRegion("All") }}
              className="text-xs text-orange-500 hover:text-orange-700 font-semibold underline underline-offset-2"
            >
              Clear filters
            </button>
          )}
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filtered.map((state) => (
              <StateCard key={state.id} state={state} onClick={(id) => navigate(`/state/${id}`)} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <div className="text-6xl mb-4">🗺️</div>
            <h3 className="text-xl font-bold text-gray-700 mb-2">No states found</h3>
            <p className="text-gray-400 mb-6">Try searching with a different keyword or region.</p>
            <button
              onClick={() => { setSearch(""); setActiveRegion("All") }}
              className="bg-orange-500 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-orange-600 transition-colors"
            >
              Show All States
            </button>
          </div>
        )}
      </div>

      {/* ── BOTTOM CTA ── */}
      <div className="bg-[#0f172a] mt-12 py-12 text-center">
        <p className="text-orange-400 font-semibold text-sm uppercase tracking-widest mb-2">
          Can't decide?
        </p>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
          Let Us Help You Plan Your Journey
        </h2>
        <p className="text-gray-400 mb-6 max-w-lg mx-auto text-sm">
          Browse destinations by category — heritage, nature, adventure, or religious.
        </p>
        <button
          onClick={() => navigate('/states')}
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/30"
        >
          Explore All States →
        </button>
      </div>

      {/* ── FOOTER ── */}
      <Footer />

    </div>
  )
}

export default States