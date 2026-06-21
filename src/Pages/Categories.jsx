import React from 'react'
import CategoriesHero from '../components/categories/CategoriesHero'
import CategoriesGrid from '../components/categories/CategoriesGrid'
import CategoriesStats from '../components/categories/CategoriesStats'
import Footer from '../components/Footer'

const Categories = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <CategoriesHero />
      <CategoriesGrid />
      <CategoriesStats />
      <Footer />
    </div>
  )
}

export default Categories