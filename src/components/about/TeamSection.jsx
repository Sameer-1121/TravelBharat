import React from 'react'
import 'remixicon/fonts/remixicon.css'

const team = [
  { name: "Sameer", role: "Founder & CEO",   icon: "ri-user-star-line",    color: "bg-orange-100 text-orange-500" },
  { name: "ABC",    role: "Content Head",    icon: "ri-edit-2-line",       color: "bg-green-100 text-green-500"   },
  { name: "XYZ",    role: "Lead Developer",  icon: "ri-code-s-slash-line", color: "bg-purple-100 text-purple-500" },
  { name: "PQRS",   role: "UI/UX Designer",  icon: "ri-palette-line",      color: "bg-pink-100 text-pink-500"     },
]

const TeamSection = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <p className="text-orange-500 font-semibold text-sm uppercase tracking-widest mb-2">
          The People
        </p>
        <h2 className="text-3xl font-extrabold text-gray-900">Meet Our Team</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {team.map((member, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center hover:shadow-md hover:-translate-y-1 transition-all"
          >
            <div className={`w-16 h-16 ${member.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
              <i className={`${member.icon} text-3xl`}></i>
            </div>
            <h3 className="font-bold text-gray-900">{member.name}</h3>
            <p className="text-gray-500 text-sm mt-1">{member.role}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TeamSection