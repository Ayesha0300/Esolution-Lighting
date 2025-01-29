import Image from "next/image"
import { Button } from "@/components/ui/button"

const exteriorLights = [
  {
    name: "Garden Path Lights",
    collection: "Outdoor Essential",
    price: 3199,
    image: "https://pixabay.com/get/g4aef41ca228a68132c34f6227f22623f99b82cce1ba5129af43dbaa53482d02eced41ad02707cb6ca648ca825a6f151ec9cd2505419ecf293206dac63e73ffbf_1280.jpg", // Beautiful garden path with lights
    description: "Weather-resistant path lighting solution with elegant design",
  },
  {
    name: "Modern Path Lights",
    collection: "Contemporary Series",
    price: 2999,
    image: "https://pixabay.com/get/g5aefe0067b776df70bb06e1d2c56edd06bfb97a0eb992ab7a9de6a24b7c072feff324eb67fed7ed4c206acd73ecea5776690de67b644952cdab17773a465d0df_1280.jpg", // Modern path lighting
    description: "Sleek, modern pathway illumination",
  },
  {
    name: "LED Garden Spots",
    collection: "Professional Series",
    price: 2459,
    image: "https://pixabay.com/get/g9c0215c86e070d726e7679983207c9986028473b27bb16defee96e331ce794b2de0aca612cd1f01d739aae9b5286eefa5aa5d440a906824eeeeebdd1d56f58ad_1280.jpg", // Garden spotlights
    description: "Professional-grade LED garden spotlights",
  },
  {
    name: "Solar Garden Lights",
    collection: "Eco Series",
    price: 2498,
    image: "https://cdn.pixabay.com/photo/2017/06/21/21/11/garden-2428593_1280.jpg", // Solar garden lights
    description: "Solar-powered LED garden illumination",
  },
  {
    name: "Decorative Path Lights",
    collection: "Designer Outdoor",
    price: 2995,
    image: "https://pixabay.com/get/ga8343287b5a8b82e95f12b20410110671df3a5cc4a2860cfd3bec5afb46a91d6d637faa5247a4d64d1f61defb3581fe76931b32c0524ff23a61368cbf6ea73c0_1280.jpg", // Decorative path lights
    description: "Artistic path lighting with unique patterns",
  },
  {
    name: "Modern Bollard Lights",
    collection: "Contemporary Path",
    price: 3999,
    image: "https://pixabay.com/get/g780cfe2fb031239b782e847258f1693530e57e24b796babcd116ed2e4f76c8f57361a3d7ef0488f019d383a14269c518_1280.jpg", // Modern bollard light
    description: "Contemporary bollard lighting for pathways",
  },
  {
    name: "Wall Mounted Lantern",
    collection: "Classic Outdoor",
    price: 299,
    image: "https://images.pexels.com/photos/276583/pexels-photo-276583.jpeg",
  },
  {
    name: "LED Floodlight",
    collection: "Security Pro",
    price: 449,
    image: "https://images.pexels.com/photos/963436/pexels-photo-963436.jpeg",
  },
  // Add more exterior lights...
]

export default function ExteriorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Exterior Lighting Collection</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {exteriorLights.map((light, i) => (
          <div key={i} className="group relative">
            <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
              <Image
                src={light.image}
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
              <Button className="mt-2">Add to Cart</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 