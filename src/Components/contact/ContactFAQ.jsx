import React from 'react'

const faqs = [
  { q: "Is TravelBharat free to use?",      a: "Yes! TravelBharat is completely free for all users. No registration required." },
  { q: "How accurate is the information?",  a: "All destination data is carefully researched with 95%+ content accuracy guaranteed." },
  { q: "Can I suggest a new destination?",   a: "Absolutely! Use the contact form to suggest destinations you'd like to see added." },
  { q: "Is the website mobile-friendly?",    a: "Yes, TravelBharat is fully responsive and works seamlessly on all devices." },
]

const ContactFAQ = () => {
  return (
    <div className="bg-white py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-10">
          <p className="text-orange-500 font-semibold text-sm uppercase tracking-widest mb-2">FAQ</p>
          <h2 className="text-3xl font-extrabold text-gray-900">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 bg-orange-500 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold mt-0.5">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">{faq.q}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ContactFAQ