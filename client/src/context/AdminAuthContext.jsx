import React, { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

const AdminAuthContext = createContext()

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext)
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider')
  }
  return context
}

export const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null)
  const [loading, setLoading] = useState(true)

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

  useEffect(() => {
    checkAdminAuth()
  }, [])

  const checkAdminAuth = async () => {
    try {
      const token = localStorage.getItem('adminToken')
      if (token) {
        const response = await axios.get(`${API_URL}/admin/auth/me`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        if (response.data.success) {
          setAdmin(response.data.admin)
        } else {
          localStorage.removeItem('adminToken')
          setAdmin(null)
        }
      } else {
        setAdmin(null)
      }
    } catch (error) {
      localStorage.removeItem('adminToken')
      setAdmin(null)
    } finally {
      setLoading(false)
    }
  }

  const loginAdmin = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/admin/auth/login`, { email, password })
      if (response.data.success) {
        const { token, admin } = response.data
        localStorage.setItem('adminToken', token)
        setAdmin(admin)
        return { success: true }
      }
      return { success: false, message: response.data.message || 'Login failed' }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed. Please check credentials.'
      }
    }
  }

  const logoutAdmin = async () => {
    try {
      const token = localStorage.getItem('adminToken')
      if (token) {
        await axios.post(`${API_URL}/admin/auth/logout`, {}, {
          headers: { Authorization: `Bearer ${token}` }
        })
      }
    } catch (e) {
      // ignore
    } finally {
      localStorage.removeItem('adminToken')
      setAdmin(null)
    }
  }

  // Helper for admin authorized axios calls
  const getAuthHeader = () => {
    const token = localStorage.getItem('adminToken')
    return token ? { Authorization: `Bearer ${token}` } : {}
  }

  return (
    <AdminAuthContext.Provider
      value={{
        admin,
        loading,
        isAuthenticated: Boolean(admin),
        loginAdmin,
        logoutAdmin,
        checkAdminAuth,
        getAuthHeader
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  )
}

