"use client"

import { useState, useEffect } from "react"

interface CartItem {
  id: number
  name: string
  price: number
  image: string
  collection?: string
  quantity: number
  description?: string
  isFavorite?: boolean
}

export function useCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      setCartItems(JSON.parse(savedCart))
    }
  }, [])

  const saveCart = (items: CartItem[]) => {
    setCartItems(items)
    localStorage.setItem("cart", JSON.stringify(items))
  }

  const addToCart = (item: CartItem) => {
    const existingItem = cartItems.find((i) => i.id === item.id)
    if (existingItem) {
      const updatedCart = cartItems.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i))
      saveCart(updatedCart)
    } else {
      saveCart([...cartItems, { ...item, quantity: 1 }])
    }
  }

  const removeFromCart = (id: number) => {
    saveCart(cartItems.filter((item) => item.id !== id))
  }

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return
    const updatedCart = cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item))
    saveCart(updatedCart)
  }

  const toggleFavorite = (id: number) => {
    const updatedCart = cartItems.map((item) => (item.id === id ? { ...item, isFavorite: !item.isFavorite } : item))
    saveCart(updatedCart)
  }

  return {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    toggleFavorite,
  }
}

