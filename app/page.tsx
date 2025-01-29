import Image from "next/image"
import { CrewAIDemo } from "@/components/CrewAIDemo"
import { CardStack } from "@/components/ui/card-stack"
import SpotlightHeader from "@/components/header"

const luxuryLights = [
  {
    name: "Chandelier",
    collection: "Nature's Wonders",
    price: 1999,
    image: "https://pixabay.com/get/g48d7bc3a507f2ace43e04ee5823d1838ffc89b35b4191bb6850f8ec9b13565253c434a58079f60774df98f12b0ef71904aa2a98267efa0720936f5c31a25bb7d_1280.jpg",
  },
  {
    name: "Illuminated Lights",
    collection: "Festive Decor",
    price: 2999,
    image: "https://pixabay.com/get/g5312ce4c43efa6ac68877d11682211289f5d48f20026f221b3ecd9f8639c60d282c80a4c2c6899dbf6451d351cbb75c8_1280.jpg",
  },
  {
    name: "Neon Lights",
    collection: "Cosmic Illumination",
    price: 2999,
    image: "https://pixabay.com/get/g7494101b16f1cb7eb6a7bc70c83cdf63a0bc7a3ebac3c754092ba9735766cb662abb450caeb72b083009401172d14094f43cc1411ae7f1e6fe9d2b3cfbff9357_1280.jpg",
  },
  {
    name: "Street Lights",
    collection: "Modern lighting",
    price: 1599,
    image: "https://pixabay.com/get/g9cd1ba0af4aeef831a300eed473df8b399506bbd2c22e10ff8ec3b43d1136ff759b8781f6356f538f575c1b282e781b860c0be555a677854e9f9f02af87f2a27_1280.jpg",
  },
  {
    name: "Decoration Illumination",
    collection: "Oceanic Wonders",
    price: 3499,
    image: "https://pixabay.com/get/g5f12fa562ba36abdc33d2eeaef76882e8c6428f28169fff9dc365a7dd2167245e1576a418a2bd469440bde931eccb5595398dd171bf5373c0ad763c66dd957c8_1280.jpg",
  },
  {
    name: "Lamp Light",
    collection: "Galactic Dreams",
    price: 4299,
    image: "https://pixabay.com/get/gfcce345a919a3dac720501e515cca1faedaa9ff2f1438017337017f0b0438b1ac05a8e0c0903bf4bdc39d0ee763de5e251fe641e1bd8c0d7625da9f34b227295_1280.jpg",
  },
  {
    name: "Indoor Lights",
    collection: "Enchanted Ambience",
    price: 2799,
    image: "https://pixabay.com/get/g6509726dd36e798a4ffc956346a8a7a375a79896e78014f2551ce7499e1d18211866d327028f749007791799fd52b687_1280.jpg",
  },
  {
    name: "Interior Modern",
    collection: "Scientific Malls Light ",
    price: 5999,
    image: "https://pixabay.com/get/ga5e781bbe33e853f0ed130a099ecea72ad12b3fe2944fcbc16c3bd475e35f00f48e3e86d7ddd36d0894efdaf597625bc4d22ee0d985a7ef6c15916b95d32ce96_1280.jpg",
  },
]

const testimonials = [
  {
    id: 1,
    name: "Sarah Ahmed",
    designation: "Interior Designer",
    content: "The quality of Esolution's lighting products is exceptional. Their chandeliers have transformed my clients' spaces.",
  },
  {
    id: 2,
    name: "Imran Khan",
    designation: "Architect",
    content: "Working with Esolution has been a pleasure. Their modern lighting solutions perfectly complement our architectural designs.",
  },
  {
    id: 3,
    name: "Fatima Hassan",
    designation: "Hotel Manager",
    content: "The LED solutions from Esolution have significantly reduced our energy costs while maintaining elegant aesthetics.",
  },
];

export default function Home() {
  return (
    <div>
      <SpotlightHeader />
      
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {luxuryLights.map((light, i) => (
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
              </div>
            </div>
          ))}
        </div>
      </section>

      <CrewAIDemo />

      <section className="py-16 flex justify-center items-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-8">What Our Clients Say</h2>
          <CardStack items={testimonials} />
        </div>
      </section>
    </div>
  )
}

