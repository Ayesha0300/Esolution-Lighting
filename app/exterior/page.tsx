"use client"
import React, { useEffect, useState }  from "react";
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react";
const exteriorLights = [
  {
    name: "Garden Path Lights",
    collection: "Outdoor Essential",
    price: 3199,
    image: "https://pixabay.com/get/gae558b2e13bf773fa017907cef0400613a69c52cbfb56d59461ae4a7850ec03c50711f46e59ca2d2236e959c2b0694b978ddbb25f55e9727c4462fbd5a5c2f3b_1280.jpg", // Beautiful garden path with lights
    description: "Weather-resistant path lighting solution with elegant design",
  },
  {
    name: "Modern Path Lights",
    collection: "Contemporary Series",
    price: 2999,
    image: "https://pixabay.com/get/g0d1e0e178706c38e700528c1552edfbd232bea015804a0c057f5cac49749669ebafff6196f3fafd906d46de00bbca90d27e585710eae268637778085b4447527_1280.jpg", // Modern path lighting
    description: "Sleek, modern pathway illumination",
  },
  {
    name: "LED Garden Spots",
    collection: "Professional Series",
    price: 2459,
    image: "https://pixabay.com/get/gc7a87599a2eba356a68f03251c3a801cee300b8c46e669a5b7d78e7670178359471b9c65b20f826b70311101e7b18e7c_1280.jpg", // Garden spotlights
    description: "Professional-grade LED garden spotlights",
  },
  {
    name: "Solar Garden Lights",
    collection: "Eco Series",
    price: 2498,
    image: "https://pixabay.com/get/ge8df9a3537ce37ef7325478a9a9f26f17fd2aa558fda5928d29b870df01e7f28ca190a6e40ef8c331f1bfade445180fb_1280.jpg", // Solar garden lights
    description: "Solar-powered LED garden illumination",
  },
  {
    name: "Decorative Path Lights",
    collection: "Designer Outdoor",
    price: 2995,
    image: "https://pixabay.com/get/g554a6497bcc9393def4ffceeee36cd62f7632d66894cd4bbf896481fb1903f3d23cafe569fc4a3635787b2f2f4cc9527c4ed7e7d4e9624c5c2344565ddbfb8fb_1280.jpg", // Decorative path lights
    description: "Artistic path lighting with unique patterns",
  },
  {
    name: "Modern Bollard Lights",
    collection: "Contemporary Path",
    price: 3999,
    image: "https://pixabay.com/get/g6a055da4ad4e49209836c9e76af3d8e1ae25063c32258c907f50735a1f0464f7a106e0254214d89dbdacded0e3465f6d757978e2b7ab34a77c0d828ed1a3f7ac_1280.jpg", // Modern bollard light
    description: "Contemporary bollard lighting for pathways",
  },
  {
    name: "Wall Mounted Lantern",
    collection: "Classic Outdoor",
    price: 2999,
    image: "https://pixabay.com/get/gc6a0ace915142189ef096baf3fda7da102fcf10d96d072dd558303c5a70656b3b6af1c0b4f5ab56a06bd81d9cc13fac6c01dd904d565e397af1c5830370b44b7_1280.jpg",
  },
  {
    name: "LED Floodlight",
    collection: "Security Pro",
    price: 4495,
    image: "https://pixabay.com/get/gc0fad56ae90d5af548dc32655428b1141382cead1aedda6cdc39ad546a9540f367df482683dace08d4571b120c1bc7bab230f940cdba3259bc1173815275d38d_1280.jpg",
  },
  // Add more exterior lights...
]


export default function ExteriorPage() {
  function addToCart(item: any): void {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]")
    const updatedCart = [...cart, item]
    localStorage.setItem("cart", JSON.stringify(updatedCart))
    console.log(`Added ${item.name} to cart.`)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Exterior Lighting Collection</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {exteriorLights.map((light, i) => (
          <div key={i} className="group relative">
            <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
              <Image
                src={light.image || "/placeholder.svg"}
                alt={light.name}
                width={500}
                height={500}
                className="object-cover w-full h-full transition-transform group-hover:scale-105"
              />
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-semibold">{light.name}</h3>
              <p className="text-sm text-gray-600">{light.collection}</p>
              <p className="mt-2 font-semibold">Rs.{light.price.toLocaleString()}</p>
              <Button className="mt-2" onClick={() => addToCart(light)}>
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}