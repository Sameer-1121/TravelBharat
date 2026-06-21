import React, { createContext, useContext, useState, useEffect } from 'react'

// ─── CONFIG ───────────────────────────────────────────────────
// Change this to your own admin password
const ADMIN_PASSWORD = "travelbharat2026"

const AdminAuthContext = createContext()

export const AdminAuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const session = localStorage.getItem('tb_admin_session')
    if (session === 'true') setIsAuthenticated(true)
  }, [])

  const login = (password) => {
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem('tb_admin_session', 'true')
      setIsAuthenticated(true)
      return true
    }
    return false
  }

  const logout = () => {
    localStorage.removeItem('tb_admin_session')
    setIsAuthenticated(false)
  }

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  )
}

export const useAdminAuth = () => useContext(AdminAuthContext)