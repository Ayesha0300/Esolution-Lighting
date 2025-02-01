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
import { loadStripe } from '@stripe/stripe-js';

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

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

  const makePayment = async () => {
    const stripe = await loadStripe("pk_test_51PX0PeFcW03okV5Wv4nLAjzyRxtQmufvLtGoSWd4ilbf7urS3uMXxtFcpFfQCwSWMUKyrsTKsbxuhXTz4BIziWAz00Xci2jxOj")
    const body = {
        product: cartItems
    }
    const headers = {
        "Content-type": "application/json"
    }
    const response = await fetch(`${API_URL}/create-checkout-session`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body)
    });

    const session = await response.json();

    const result = await stripe?.redirectToCheckout({
        sessionId: session.id
    });

    if (result?.error) {
        console.error("Stripe Checkout Error:", result.error);
        alert("There was an issue processing your payment. Please try again.");
      }
      
  }

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
          <Input name="name" placeholder="Item Name" value={newItem.name} onChange={(e) => setNewItem((prev) => ({ ...prev, name: e.target.value }))} required />
          <Input name="collection" placeholder="Collection" value={newItem.collection} onChange={(e) => setNewItem((prev) => ({ ...prev, collection: e.target.value }))} />
          <Input name="price" type="number" placeholder="Price" value={newItem.price || ""} onChange={(e) => setNewItem((prev) => ({ ...prev, price: Math.max(0, Number(e.target.value)) }))} min="0" step="0.01" required />
          <Input name="image" placeholder="Image URL" value={newItem.image} onChange={(e) => setNewItem((prev) => ({ ...prev, image: e.target.value }))} />
          <Input name="description" placeholder="Description" value={newItem.description} onChange={(e) => setNewItem((prev) => ({ ...prev, description: e.target.value }))} className="md:col-span-2" />
          <Button type="submit" className="md:col-span-2">
            <PlusCircle className="w-4 h-4 mr-2" /> Add to Cart
          </Button>
        </form>
      </div>
      <CheckoutButton items={cartItems} />
    </div>
  )
}
