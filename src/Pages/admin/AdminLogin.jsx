import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import 'remixicon/fonts/remixicon.css'
import { useAdminAuth } from '../../components/context/AdminAuthContext'

const AdminLogin = () => {
  const navigate = useNavigate()
  const { login } = useAdminAuth()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    const success = login(password)
    if (success) {
      navigate('/admin/dashboard')
    } else {
      setError('Incorrect password. Try again.')
      setPassword('')
    }
  }

  return (
    <div className="min-h-screen bg-[#0B1736] flex items-center justify-center px-5 relative overflow-hidden">

      {/* Decorative glow */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, #f97316 0%, transparent 50%), radial-gradient(circle at 80% 20%, #fb923c 0%, transparent 40%)`,
        }}
      />

      <div className="relative z-10 w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8 cursor-pointer" onClick={() => navigate('/')}>
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            <i className="ri-map-pin-line mr-2 text-orange-500"></i>
            Travel<span className="text-orange-500">Bharat</span>
          </h1>
          <p className="text-gray-400 text-xs mt-1">ADMIN PANEL</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <i className="ri-shield-keyhole-line text-3xl text-orange-500"></i>
            </div>
            <h2 className="text-xl font-extrabold text-gray-900">Admin Login</h2>
            <p className="text-gray-500 text-sm mt-1">Enter your password to manage destinations</p>
          </div>

          <form onSubmit={handleSubmit}>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
            <div className="relative mb-2">
              <i className="ri-lock-2-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError('') }}
                placeholder="Enter admin password"
                autoFocus
                className={`w-full pl-11 pr-11 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 transition ${
                  error ? 'border-red-400 focus:ring-red-300' : 'border-gray-300 focus:ring-orange-400'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <i className={showPassword ? 'ri-eye-off-line' : 'ri-eye-line'}></i>
              </button>
            </div>

            {error && (
              <p className="text-red-500 text-xs font-medium mb-4 flex items-center gap-1">
                <i className="ri-error-warning-line"></i> {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition mt-2 flex items-center justify-center gap-2"
            >
              <i className="ri-login-circle-line"></i> Login
            </button>
          </form>

          <button
            onClick={() => navigate('/')}
            className="w-full text-gray-400 hover:text-gray-600 text-sm mt-4 transition"
          >
            ← Back to Website
          </button>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin