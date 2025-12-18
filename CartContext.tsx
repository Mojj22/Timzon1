'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import axios from 'axios'
import { useAuth } from './AuthContext'

interface CartItem {
  productId: string
  quantity: number
}

interface Cart {
  items: CartItem[]
  total: number
}

interface CartContextType {
  cart: Cart
  addToCart: (productId: string, quantity: number) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  fetchCart: () => Promise<void>
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart>({ items: [], total: 0 })
  const { user, token } = useAuth()

  useEffect(() => {
    if (user && token) {
      fetchCart()
    }
  }, [user, token])

  const fetchCart = async () => {
    if (!token) return

    try {
      const response = await axios.get('http://localhost:5000/api/cart', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setCart({ items: response.data.items || [], total: 0 })
    } catch (error) {
      console.error('Error fetching cart:', error)
    }
  }

  const addToCart = async (productId: string, quantity: number) => {
    if (!token) {
      alert('Please login to add items to cart')
      return
    }

    try {
      await axios.post(
        'http://localhost:5000/api/cart/add',
        { productId, quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      await fetchCart()
    } catch (error) {
      console.error('Error adding to cart:', error)
    }
  }

  const removeFromCart = async (productId: string) => {
    if (!token) return

    try {
      await axios.delete(`http://localhost:5000/api/cart/remove/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      await fetchCart()
    } catch (error) {
      console.error('Error removing from cart:', error)
    }
  }

  const updateQuantity = async (productId: string, quantity: number) => {
    if (!token) return

    try {
      await axios.put(
        'http://localhost:5000/api/cart/update',
        { productId, quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      await fetchCart()
    } catch (error) {
      console.error('Error updating cart:', error)
    }
  }

  const clearCart = async () => {
    if (!token) return

    try {
      await axios.delete('http://localhost:5000/api/cart/clear', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setCart({ items: [], total: 0 })
    } catch (error) {
      console.error('Error clearing cart:', error)
    }
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, fetchCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

