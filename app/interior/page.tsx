"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const interiorLights = [
  {
    category: "Chandeliers",
    items: [
      {
        name: "Crystal Palace Chandelier",
        collection: "Royal Series",
        price: 49999,
        image: "https://pixabay.com/get/g0b60619fdd96e5bf0a27cfc98468b9d2bd5f77380ab7f1fa041917a36e3410fae7b05aec2c136a54850fdb9cc02a9988_1280.jpg",
        description: "Elegant crystal chandelier with intricate detailing",
        style: "Classic",
      },
      {
        name: "Modern Globe Chandelier",
        collection: "Contemporary",
        price: 34999,
        image: "https://pixabay.com/get/g869826ae370038b0ebb1abdd47c16d1d1bb7329a6912c67e5fc8e44b32cbe2254a9d889ffbb9b33633fa9d35ec99e78a154702047c8d4fb20a798b9c196ab10b_1280.jpg",
        description: "Spherical modern chandelier with LED lighting",
        style: "Modern",
      },
      {
        name: "Art Deco Chandelier",
        collection: "Vintage Series",
        price: 28999,
        image: "https://pixabay.com/get/g33f41c2eb4c8cb729e83758e0a1a1f08decb08e9ab200b48888f0e931ff91bd66ec2de37184c9e2c8ca601b5e84ac47a7e63339ab4cf0f9b1bc85d7b8f001463_1280.jpg",
        description: "Art deco inspired chandelier with crystal accents",
        style: "Vintage",
      },
    ]
  },
  {
    category: "Wall Lights",
    items: [
      {
        name: "Contemporary Sconce",
        collection: "Urban Modern",
        price: 8999,
        image: "https://pixabay.com/get/g51b4d366ef22fcb31cc2a42e99fed86af8883064d9101e3ce0b89620fffeaed0c68f69140bfc1b39557f6ccc3b3b70231f5f6a651922f7258fbc7ab36c4e0f51_1280.jpg",
        description: "Sleek wall sconce with adjustable arm",
        style: "Modern",
      },
      {
        name: "Crystal Wall Light",
        collection: "Luxury Elements",
        price: 12999,
        image: "https://pixabay.com/get/gad33bf9a87fafc30568fd84c383f0f56be92a9fe865c1c8dbaf2b9f66761641088279466779089a3f812d39a5d36e844c44c29dfad1a5a4cdefa296ece3a77f9_1280.jpg",
        description: "Crystal wall light with gold-plated finish",
        style: "Classic",
      },
      {
        name: "Industrial Wall Lamp",
        collection: "Industrial Chic",
        price: 6999,
        image: "https://pixabay.com/get/g952214ad5004846c912035c81454842b0f84455149bee159bc2322289cf5ea45b110c8a377ade56546c47ccbbc39d66de4e4bc40b9013bb8cf7589cc99085327_1280.jpg",
        description: "Vintage industrial style wall lamp",
        style: "Industrial",
      },
    ]
  },
  {
    category: "Pendant Lights",
    items: [
      {
        name: "Modern Glass Pendant",
        collection: "Contemporary",
        price: 15999,
        image: "https://pixabay.com/get/ge1df55d7a059e13713c960b8c3a4adff5ab49c4876a0669b90460422ec8a5a88ab4e4eb25fd472b4371f2e11a49589d9_1280.jpg",
        description: "Minimalist glass pendant with brass accents",
        style: "Modern",
      },
      {
        name: "Ring Lights",
        collection: "Modern Series",
        price: 18999,
        image: "https://pixabay.com/get/gd59ca0c6f85a2e17c1259f47ab949693b34aa98be5603f30e91fb14d676002e5ea125884ade6540a5e56185a83114ddf13adaa580bc5298ec94ed7e8f308fc63_1280.jpg",
        description: "Modern LED ring light with adjustable brightness and color temperature",
        style: "Modern",
      },
    ]
  }
]

export default function InteriorPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedStyle, setSelectedStyle] = useState<string>("all")
  const [priceRange, setPriceRange] = useState<string>("all")

  const filterProducts = () => {
    let filtered = [...interiorLights]

    if (selectedCategory !== "all") {
      filtered = filtered.filter(category => 
        category.category.toLowerCase() === selectedCategory.toLowerCase()
      )
    }

    filtered = filtered.map(category => ({
      ...category,
      items: category.items.filter(item => {
        const styleMatch = selectedStyle === "all" || item.style.toLowerCase() === selectedStyle.toLowerCase()
        const priceMatch = priceRange === "all" || 
          (priceRange === "under25k" && item.price < 25000) ||
          (priceRange === "25k-50k" && item.price >= 25000 && item.price <= 50000) ||
          (priceRange === "over50k" && item.price > 50000)
        
        return styleMatch && priceMatch
      })
    })).filter(category => category.items.length > 0)

    return filtered
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        <h1 className="text-4xl font-bold text-center mb-12">Interior Lighting Collection</h1>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Select onValueChange={setSelectedCategory} defaultValue="all">
            <SelectTrigger>
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="chandeliers">Chandeliers</SelectItem>
              <SelectItem value="wall lights">Wall Lights</SelectItem>
              <SelectItem value="pendant lights">Pendant Lights</SelectItem>
            </SelectContent>
          </Select>

          <Select onValueChange={setSelectedStyle} defaultValue="all">
            <SelectTrigger>
              <SelectValue placeholder="Select Style" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Styles</SelectItem>
              <SelectItem value="modern">Modern</SelectItem>
              <SelectItem value="classic">Classic</SelectItem>
              <SelectItem value="industrial">Industrial</SelectItem>
              <SelectItem value="vintage">Vintage</SelectItem>
            </SelectContent>
          </Select>

          <Select onValueChange={setPriceRange} defaultValue="all">
            <SelectTrigger>
              <SelectValue placeholder="Price Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Prices</SelectItem>
              <SelectItem value="under25k">Under Rs.25,000</SelectItem>
              <SelectItem value="25k-50k">Rs.25,000 - Rs.50,000</SelectItem>
              <SelectItem value="over50k">Over Rs.50,000</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Product Grid */}
        {filterProducts().map((category) => (
          <div key={category.category} className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">{category.category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {category.items.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <div className="relative h-64">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{item.collection}</p>
                    <p className="text-sm text-gray-500 mb-4">{item.description}</p>
                    <div className="flex justify-between items-center">
                      <p className="text-lg font-bold">Rs.{item.price.toLocaleString()}</p>
                      <Button>Add to Cart</Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  )
} 