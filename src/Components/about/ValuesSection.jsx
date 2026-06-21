import React from 'react'
import 'remixicon/fonts/remixicon.css'

const values = [
  { icon: "ri-heart-line",        title: "Passion for India",    desc: "We deeply love every corner of India and want to share its beauty with the world.",          color: "text-red-500 bg-red-50"       },
  { icon: "ri-shield-check-line", title: "Verified Information", desc: "All destination data is carefully researched and verified for accuracy.",                    color: "text-green-500 bg-green-50"   },
  { icon: "ri-global-line",       title: "Accessible to All",    desc: "We believe travel knowledge should be free and accessible to every Indian.",                color: "text-blue-500 bg-blue-50"     },
  { icon: "ri-leaf-line",         title: "Responsible Tourism",  desc: "We promote sustainable and responsible tourism across all destinations.",                   color: "text-emerald-500 bg-emerald-50" },
]

const ValuesSection = () => {
  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-12">
          <p className="text-orange-500 font-semibold text-sm uppercase tracking-widest mb-2">
            What We Stand For
          </p>
          <h2 className="text-3xl font-extrabold text-gray-900">Our Values</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => (
            <div key={i} className="text-center p-6 rounded-2xl border border-gray-100 hover:shadow-md transition">
              <div className={`w-14 h-14 ${v.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                <i className={`${v.icon} text-2xl`}></i>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{v.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ValuesSection