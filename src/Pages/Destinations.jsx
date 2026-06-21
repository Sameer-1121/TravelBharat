import React, { useState, useMemo } from 'react'
import DestinationsHero from '../components/destinations/DestinationsHero'
import DestinationsFilter from '../components/destinations/DestinationsFilter'
import DestinationsGrid from '../components/destinations/DestinationsGrid'
import Footer from '../components/Footer'
import { usePlacesStore } from '../components/hooks/PlacesDataContext'

const Destinations = () => {
  const { places } = usePlacesStore()
  const [search, setSearch] = useState("")
  const [activeCategory, setActiveCategory] = useState("All")
  const [sortBy, setSortBy] = useState("rating")
  const [likedPlaces, setLikedPlaces] = useState([])

  const filtered = useMemo(() => {
    let result = places.filter((p) => {
      const matchSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.city.toLowerCase().includes(search.toLowerCase()) ||
        p.stateName.toLowerCase().includes(search.toLowerCase())
      const matchCat = activeCategory === "All" || p.category === activeCategory
      return matchSearch && matchCat
    })
    if (sortBy === "rating") result.sort((a, b) => b.rating - a.rating)
    if (sortBy === "name") result.sort((a, b) => a.name.localeCompare(b.name))
    return result
  }, [places, search, activeCategory, sortBy])

  const toggleLike = (id, e) => {
    e.stopPropagation()
    setLikedPlaces((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  const clearFilters = () => {
    setSearch("")
    setActiveCategory("All")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DestinationsHero />

      <DestinationsFilter
        search={search}
        setSearch={setSearch}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      <DestinationsGrid
        filtered={filtered}
        likedPlaces={likedPlaces}
        onToggleLike={toggleLike}
        onClearFilters={clearFilters}
      />

      <Footer />
    </div>
  )
}

export default Destinations