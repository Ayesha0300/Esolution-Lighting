import Image from "next/image"
import { CrewAIDemo } from "@/components/CrewAIDemo"
import { CardStack } from "@/components/ui/card-stack"
import SpotlightHeader from "@/components/header"

const luxuryLights = [
  {
    name: "Chandelier",
    collection: "Nature's Wonders",
    price: 1999,
    image: "https://pixabay.com/get/gf76dc1e749ed8271af98aa2ad8f8a5c04dd5b875f4cd75f53607335bd18f30ff60126bea3504142e6e88f5d2ab6a567be8bd3479fda6491dc192813a19335cbe_1280.jpg",
  },
  {
    name: "Illuminated Lights",
    collection: "Festive Decor",
    price: 2999,
    image: "https://pixabay.com/get/g0561c8af6db57752f96a0244dfb992991be6cb2c031c657cc4ef603a089d90eedcba6763b6bbe4695c4dccd2ac3957fb2c0ee6a4c4c5a7506afc28e6a8e60e28_1280.jpg",
  },
  {
    name: "Neon Lights",
    collection: "Cosmic Illumination",
    price: 2999,
    image: "https://pixabay.com/get/g35401bbb5bed648f62edaaaea23715df7ec8c36365367f09a1e33d985c8e777184aa86e129fda078abec4225afbc0c7fda2468ce1427648af6d05855a5ab5b88_1280.jpg",
  },
  {
    name: "Street Lights",
    collection: "Modern lighting",
    price: 1599,
    image: "https://pixabay.com/get/gb743b42abe7cf4cb360f82f1d11e2d5b0d77fabdd515f083bf814da3ad669de4b2177cc34d66a969d2adb338e10d85f4d48f24e8744530138a8070ac586f727a_1280.jpg",
  },
  {
    name: "Decoration Illumination",
    collection: "Oceanic Wonders",
    price: 3499,
    image: "https://pixabay.com/get/gbb344adcb1ff39a09467cca1ab85624af7fa0355fb3a43914b9f02e12cbfa0bcf8ee58f96241474f07a9ec25389de816c13b1cccf6c69bd0dcdc81f5588118ad_1280.jpg",
  },
  {
    name: "Lamp Light",
    collection: "Galactic Dreams",
    price: 4299,
    image: "https://pixabay.com/get/gf6a44e9b40b6a8c9b713dcb2cca3bf37d4d3d08608d2a1a0204a95235f7fbda4b09f0ec9cbf66d08a0bb088b22f3c0423d69a2340aa36476219d183fccbacccb_1280.jpg",
  },
  {
    name: "Indoor Lights",
    collection: "Enchanted Ambience",
    price: 2799,
    image: "https://pixabay.com/get/gd9d53852a9089af6e3eb782a038e991df3a5a3e7914e4f9aba92118106a7896c60808e6968b91ae21bf7330203ce2810b15b4a3e89a57ea877367d444e0cb1ad_1280.jpg",
  },
  {
    name: "Interior Modern",
    collection: "Scientific Malls Light ",
    price: 5999,
    image: "https://pixabay.com/get/gd126c26b9f63b447234075327d3a916c9a00969cdeb8b09630fdc381d5a3eb3dd8d52401ae513ac93b1c61b85066ab9d1a578eca31b937cb02190cf49b0dd024_1280.jpg",
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

