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
        image: "https://pixabay.com/get/g1d364ae56414a76dfcd99eece095cdb9d32b7d6fd8ab3e7c027e3a7618ba8d621d8091d41523c3ff6b72c2c0b103f7f7_1280.jpg",
        description: "Elegant crystal chandelier with intricate detailing",
        style: "Classic",
      },
      {
        name: "Modern Globe Chandelier",
        collection: "Contemporary",
        price: 34999,
        image: "https://pixabay.com/get/gfe92796b6a32559f06c517c860bbdae89a5fbfd8ed49804591b0fb4c1d81b3fb78a709768e6db4fbd7f51e700e8de69e9aef038e62521c47730dfe08e6db763d_1280.jpg",
        description: "Spherical modern chandelier with LED lighting",
        style: "Modern",
      },
      {
        name: "Art Deco Chandelier",
        collection: "Vintage Series",
        price: 28999,
        image: "https://pixabay.com/get/gb7cccf07e81cc6beeea2ac7553d5eee973c5efdc02213d8f01d7a4a8228fa62f462fa4a9c38f7d4a78fc83a388605b32d5bd430b31d42f7c91d4b6fdb7c23766_1280.jpg",
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
        image: "https://pixabay.com/get/g223406fa6245741d510cf86ed9412ace70b2b36b3f922fa0bf4173f53478c779b243413e96dec95c4d52f53573db4e66_1280.jpg",
        description: "Sleek wall sconce with adjustable arm",
        style: "Modern",
      },
      {
        name: "Crystal Wall Light",
        collection: "Luxury Elements",
        price: 12999,
        image: "https://pixabay.com/get/gda2f4e07cea86b8f04b5fbaa427c81a3a1f64fc6655dacf63811531d6c7c72520124a5497fbc85c099da6d91d7da6a9826cd7bf55ce09aca7f3e01e45a93b3b5_1280.jpg",
        description: "Crystal wall light with gold-plated finish",
        style: "Classic",
      },
      {
        name: "Industrial Wall Lamp",
        collection: "Industrial Chic",
        price: 6999,
        image: "https://pixabay.com/get/gcf9bdb9f62821ecdc0c1f91c730d6207bebdb442b4eebc8824f0266e7dfccfd711078d7cdd18afb2e27964de52897b4a_1280.jpg",
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
        image: "https://pixabay.com/get/g6062b06eb7440ecadd1cf50913154c5abcef94c3b9a243e761956fe97667f4d85b5df6eb45bac85f56c050451bf995755024da91b3153be9b2612a3c0ce1cd99_1280.jpg",
        description: "Minimalist glass pendant with brass accents",
        style: "Modern",
      },
      {
        name: "Ring Lights",
        collection: "Modern Series",
        price: 18999,
        image: "https://pixabay.com/get/gb302bdb834206aa81c76b1e6f7e029b1ccce4f3e94a4654361942949ae278116744f423949c338db0ea04e03deac4c5dbc81a727c5a5fba1cc27d03bde462dff_1280.jpg",
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