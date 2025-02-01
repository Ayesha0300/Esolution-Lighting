"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, PlusCircle, Heart, X } from "lucide-react"
import { useCart } from "@/lib/hooks/useCart"
import { PLACEHOLDER_IMAGE } from "@/lib/constants"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface NewItem {
  name: string
  collection: string
  price: number
  image: string
  quantity: number
  description: string
}

export default function CartPage() {
  const { cartItems, addToCart, removeFromCart, updateQuantity, toggleFavorite } = useCart()
  const formRef = useRef<HTMLFormElement>(null)
  const [totalItems, setTotalItems] = useState(0)

  const [newItem, setNewItem] = useState<NewItem>({
    name: "",
    collection: "",
    price: 0,
    image: "",
    quantity: 0,
    description: "",
  })

  useEffect(() => {
    const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)
    setTotalItems(itemCount)
  }, [cartItems])

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newItem.name || newItem.price <= 0) {
      alert("Please fill in all required fields")
      return
    }
    if (newItem.image && !isValidUrl(newItem.image)) {
      alert("Please enter a valid image URL")
      return
    }
    addToCart({
      id: Date.now(),
      name: newItem.name,
      collection: newItem.collection,
      price: Number(newItem.price),
      image: newItem.image || PLACEHOLDER_IMAGE,
      description: newItem.description,
      quantity: 1,
      isFavorite: false,
    })
    formRef.current?.reset()
    setNewItem({ name: "", collection: "", price: 0, image: "", description: "", quantity: 0 })
  }

  const isValidUrl = (url: string) => {
    try {
      new URL(url)
      return true
    } catch (e) {
      return false
    }
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = cartItems.length > 0 ? 30 : 0
  const total = subtotal + shipping

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Shopping Cart ({totalItems} items)</h1>
        <nav className="flex gap-4">
          <Link href="/interior">
            <Button variant="outline">Interior</Button>
          </Link>
          <Link href="/exterior">
            <Button variant="outline">Exterior</Button>
          </Link>
          <Link href="/catalog">
            <Button variant="outline">Catalog</Button>
          </Link>
        </nav>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              {cartItems.length === 0 ? (
                <p className="text-center text-gray-500 py-8">Your shopping cart is empty</p>
              ) : (
                <div className="space-y-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center py-4 border-b border-gray-100">
                      <div className="flex items-center space-x-4">
                        <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-gray-600">
                          <X className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => toggleFavorite(item.id)}
                          className={cn(
                            "transition-colors",
                            item.isFavorite ? "text-red-500" : "text-gray-400 hover:text-gray-600",
                          )}
                        >
                          <Heart className="w-4 h-4" fill={item.isFavorite ? "currentColor" : "none"} />
                        </button>
                      </div>
                      <div className="w-20 h-20 relative ml-4">
                        <Image
                          src={item.image || PLACEHOLDER_IMAGE}
                          alt={item.name}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                      <div className="flex-grow ml-6">
                        <h3 className="font-medium">{item.name}</h3>
                        {item.collection && <p className="text-sm text-gray-500">{item.collection}</p>}
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2 bg-gray-50 rounded-full px-2 py-1">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="text-gray-500 hover:text-gray-700"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="text-gray-500 hover:text-gray-700"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="w-24 text-right">
                          <p className="font-medium">Rs.{(item.price * item.quantity).toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-6 sticky top-4">
            <h2 className="text-xl font-semibold mb-4">Add New Item</h2>
            <form ref={formRef} onSubmit={handleAddItem} className="space-y-4">
              <Input
                name="name"
                placeholder="Item Name"
                value={newItem.name}
                onChange={(e) => setNewItem((prev) => ({ ...prev, name: e.target.value }))}
                required
              />
              <Input
                name="collection"
                placeholder="Collection"
                value={newItem.collection}
                onChange={(e) => setNewItem((prev) => ({ ...prev, collection: e.target.value }))}
              />
              <Input
                name="price"
                type="number"
                placeholder="Price"
                value={newItem.price || ""}
                onChange={(e) => setNewItem((prev) => ({ ...prev, price: Math.max(0, Number(e.target.value)) }))}
                min="0"
                step="0.01"
                required
              />
              <Input
                name="image"
                placeholder="Image URL"
                value={newItem.image}
                onChange={(e) => setNewItem((prev) => ({ ...prev, image: e.target.value }))}
              />
              <Input
                name="description"
                placeholder="Description"
                value={newItem.description}
                onChange={(e) => setNewItem((prev) => ({ ...prev, description: e.target.value }))}
              />
              <Button type="submit" className="w-full">
                <PlusCircle className="w-4 h-4 mr-2" /> Add to Cart
              </Button>
            </form>

            {cartItems.length > 0 && (
              <div className="mt-8 space-y-4">
                <div className="flex justify-between text-sm">
                  <span>Subtotal ({totalItems} items)</span>
                  <span>Rs.{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span>Rs.{shipping.toLocaleString()}</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>Rs.{total.toLocaleString()}</span>
                  </div>
                </div>
                <Button className="w-full" size="lg">
                  Proceed to Checkout
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

