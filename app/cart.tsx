"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import Image from "next/image"

interface CartItem {
  id: number
  name: string
  price: number
  image: string
  collection?: string
}

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      setCartItems(JSON.parse(savedCart))
    }
  }, [])

  const removeFromCart = (id: number) => {
    const updatedCart = cartItems.filter((item) => item.id !== id)
    setCartItems(updatedCart)
    localStorage.setItem("cart", JSON.stringify(updatedCart))
  }

  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p className="text-xl text-center">Your cart is empty.</p>
      ) : (
        <div className="space-y-8">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center space-x-4 border-b pb-4">
              <div className="w-24 h-24 relative">
                <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover rounded" />
              </div>
              <div className="flex-grow">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                {item.collection && <p className="text-sm text-gray-600">{item.collection}</p>}
                <p className="text-lg font-bold">Rs.{item.price.toLocaleString()}</p>
              </div>
              <Button variant="destructive" onClick={() => removeFromCart(item.id)}>
                <Trash2 className="w-5 h-5" />
              </Button>
            </div>
          ))}
          <div className="flex justify-between items-center pt-4">
            <h2 className="text-2xl font-bold">Total: Rs.{totalPrice.toLocaleString()}</h2>
            <Button size="lg">Proceed to Checkout</Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart