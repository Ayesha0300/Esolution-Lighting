"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, Trash2, PlusCircle } from "lucide-react"
import { useCart } from "../../lib/hooks/useCart"
import { PLACEHOLDER_IMAGE } from "@/lib/constants"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CheckoutButton } from "@/components/ui/checkout-button"

interface NewItem {
  name: string
  collection: string
  price: number
  image: string
  quantity: number
  description: string
}

export default function CartPage() {
  const { cartItems, addToCart, removeFromCart, updateQuantity } = useCart()
  const formRef = useRef<HTMLFormElement>(null)

  const [newItem, setNewItem] = useState<NewItem>({
    name: "",
    collection: "",
    price: 0,
    image: "",
    quantity: 0,
    description: "",
  })

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
  const shipping = 30
  const total = subtotal + shipping

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      <nav className="flex gap-6 mb-6">
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
      <div className="mb-8 p-4 border rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Add New Item</h2>
        <form ref={formRef} onSubmit={handleAddItem} className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            className="md:col-span-2"
          />
          <Button type="submit" className="md:col-span-2">
            <PlusCircle className="w-4 h-4 mr-2" /> Add to Cart
          </Button>
        </form>
      </div>
      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">Your cart is empty</p>
          <Link href="/catalog">
            <Button className="mt-4">Continue Shopping</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center space-x-4 border rounded-lg p-4">
                <div className="relative w-24 h-24">
                  <Image
                    src={item.image || PLACEHOLDER_IMAGE}
                    alt={item.name}
                    width={96}
                    height={96}
                    className="object-cover rounded-md"
                  />
                </div>
                <div className="flex-grow">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-600">{item.collection}</p>
                  <p className="font-bold mt-1">${item.price.toLocaleString()}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => updateQuantity(item.id, -1)}
                    aria-label={`Decrease quantity of ${item.name}`}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => updateQuantity(item.id, 1)}
                    aria-label={`Increase quantity of ${item.name}`}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-red-500"
                  onClick={() => removeFromCart(item.id)}
                  aria-label={`Remove ${item.name} from cart`}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="border rounded-lg p-6 space-y-4">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>${shipping.toLocaleString()}</span>
              </div>
              <div className="border-t pt-4 flex justify-between font-bold">
                <span>Total</span>
                <span>${total.toLocaleString()}</span>
              </div>
              <CheckoutButton items={cartItems} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

