import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAdminAuth } from '../context/AdminAuthContext'

// Wrap any admin-only page with this. If not logged in, redirects to /admin/login
const ProtectedAdminRoute = ({ children }) => {
  const { isAuthenticated } = useAdminAuth()

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />
  }

  return children
}

export default ProtectedAdminRoute