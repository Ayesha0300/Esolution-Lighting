import Image from "next/image"
import { Button } from "@/components/ui/button"

const catalogItems = [
  {
    category: "Interior Lighting",
    items: [
      {
        name: "Crystal Chandelier",
        collection: "Luxury Series",
        price: 4999,
        image: "https://images.pexels.com/photos/5825527/pexels-photo-5825527.jpeg",
        description: "Elegant crystal chandelier perfect for grand spaces",
      },
      {
        name: "Modern Pendant Light",
        collection: "Contemporary",
        price: 8999,
        image: "https://images.pexels.com/photos/2631746/pexels-photo-2631746.jpeg",
        description: "Sleek pendant light with adjustable height",
      },
    ]
  },
  {
    category: "Exterior Lighting",
    items: [
      {
        name: "Garden Path Lights",
        collection: "Outdoor Essential",
        price: 5000,
        image: "https://pixabay.com/get/g2e693430a26d7ec4fd4fa60d9794a1646d74580abc04f09581340b6f9df3f26bb23956fa2bfcff5072ef93b0a5dd49c8a4d0beed07df97f6419d4a439b4a6c9c_1280.jpg",
        description: "Weather-resistant path lighting solution",
      },
      {
        name: "Wall Mounted Lantern",
        collection: "Classic Outdoor",
        price: 4999,
        image: "https://images.pexels.com/photos/276583/pexels-photo-276583.jpeg",
        description: "Traditional style outdoor wall lantern",
      },
    ]
  },
  {
    category: "Designer Lamps",
    items: [
      {
        name: "Modern Table Lamp",
        collection: "Contemporary Living",
        price: 2999,
        image: "https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg",
        description: "Contemporary table lamp with adjustable arm",
      },
      {
        name: "Floor Reading Lamp",
        collection: "Classic Series",
        price: 4999,
        image: "https://images.pexels.com/photos/1123262/pexels-photo-1123262.jpeg",
        description: "Elegant floor lamp perfect for reading corners",
      },
    ]
  }
]

export default function CatalogPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-12">Product Catalog</h1>
      
      {catalogItems.map((category, index) => (
        <div key={index} className="mb-16">
          <h2 className="text-2xl font-semibold mb-8 border-b pb-2">{category.category}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {category.items.map((item, itemIndex) => (
              <div key={itemIndex} className="group">
                <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100 mb-4">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-600">{item.collection}</p>
                  <p className="text-sm text-gray-700">{item.description}</p>
                  <p className="text-lg font-bold">Rs.{item.price.toLocaleString()}</p>
                  <div className="flex space-x-2">
                    <Button>Add to Cart</Button>
                    <Button variant="outline">View Details</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
} 