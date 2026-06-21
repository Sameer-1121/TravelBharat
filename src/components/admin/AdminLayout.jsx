import React, { useState } from 'react'
import { useNavigate, useLocation, Outlet } from 'react-router-dom'
import 'remixicon/fonts/remixicon.css'
import { useAdminAuth } from '../context/AdminAuthContext'

const navItems = [
  { icon: "ri-dashboard-3-line", label: "Dashboard",     path: "/admin/dashboard" },
  { icon: "ri-map-pin-2-line",   label: "All Places",    path: "/admin/places"    },
  { icon: "ri-add-circle-line",  label: "Add New Place", path: "/admin/places/new" },
]

const AdminLayout = ({ children }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const { logout } = useAdminAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  const isActive = (path) => location.pathname === path

  return (
    <div className="min-h-screen bg-gray-50 flex">

      {/* ── SIDEBAR (desktop) ── */}
      <aside className="hidden lg:flex lg:flex-col w-64 bg-[#0B1736] text-white min-h-screen sticky top-0">
        <div className="p-6 border-b border-white/10">
          <h1 className="text-xl font-bold cursor-pointer" onClick={() => navigate('/')}>
            <i className="ri-map-pin-line mr-2 text-orange-500"></i>
            Travel<span className="text-orange-500">Bharat</span>
          </h1>
          <p className="text-[10px] text-gray-400 mt-1">ADMIN PANEL</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition ${
                isActive(item.path)
                  ? 'bg-orange-500 text-white'
                  : 'text-gray-300 hover:bg-white/10'
              }`}
            >
              <i className={`${item.icon} text-lg`}></i>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10 space-y-1">
          <button
            onClick={() => navigate('/')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-gray-300 hover:bg-white/10 transition"
          >
            <i className="ri-global-line text-lg"></i> View Website
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-red-400 hover:bg-red-500/10 transition"
          >
            <i className="ri-logout-circle-line text-lg"></i> Logout
          </button>
        </div>
      </aside>

      {/* ── MOBILE TOP BAR ── */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-[#0B1736] text-white flex items-center justify-between px-5 py-4">
        <h1 className="text-lg font-bold">
          <i className="ri-map-pin-line mr-2 text-orange-500"></i>
          Travel<span className="text-orange-500">Bharat</span>
        </h1>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-2xl">
          <i className={sidebarOpen ? "ri-close-line" : "ri-menu-line"}></i>
        </button>
      </div>

      {/* ── MOBILE SIDEBAR ── */}
      {sidebarOpen && (
        <div className="lg:hidden fixed top-16 left-0 right-0 z-30 bg-[#0B1736] text-white p-4 space-y-1 shadow-xl">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => { navigate(item.path); setSidebarOpen(false) }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition ${
                isActive(item.path) ? 'bg-orange-500 text-white' : 'text-gray-300 hover:bg-white/10'
              }`}
            >
              <i className={`${item.icon} text-lg`}></i>
              {item.label}
            </button>
          ))}
          <div className="pt-2 border-t border-white/10 space-y-1">
            <button
              onClick={() => { navigate('/'); setSidebarOpen(false) }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-gray-300 hover:bg-white/10 transition"
            >
              <i className="ri-global-line text-lg"></i> View Website
            </button>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-red-400 hover:bg-red-500/10 transition"
            >
              <i className="ri-logout-circle-line text-lg"></i> Logout
            </button>
          </div>
        </div>
      )}

      {/* ── MAIN CONTENT ── */}
      <main className="flex-1 min-h-screen lg:pt-0 pt-16">
        {children}
      </main>
    </div>
  )
}

export default AdminLayout