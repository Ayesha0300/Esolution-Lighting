"use client"

import { ProductCard } from '@/components/ui/product-card'

const products = [
  {
    id: 1,
    name: "Crystal Chandelier",
    collection: "Luxury Series",
    price: 2999,
    image: "https://images.pexels.com/photos/5825527/pexels-photo-5825527.jpeg",
    description: "Elegant crystal chandelier perfect for grand spaces"
  },
  // Add more products...
]

export default function CatalogPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Our Products</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <ProductCard
            key={product.id}
            {...product}
          />
        ))}
      </div>
    </div>
  )
} 