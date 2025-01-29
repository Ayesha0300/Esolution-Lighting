import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">About Us</h3>
            <p className="text-sm">
              Esolution Lighting offers a curated collection of luxury lighting solutions for your home and business.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Customer Service</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/contact">Contact Us</Link>
              </li>
              <li>
                <Link href="/shipping">Shipping Information</Link>
              </li>
              <li>
                <Link href="/returns">Returns & Exchanges</Link>
              </li>
              <li>
                <Link href="/faq">FAQ</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/category/interior">Interior Lighting</Link>
              </li>
              <li>
                <Link href="/category/exterior">Exterior Lighting</Link>
              </li>
              <li>
                <Link href="/category/fans">Fans</Link>
              </li>
              <li>
                <Link href="/category/accessories">Accessories</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <Link href="#" className="hover:text-gray-300">
                <Facebook className="h-6 w-6" />
              </Link>
              <Link href="#" className="hover:text-gray-300">
                <Instagram className="h-6 w-6" />
              </Link>
              <Link href="#" className="hover:text-gray-300">
                <Twitter className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </div>
        <div className="border-t border-primary-foreground/10 mt-8 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Esolution Lighting. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

