import { useState } from "react"
import { Button } from "@/components/ui/button"
import { loadStripe } from "@stripe/stripe-js"

interface CheckoutButtonProps {
  total: number
  items: Array<{
    id: number
    name: string
    price: number
    quantity: number
  }>
}

export function CheckoutButton({ total, items }: CheckoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleCheckout = async () => {
    setIsLoading(true)
    try {
      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items }),
      })

      const session = await response.json()

      const result = await stripe?.redirectToCheckout({
        sessionId: session.id,
      })

      if (result?.error) {
        console.error(result.error)
        alert("An error occurred. Please try again.")
      }
    } catch (error) {
      console.error("Checkout error:", error)
      alert("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button onClick={handleCheckout} className="w-full" disabled={isLoading}>
      {isLoading ? "Processing..." : `Checkout - Rs.${typeof total === "number" ? total.toFixed(2) : "0.00"}`}
    </Button>
  )
}

