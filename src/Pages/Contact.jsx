import React from 'react'
import ContactHero from '../components/contact/ContactHero'
import ContactInfo from '../components/contact/ContactInfo'
import ContactForm from '../components/contact/ContactForm'
import ContactFAQ  from '../components/contact/ContactFAQ'
import Footer      from '../components/Footer'

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <ContactHero />

      {/* CONTACT INFO + FORM */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <ContactInfo />
          <ContactForm />
        </div>
      </div>

      <ContactFAQ />
      <Footer />
    </div>
  )
}

export default Contact