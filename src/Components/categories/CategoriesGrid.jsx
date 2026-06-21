import React from 'react'
import { usePlacesStore } from '../hooks/PlacesDataContext'
import { categoriesInfo } from './categoriesData'
import CategoryCard from './CategoryCard'

const CategoriesGrid = () => {
  const { places } = usePlacesStore()
  const getPlacesByCategory = (cat) => places.filter(p => p.category === cat)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categoriesInfo.map((cat) => (
          <CategoryCard
            key={cat.id}
            cat={cat}
            placesCount={getPlacesByCategory(cat.id).length}
          />
        ))}
      </div>
    </div>
  )
}

export default CategoriesGrid