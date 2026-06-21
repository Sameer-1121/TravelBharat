import React from 'react'
import { useNavigate } from 'react-router-dom'
import 'remixicon/fonts/remixicon.css'

const Footer = () => {
  const navigate = useNavigate()

  const quickLinks = [
    { label: "Home",         path: "/"            },
    { label: "All States",   path: "/states"      },
    { label: "Heritage",     path: "/states"      },
    { label: "Nature",       path: "/states"      },
    { label: "Adventure",    path: "/states"      },
    { label: "Religious",    path: "/states"      },
  ]

  const popularStates = [
    { label: "Rajasthan",        path: "/state/rajasthan"        },
    { label: "Kerala",           path: "/state/kerala"           },
    { label: "Himachal Pradesh", path: "/state/himachal-pradesh" },
    { label: "Goa",              path: "/state/goa"              },
    { label: "Uttarakhand",      path: "/state/uttarakhand"      },
    { label: "Gujarat",          path: "/state/gujarat"          },
    { label: "Ladakh",           path: "/state/ladakh"           },
    { label: "Haryana",          path: "/state/haryana"          },
  ]

  const socialLinks = [
    { icon: "ri-instagram-line",  href: "#", color: "hover:text-pink-400"   },
    { icon: "ri-twitter-x-line",  href: "#", color: "hover:text-sky-400"    },
    { icon: "ri-facebook-fill",   href: "#", color: "hover:text-blue-400"   },
    { icon: "ri-youtube-line",    href: "#", color: "hover:text-red-400"    },
    { icon: "ri-whatsapp-line",   href: "#", color: "hover:text-green-400"  },
  ]

  return (
    <footer className="bg-[#0B1736] text-white">

      {/* ── TOP SECTION ── */}
      <div className="max-w-7xl mx-auto px-5 md:px-10 lg:px-14 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div
              className="flex items-center gap-2 cursor-pointer mb-4"
              onClick={() => navigate('/')}
            >
              <i className="ri-map-pin-line text-orange-500 text-3xl"></i>
              <div>
                <h2 className="text-2xl font-bold">
                  Travel<span className="text-orange-500">Bharat</span>
                </h2>
                <p className="text-[10px] text-gray-400 tracking-widest">
                  EXPLORE INDIA STATE BY STATE
                </p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-7 mb-6">
              Your one-stop platform to explore the beauty, culture, heritage, and amazing destinations across India.
            </p>

            {/* Social Icons */}
            <div className="flex gap-3">
              {socialLinks.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  className={`w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-gray-400 ${s.color} transition hover:bg-white/20`}
                >
                  <i className={s.icon}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base font-bold mb-4 flex items-center gap-2">
              <span className="w-1 h-5 bg-orange-500 rounded-full inline-block"></span>
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link, i) => (
                <li key={i}>
                  <button
                    onClick={() => navigate(link.path)}
                    className="text-gray-400 hover:text-orange-400 text-sm transition flex items-center gap-2 group"
                  >
                    <i className="ri-arrow-right-s-line text-orange-500 opacity-0 group-hover:opacity-100 transition"></i>
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular States */}
          <div>
            <h3 className="text-base font-bold mb-4 flex items-center gap-2">
              <span className="w-1 h-5 bg-orange-500 rounded-full inline-block"></span>
              Popular States
            </h3>
            <ul className="space-y-2.5">
              {popularStates.map((state, i) => (
                <li key={i}>
                  <button
                    onClick={() => navigate(state.path)}
                    className="text-gray-400 hover:text-orange-400 text-sm transition flex items-center gap-2 group"
                  >
                    <i className="ri-arrow-right-s-line text-orange-500 opacity-0 group-hover:opacity-100 transition"></i>
                    {state.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Info */}
          <div>
            <h3 className="text-base font-bold mb-4 flex items-center gap-2">
              <span className="w-1 h-5 bg-orange-500 rounded-full inline-block"></span>
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <i className="ri-map-pin-line text-orange-500 text-lg mt-0.5"></i>
                <span>India Tourism Development Corporation, New Delhi, India</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <i className="ri-mail-line text-orange-500 text-lg"></i>
                <span>info@travelbharat.in</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <i className="ri-phone-line text-orange-500 text-lg"></i>
                <span>+91 1800-111-363</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <i className="ri-time-line text-orange-500 text-lg"></i>
                <span>Mon – Sat: 9:00 AM – 6:00 PM</span>
              </li>
            </ul>

            {/* Newsletter */}
            <div className="mt-6">
              <p className="text-sm text-gray-400 mb-2">Subscribe for travel updates</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 bg-white/10 border border-white/10 rounded-xl px-3 py-2 text-sm text-white placeholder-gray-500 outline-none focus:border-orange-500 transition"
                />
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl text-sm font-semibold transition">
                  <i className="ri-send-plane-fill"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── STATS BAR ── */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-5 md:px-10 lg:px-14 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: "28+",   label: "States & UTs"    },
              { value: "800+",  label: "Destinations"    },
              { value: "50K+",  label: "Happy Travelers" },
              { value: "95%+",  label: "Verified Content"},
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-2xl font-extrabold text-orange-500">{stat.value}</div>
                <div className="text-gray-400 text-xs mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── BOTTOM BAR ── */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-5 md:px-10 lg:px-14 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-500 text-xs text-center sm:text-left">
            © 2025 TravelBharat. All rights reserved. | Made with{" "}
            <span className="text-red-400">❤️</span> for Incredible India
          </p>
          <div className="flex gap-5 text-xs text-gray-500">
            <span className="hover:text-orange-400 cursor-pointer transition">Privacy Policy</span>
            <span className="hover:text-orange-400 cursor-pointer transition">Terms of Use</span>
            <span className="hover:text-orange-400 cursor-pointer transition">Sitemap</span>
          </div>
        </div>
      </div>

    </footer>
  )
}

export default Footer