import React from 'react'
import AboutHero      from '../components/about/AboutHero'
import MissionSection from '../components/about/MissionSection'
import ValuesSection  from '../components/about/ValuesSection'
import TeamSection    from '../components/about/TeamSection'
import AboutCTA       from '../components/about/AboutCTA'
import Footer         from '../components/Footer'

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <AboutHero />
      <MissionSection />
      <ValuesSection />
      <TeamSection />
      <AboutCTA />
      <Footer />
    </div>
  )
}

export default About