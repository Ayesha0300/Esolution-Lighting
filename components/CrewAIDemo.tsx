"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, Send, Settings, User } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRouter } from "next/navigation"

const productDetails = {
  name: "Crystal Palace Chandelier",
  specs: {
    dimensions: "32\" x 32\" x 36\"",
    material: "Crystal and Brass",
    bulbType: "E12 LED Compatible",
    wattage: "40W per bulb",
    bulbCount: "12 lights",
    style: "Traditional Luxury",
    voltage: "120V",
    certification: "ETL Listed",
    warranty: "3-year limited warranty",
    weight: "45 lbs",
  },
  pricing: {
    retail: 4999,
    wholesale: 2999,
    bulkDiscount: "Available for orders over 5 units",
    installationCost: "Starting from $500",
  },
  inventory: {
    inStock: 15,
    onOrder: 25,
    minimumOrder: 1,
    leadTime: "2-3 weeks",
    warehouse: "Karachi Main"
  },
  features: [
    "Hand-cut crystal prisms for optimal light refraction",
    "Adjustable chain length up to 72 inches",
    "Dimmable capability with compatible switches",
    "ETL certified for safety standards",
    "Includes mounting hardware and instructions",
    "Energy-efficient LED compatibility",
    "360-degree illumination",
    "Gold-plated brass frame",
    "Easy-clean design",
    "Smart home compatible"
  ],
  applications: [
    "Grand entryways",
    "Dining rooms",
    "Hotel lobbies",
    "Luxury residences",
    "Wedding venues"
  ]
}

export function CrewAIDemo() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState("")
  const [question, setQuestion] = useState("")
  const [userType, setUserType] = useState("customer")
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    // Check if user is admin
    const user = localStorage.getItem('user')
    if (user) {
      const userData = JSON.parse(user)
      setIsAdmin(userData.email === "admin@esolution.com")
    }
  }, [])

  const handleTabChange = (value: string) => {
    if (value === "admin" && !isAdmin) {
      router.push("/login")
      return
    }
    setUserType(value)
  }

  const generateContent = async (prompt: string) => {
    setLoading(true)
    try {
      const response = await fetch("/api/crewai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          productDetails,
          userType
        }),
      })
      const data = await response.json()
      setResult(data.result)
    } catch (error) {
      console.error("Error:", error)
      setResult("Error generating content. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleQuestionSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (question.trim()) {
      generateContent(question)
      setQuestion("")
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <Tabs defaultValue="customer" onValueChange={handleTabChange}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Product Analysis</h2>
          <TabsList>
            <TabsTrigger value="customer" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Customer View
            </TabsTrigger>
            {isAdmin && (
              <TabsTrigger value="admin" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Admin View
              </TabsTrigger>
            )}
          </TabsList>
        </div>

        <TabsContent value="customer">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="font-semibold mb-3">Product Specifications</h3>
              <ul className="space-y-2">
                {Object.entries(productDetails.specs).map(([key, value]) => (
                  <li key={key} className="text-sm">
                    <span className="font-medium capitalize">{key}: </span>
                    {value}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-3">Key Features</h3>
                <ul className="list-disc list-inside space-y-1">
                  {productDetails.features.map((feature, index) => (
                    <li key={index} className="text-sm">{feature}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-3">Perfect For</h3>
                <ul className="list-disc list-inside space-y-1">
                  {productDetails.applications.map((app, index) => (
                    <li key={index} className="text-sm">{app}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Button
                onClick={() => generateContent("What makes this chandelier unique?")}
                disabled={loading}
              >
                Why Choose This?
              </Button>
              <Button
                onClick={() => generateContent("What are the installation requirements?")}
                disabled={loading}
              >
                Installation Guide
              </Button>
              <Button
                onClick={() => generateContent("How to maintain this chandelier?")}
                disabled={loading}
              >
                Care Instructions
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="admin">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="font-semibold mb-3">Inventory Status</h3>
              <ul className="space-y-2">
                {Object.entries(productDetails.inventory).map(([key, value]) => (
                  <li key={key} className="text-sm">
                    <span className="font-medium capitalize">{key}: </span>
                    {value}
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Pricing Information</h3>
              <ul className="space-y-2">
                {Object.entries(productDetails.pricing).map(([key, value]) => (
                  <li key={key} className="text-sm">
                    <span className="font-medium capitalize">{key}: </span>
                    {typeof value === 'number' ? `$${value.toLocaleString()}` : value}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Button
                onClick={() => generateContent("Generate sales pitch for luxury market")}
                disabled={loading}
              >
                Sales Strategy
              </Button>
              <Button
                onClick={() => generateContent("Analyze market positioning")}
                disabled={loading}
              >
                Market Analysis
              </Button>
              <Button
                onClick={() => generateContent("Suggest bulk pricing strategy")}
                disabled={loading}
              >
                Pricing Strategy
              </Button>
              <Button
                onClick={() => generateContent("Inventory management recommendations")}
                disabled={loading}
              >
                Inventory Tips
              </Button>
            </div>
          </div>
        </TabsContent>

        <form onSubmit={handleQuestionSubmit} className="flex gap-2 mt-6">
          <Input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder={userType === 'admin' ? "Ask about business insights..." : "Ask about this product..."}
            className="flex-1"
          />
          <Button type="submit" disabled={loading || !question.trim()}>
            <Send className="h-4 w-4 mr-2" />
            Ask
          </Button>
        </form>

        <div className="mt-6">
          {loading ? (
            <div className="flex items-center justify-center p-8">
              <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            </div>
          ) : result ? (
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-2">Analysis:</h3>
              <p className="text-gray-700 whitespace-pre-wrap">{result}</p>
            </div>
          ) : null}
        </div>
      </Tabs>
    </div>
  )
}

