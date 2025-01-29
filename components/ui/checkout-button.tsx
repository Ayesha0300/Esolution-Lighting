"use client"

import { useState } from 'react'
import { Button } from './button'
import { useToast } from './use-toast'
import { stripePromise } from '@/lib/stripe'
import { Loader2 } from 'lucide-react'

interface CheckoutButtonProps {
  items: any[]
}

export function CheckoutButton({ items }: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleCheckout = async () => {
    try {
      setLoading(true)
      const stripe = await stripePromise

      // Create checkout session
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items }),
      })

      const { sessionId, error } = await response.json()

      if (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Something went wrong. Please try again.",
        })
        return
      }

      // Redirect to checkout
      const result = await stripe?.redirectToCheckout({
        sessionId,
      })

      if (result?.error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: result.error.message,
        })
      }
    } catch (error) {
      console.error('Error:', error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong. Please try again.",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      onClick={handleCheckout}
      disabled={loading || items.length === 0}
      className="w-full"
    >
      {loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Processing...
        </>
      ) : (
        'Checkout'
      )}
    </Button>
  )
} 