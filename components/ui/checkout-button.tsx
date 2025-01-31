import { Button } from "@/components/ui/button"

interface CheckoutButtonProps {
  items: Array<{ id: number; name: string; price: number; quantity: number }>
}

export function CheckoutButton({ items }: CheckoutButtonProps) {
  const handleCheckout = () => {
    // Implement checkout logic here
    console.log("Checkout with items:", items)
  }

  return (
    <Button onClick={handleCheckout} className="w-full">
      Proceed to Checkout
    </Button>
  )
}

