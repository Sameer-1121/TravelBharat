import React from 'react'
import { usePlacesStore } from '../hooks/PlacesDataContext'
import { categoriesInfo } from './categoriesData'

const CategoriesStats = () => {
  const { places } = usePlacesStore()
  const getPlacesByCategory = (cat) => places.filter(p => p.category === cat)

  return (
    <div className="bg-[#0B1736] py-12">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
        {categoriesInfo.map((cat) => (
          <div key={cat.id}>
            <div className="text-3xl font-extrabold text-orange-500">
              {getPlacesByCategory(cat.id).length}+
            </div>
            <div className="text-gray-400 text-sm mt-1">{cat.title}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CategoriesStats