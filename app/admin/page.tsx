"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Package,
  Users,
  DollarSign,
  ShoppingCart,
  Trash2,
  Edit,
  Plus,
} from "lucide-react"
import { motion } from "framer-motion"

interface Product {
  id: number
  name: string
  collection: string
  price: number
  image: string
  description: string
  stock: number
}

const initialProducts: Product[] = [
  {
    id: 1,
    name: "Crystal Palace Chandelier",
    collection: "Royal Series",
    price: 4999,
    image: "https://cdn.pixabay.com/photo/2017/02/17/15/24/chandelier-2074252_1280.jpg",
    description: "Elegant crystal chandelier with intricate detailing",
    stock: 5,
  },
  // Add more initial products as needed
]

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [newProduct, setNewProduct] = useState<Omit<Product, "id">>({
    name: "",
    collection: "",
    price: 0,
    image: "",
    description: "",
    stock: 0,
  })
  const [isEditing, setIsEditing] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)

  const stats = [
    { title: "Total Products", value: products.length, icon: Package },
    { title: "Total Orders", value: 25, icon: ShoppingCart },
    { title: "Total Customers", value: 120, icon: Users },
    { title: "Revenue", value: "Rs.150,000", icon: DollarSign },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isEditing && editingId) {
      setProducts(products.map(p => 
        p.id === editingId ? { ...newProduct, id: editingId } : p
      ))
      setIsEditing(false)
      setEditingId(null)
    } else {
      const productWithId = { ...newProduct, id: products.length + 1 }
      setProducts([...products, productWithId])
    }
    setNewProduct({
      name: "",
      collection: "",
      price: 0,
      image: "",
      description: "",
      stock: 0,
    })
  }

  const handleEdit = (product: Product) => {
    setNewProduct(product)
    setIsEditing(true)
    setEditingId(product.id)
  }

  const handleDelete = (id: number) => {
    setProducts(products.filter(p => p.id !== id))
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <stat.icon className="h-8 w-8 text-blue-500" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Product Management */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Add/Edit Product Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <h2 className="text-xl font-bold mb-4">
              {isEditing ? "Edit Product" : "Add New Product"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                placeholder="Product Name"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                required
              />
              <Input
                placeholder="Collection"
                value={newProduct.collection}
                onChange={(e) => setNewProduct({ ...newProduct, collection: e.target.value })}
                required
              />
              <Input
                type="number"
                placeholder="Price"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                required
              />
              <Input
                type="number"
                placeholder="Stock"
                value={newProduct.stock}
                onChange={(e) => setNewProduct({ ...newProduct, stock: Number(e.target.value) })}
                required
              />
              <Input
                placeholder="Image URL"
                value={newProduct.image}
                onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                required
              />
              <Textarea
                placeholder="Description"
                value={newProduct.description}
                onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                required
              />
              <Button type="submit" className="w-full">
                {isEditing ? "Update Product" : "Add Product"}
              </Button>
            </form>
          </motion.div>

          {/* Product List */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <h2 className="text-xl font-bold mb-4">Product List</h2>
            <div className="space-y-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="border p-4 rounded-lg flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-semibold">{product.name}</h3>
                    <p className="text-sm text-gray-500">
                      Rs.{product.price.toLocaleString()} | Stock: {product.stock}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(product)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(product.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
} 