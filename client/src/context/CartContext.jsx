import React, { createContext, useContext, useState, useEffect } from 'react'
import toast from 'react-hot-toast'

const CartContext = createContext()

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])

  useEffect(() => {
    const savedCart = localStorage.getItem('nexvora_cart')
    if (savedCart) {
      setCartItems(JSON.parse(savedCart))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('nexvora_cart', JSON.stringify(cartItems))
  }, [cartItems])

  const addToCart = (product, licenseType = 'regular') => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.product._id === product._id && item.licenseType === licenseType)
      if (existingItem) {
        toast.success('Item already in cart')
        return prev
      }
      toast.success('Added to cart')
      return [...prev, { product, licenseType, addedAt: new Date().toISOString() }]
    })
  }

  const removeFromCart = (productId, licenseType) => {
    setCartItems(prev => prev.filter(item => !(item.product._id === productId && item.licenseType === licenseType)))
    toast.success('Removed from cart')
  }

  const clearCart = () => {
    setCartItems([])
    localStorage.removeItem('nexvora_cart')
  }

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = item.licenseType === 'extended' && item.product.extendedPrice 
        ? item.product.extendedPrice 
        : item.product.price
      return total + price
    }, 0)
  }

  const getCartCount = () => {
    return cartItems.length
  }

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    getCartTotal,
    getCartCount
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}
