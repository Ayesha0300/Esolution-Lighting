import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ShoppingCart, Eye } from 'lucide-react'
import Link from 'next/link'
import { useCart } from '@/lib/context/cart-context'
import { useToast } from '@/components/ui/use-toast'
import { PLACEHOLDER_IMAGE } from '@/lib/constants'

interface ProductCardProps {
  id: number
  name: string
  collection: string
  price: number
  image: string
  description: string
}

export function ProductCard({ id, name, collection, price, image, description }: ProductCardProps) {
  const { addToCart } = useCart()
  const { toast } = useToast()

  const handleAddToCart = () => {
    try {
      addToCart({
        id,
        name,
        collection,
        price,
        image: image || PLACEHOLDER_IMAGE,
        description
      })

      toast({
        title: "Success",
        description: `${name} has been added to your cart.`,
        duration: 2000,
      })
    } catch (error) {
      console.error('Error adding to cart:', error)
      toast({
        title: "Error",
        description: "Failed to add item to cart",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="relative h-48">
        <Image
          src={image || PLACEHOLDER_IMAGE}
          alt={name}
          fill
          className="object-cover"
        />
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1">{name}</h3>
        <p className="text-gray-600 text-sm mb-2">{collection}</p>
        <p className="font-bold text-lg mb-4">${price.toLocaleString()}</p>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            asChild
          >
            <Link href={`/product/${id}`}>
              <Eye className="w-4 h-4 mr-2" />
              View Details
            </Link>
          </Button>
          
          <Button
            size="sm"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  )
} 