"use client"

import { createContext, useContext, useState, useEffect } from 'react'

interface CartItem {
  id: number
  name: string
  collection: string
  price: number
  image: string
  quantity: number
  description: string
}

interface CartContextType {
  cartItems: CartItem[]
  addToCart: (item: Omit<CartItem, 'quantity'>) => void
  removeFromCart: (id: number) => void
  updateQuantity: (id: number, change: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  // Load cart from localStorage on mount
  useEffect(() => {
    const loadCart = () => {
      try {
        const savedCart = localStorage.getItem('cart')
        if (savedCart) {
          setCartItems(JSON.parse(savedCart))
        }
      } catch (error) {
        console.error('Error loading cart:', error)
      }
    }
    loadCart()
  }, [])

  const saveCartToStorage = (items: CartItem[]) => {
    try {
      localStorage.setItem('cart', JSON.stringify(items))
    } catch (error) {
      console.error('Error saving cart:', error)
    }
  }

  const addToCart = (newItem: Omit<CartItem, 'quantity'>) => {
    setCartItems(currentItems => {
      const existingItem = currentItems.find(item => item.id === newItem.id)
      let updatedItems: CartItem[]

      if (existingItem) {
        updatedItems = currentItems.map(item =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      } else {
        updatedItems = [...currentItems, { ...newItem, quantity: 1 }]
      }

      saveCartToStorage(updatedItems)
      return updatedItems
    })
  }

  const removeFromCart = (id: number) => {
    setCartItems(currentItems => {
      const updatedItems = currentItems.filter(item => item.id !== id)
      saveCartToStorage(updatedItems)
      return updatedItems
    })
  }

  const updateQuantity = (id: number, change: number) => {
    setCartItems(currentItems => {
      const updatedItems = currentItems.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
      saveCartToStorage(updatedItems)
      return updatedItems
    })
  }

  const clearCart = () => {
    setCartItems([])
    localStorage.removeItem('cart')
  }

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart
  }

  return (
    <CartContext.Provider value={value}>
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