"use client"

import Link from "next/link"
import { useCart } from "@/lib/context/cart-context"
import { ShoppingCart, User, ShieldCheck } from "lucide-react"
import { Button } from "./ui/button"
import { Logo } from "@/components/ui/logo"

const FloatingNav = () => {
  const { cartItems } = useCart()
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0)

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gray-900 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-3">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="text-blue-400 group-hover:text-blue-300 transition-colors">
              <Logo />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold leading-none group-hover:text-gray-300 transition-colors">
                ESolution
              </span>
              <span className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">
                Luxury Lighting Solutions
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="flex items-center gap-6">
            {/* Interior Page */}
            <Link href="/interior" aria-label="Interior">
              <span className="text-gray-300 hover:text-white transition-colors cursor-pointer">
                Interior
              </span>
            </Link>

            {/* Exterior Page */}
            <Link href="/exterior" aria-label="Exterior">
              <span className="text-gray-300 hover:text-white transition-colors cursor-pointer">
                Exterior
              </span>
            </Link>

            {/* Catalog Page */}
            <Link href="/catalog" aria-label="Catalog">
              <span className="text-gray-300 hover:text-white transition-colors cursor-pointer">
                Catalog
              </span>
            </Link>

            {/* Login Link */}
            <Link href="/login" aria-label="Login">
              <Button variant="ghost" size="sm" className="flex items-center hover:bg-gray-700 hover:text-gray-300">
                <User className="h-5 w-5 mr-2" />
                <span className="hidden sm:inline">Login</span>
              </Button>
            </Link>

            {/* Cart Link with Counter */}
            <Link href="/cart" aria-label={`Cart with ${itemCount} items`}>
              <Button variant="ghost" size="sm" className="relative flex items-center hover:bg-gray-700 hover:text-gray-300">
                <ShoppingCart className="h-5 w-5 mr-2" />
                <span className="hidden sm:inline">Cart</span>
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-3 bg-blue-500 text-white text-xs rounded-full min-w-[20px] min-h-[20px] flex items-center justify-center px-1">
                    {itemCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* Admin Link */}
            <Link href="/admin" aria-label="Admin Panel">
              <Button variant="ghost" size="sm" className="flex items-center hover:bg-gray-700 hover:text-gray-300">
                <ShieldCheck className="h-5 w-5 mr-2" />
                <span className="hidden sm:inline">Admin</span>
              </Button>
            </Link>
          </nav>
        </div>
      </div>
    </div>
  )
}

export default FloatingNav
