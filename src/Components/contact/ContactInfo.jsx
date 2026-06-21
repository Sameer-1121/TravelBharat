import React from 'react'
import { Link } from 'react-router-dom'
import 'remixicon/fonts/remixicon.css'

const contactInfo = [
  { icon: "ri-map-pin-line",  title: "Address",       value: "India Tourism Development Corporation, Janpath, New Delhi - 110001", color: "bg-orange-50 text-orange-500" },
  { icon: "ri-mail-line",     title: "Email",         value: "balsindersingh@gmail.com",                                          color: "bg-blue-50 text-blue-500"     },
  { icon: "ri-phone-line",    title: "Phone",         value: "+91 1800-111-363 (Toll Free)",                                       color: "bg-green-50 text-green-500"   },
  { icon: "ri-time-line",     title: "Working Hours", value: "Monday – Saturday: 9:00 AM – 6:00 PM",                               color: "bg-purple-50 text-purple-500" },
]

const socialLinks = [
  { icon: "ri-instagram-line", color: "hover:bg-pink-500", link: "https://www.instagram.com/sam_eer_1112/" },
  { icon: "ri-twitter-x-line", color: "hover:bg-black",    link: "https://twitter.com/sam_eer_1112"        },
  { icon: "ri-facebook-fill",  color: "hover:bg-blue-600", link: "https://www.facebook.com/sam_eer_1112"   },
  { icon: "ri-youtube-line",   color: "hover:bg-red-500",  link: "https://www.youtube.com/sam_eer_1112"    },
]

const ContactInfo = () => {
  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-extrabold text-gray-900 mb-6">Contact Information</h2>

      {contactInfo.map((info, i) => (
        <div
          key={i}
          className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-start gap-4 hover:shadow-md transition"
        >
          <div className={`w-12 h-12 ${info.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
            <i className={`${info.icon} text-xl`}></i>
          </div>
          <div>
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide">{info.title}</p>
            <p className="text-gray-800 text-sm font-medium mt-1 leading-relaxed">{info.value}</p>
          </div>
        </div>
      ))}

      {/* Social */}
      <div className="bg-[#0B1736] rounded-2xl p-5 text-center">
        <p className="text-white font-bold mb-3">Follow Us</p>
        <div className="flex justify-center gap-3">
          {socialLinks.map((s, i) => (
            <Link
              key={i}
              to={s.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-10 h-10 bg-white/10 ${s.color} text-white rounded-full flex items-center justify-center transition hover:scale-110`}
            >
              <i className={s.icon}></i>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ContactInfo