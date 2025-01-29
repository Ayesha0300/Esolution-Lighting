import Image from "next/image"
import { Button } from "@/components/ui/button"

const lamps = [
  {
    name: "Modern Table Lamp",
    collection: "Contemporary Living",
    price: 299,
    image: "https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg",
  },
  {
    name: "Vintage Floor Lamp",
    collection: "Classic Series",
    price: 499,
    image: "https://images.pexels.com/photos/1123262/pexels-photo-1123262.jpeg",
  },
  {
    name: "Desk Study Lamp",
    collection: "Work Essential",
    price: 199,
    image: "https://images.pexels.com/photos/1494279/pexels-photo-1494279.jpeg",
  },
  // Add more lamps...
]

export default function LampsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Designer Lamps Collection</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {lamps.map((lamp, i) => (
          <div key={i} className="group relative">
            <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
              <Image
                src={lamp.image}
                alt={lamp.name}
                width={500}
                height={500}
                className="object-cover w-full h-full transition-transform group-hover:scale-105"
              />
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-semibold">{lamp.name}</h3>
              <p className="text-sm text-gray-600">{lamp.collection}</p>
              <p className="mt-2 font-semibold">${lamp.price.toLocaleString()}</p>
              <Button className="mt-2">Add to Cart</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 