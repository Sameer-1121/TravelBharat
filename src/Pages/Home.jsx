import React from 'react'
import HeroSection   from '../components/home/HeroSection'
import PopularStates from '../components/home/PopularStates'
import ExploreSection from '../components/home/ExploreSection'
import StatsSection  from '../components/home/StatsSection'
import Footer        from '../components/Footer'

const Home = () => {
  return (
    <div className="w-full bg-white">
      <HeroSection />
      <PopularStates />
      <ExploreSection />
      <StatsSection />
      <Footer />
    </div>
  )
}

export default Home