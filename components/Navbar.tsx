"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Menu, X, ChevronDown } from "lucide-react"
import { motion } from "framer-motion"

const FloatingNav = () => {
  const [active, setActive] = useState<string>("home")

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Interior", href: "/interior" },
    { name: "Exterior", href: "/exterior" },
    { name: "Catalog", href: "/catalog" },
  ]

  const rightNavItems = [
    { name: "Login", href: "/login" },
    { name: "Cart", href: "/cart" },
    { name: "Admin", href: "/admin" },
  ]

  return (
    <div className="fixed top-0 inset-x-0 h-[4.5rem] z-50">
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed inset-x-0 top-6 w-full px-4"
      >
        <nav className="mx-auto max-w-7xl relative">
          <div className="relative w-full">
            <div className="relative flex items-center justify-between w-full h-16 px-4 py-2 backdrop-blur-sm bg-white/75 dark:bg-gray-800/75 rounded-full border border-white/10">
              {/* Logo */}
              <Link
                href="/"
                className="flex items-center text-lg font-semibold text-gray-700 dark:text-white"
              >
                Esolution LIGHTING
              </Link>

              {/* Center Nav Items */}
              <div className="hidden md:flex items-center justify-center space-x-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      active === item.name.toLowerCase()
                        ? "bg-gray-100 dark:bg-gray-700"
                        : "hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                    onClick={() => setActive(item.name.toLowerCase())}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* Right Nav Items */}
              <div className="flex items-center space-x-4">
                {rightNavItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-sm font-medium text-gray-700 dark:text-white hover:text-gray-900 dark:hover:text-gray-200"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </nav>
      </motion.div>
    </div>
  )
}

export default FloatingNav 