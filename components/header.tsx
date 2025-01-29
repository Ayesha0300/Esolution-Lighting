"use client"

import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import { Search, ShoppingCart, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../components/ui/navigation-menu"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

const navigation = [
  {
    title: "LAMPS",
    items: [
      { title: "Table Lamps", href: "/category/table-lamps" },
      { title: "Floor Lamps", href: "/category/floor-lamps" },
      { title: "Desk Lamps", href: "/category/desk-lamps" },
    ],
  },
  {
    title: "INTERIOR",
    items: [
      { title: "Chandeliers", href: "/category/chandeliers" },
      { title: "Pendant Lights", href: "/category/pendant-lights" },
      { title: "Wall Lights", href: "/category/wall-lights" },
    ],
  },
  {
    title: "EXTERIOR",
    items: [
      { title: "Wall Lights", href: "/category/exterior-wall-lights" },
      { title: "Post Lights", href: "/category/post-lights" },
      { title: "Garden Lights", href: "/category/garden-lights" },
    ],
  },
]

export const SpotlightHeader = () => {
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  })

  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const updateMousePosition = (ev: MouseEvent) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      setMousePosition({ x: ev.clientX - rect.left, y: ev.clientY - rect.top })
    }

    containerRef.current?.addEventListener("mousemove", updateMousePosition)

    return () => {
      containerRef.current?.removeEventListener("mousemove", updateMousePosition)
    }
  }, [])

  const words = "ILLUMINATE YOUR WORLD WITH ESOLUTION LIGHTING".split(" ")

  return (
    <div
      ref={containerRef}
      className="relative h-[40rem] overflow-hidden bg-slate-900 flex items-center justify-center"
    >
      {/* Spotlight */}
      <motion.div
        className="absolute inset-0 opacity-0 mix-blend-soft-light"
        animate={{
          background: [
            `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.1), transparent 40%)`,
          ],
        }}
      />

      <div className="p-4 max-w-7xl mx-auto relative z-10 w-full pt-20 md:pt-0">
        <div className="text-center">
          {/* Animated Text */}
          <div className="text-4xl md:text-7xl font-bold">
            <div className="flex flex-wrap justify-center gap-2">
              {words.map((word, idx) => (
                <motion.span
                  key={idx}
                  className="text-white relative"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: idx * 0.1,
                    duration: 0.5,
                    ease: "easeOut",
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Subtitle with gradient */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-8 text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto"
          >
            <div className="bg-clip-text text-transparent bg-gradient-to-r from-neutral-200 via-slate-200 to-neutral-400">
              Experience luxury illumination like never before
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mt-8 flex gap-4 justify-center"
          >
            <Link href="/catalog">
              <Button
                className={cn(
                  "bg-slate-800 text-white border border-slate-700 px-6 py-3",
                  "hover:bg-slate-700 transition-colors duration-200"
                )}
              >
                Explore Collection
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                variant="outline"
                className={cn(
                  "border-slate-700 text-slate-300 px-6 py-3",
                  "hover:bg-slate-800 hover:text-white transition-colors duration-200"
                )}
              >
                Contact Us
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Gradient backgrounds */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-slate-900/0 z-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-slate-900/0 z-0" />
    </div>
  )
}

export default SpotlightHeader

