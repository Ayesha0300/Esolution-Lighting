"use client"

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useCart } from '@/lib/context/cart-context'
import { Button } from '@/components/ui/button'
import { ShoppingCart, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useToast } from '@/components/ui/use-toast'
import { PLACEHOLDER_IMAGE } from '@/lib/constants'

interface Product {
  id: number
  name: string
  collection: string
  price: number
  image: string
  description: string
}

export default function ProductDetail({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null)
  const { addToCart } = useCart()
  const { toast } = useToast()

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        id: product.id,
        name: product.name,
        collection: product.collection,
        price: product.price,
        image: product.image,
        description: product.description
      })
      
      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart.`,
      })
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/catalog" className="inline-flex items-center mb-6 text-blue-600 hover:text-blue-800">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Catalog
      </Link>

      {product ? (
        <div className="grid md:grid-cols-2 gap-8">
          <div className="relative h-[400px]">
            <Image
              src={product.image || PLACEHOLDER_IMAGE}
              alt={product.name || 'Product'}
              fill
              className="object-cover rounded-lg"
            />
          </div>
          
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-gray-600 mb-2">{product.collection}</p>
            <p className="text-2xl font-bold mb-4">${product.price.toLocaleString()}</p>
            <p className="text-gray-700 mb-6">{product.description}</p>
            
            <Button 
              onClick={handleAddToCart}
              className="w-full md:w-auto"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add to Cart
            </Button>
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">Loading...</p>
        </div>
      )}
    </div>
  )
} 