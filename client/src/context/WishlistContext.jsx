import React, { createContext, useContext, useState, useEffect } from 'react'
import toast from 'react-hot-toast'

const WishlistContext = createContext()

export const useWishlist = () => {
  const context = useContext(WishlistContext)
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider')
  }
  return context
}

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([])

  useEffect(() => {
    const savedWishlist = localStorage.getItem('nexvora_wishlist')
    if (savedWishlist) {
      setWishlistItems(JSON.parse(savedWishlist))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('nexvora_wishlist', JSON.stringify(wishlistItems))
  }, [wishlistItems])

  const addToWishlist = (product) => {
    setWishlistItems(prev => {
      const exists = prev.find(item => item._id === product._id)
      if (exists) {
        toast.success('Already in wishlist')
        return prev
      }
      toast.success('Added to wishlist')
      return [...prev, product]
    })
  }

  const removeFromWishlist = (productId) => {
    setWishlistItems(prev => prev.filter(item => item._id !== productId))
    toast.success('Removed from wishlist')
  }

  const isInWishlist = (productId) => {
    return wishlistItems.some(item => item._id === productId)
  }

  const clearWishlist = () => {
    setWishlistItems([])
    localStorage.removeItem('nexvora_wishlist')
  }

  const getWishlistCount = () => {
    return wishlistItems.length
  }

  const value = {
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    clearWishlist,
    getWishlistCount
  }

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  )
}
