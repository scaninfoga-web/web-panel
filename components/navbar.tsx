"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, Shield, User, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-black/80 backdrop-blur-md py-2 shadow-lg" : "bg-transparent py-4",
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-emerald-500" />
            <span className="text-xl font-bold tracking-tight">
              <span className="text-emerald-500">scan</span>infoga
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-sm font-medium text-white/90 hover:text-emerald-400 transition-colors">
              Home
            </Link>
            <Link
              href="/services"
              className="text-sm font-medium text-white/90 hover:text-emerald-400 transition-colors"
            >
              Services
            </Link>
            <Link
              href="/pricing"
              className="text-sm font-medium text-white/90 hover:text-emerald-400 transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="/courses"
              className="text-sm font-medium text-white/90 hover:text-emerald-400 transition-colors"
            >
              Courses
            </Link>
            <Link href="/tools" className="text-sm font-medium text-white/90 hover:text-emerald-400 transition-colors">
              Tools
            </Link>
            <Link
              href="/resources"
              className="text-sm font-medium text-white/90 hover:text-emerald-400 transition-colors"
            >
              Resources
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium text-white/90 hover:text-emerald-400 transition-colors"
            >
              Contact
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Link href="/account">
              <Button variant="ghost" size="icon" className="text-white/90 hover:text-emerald-400">
                <User className="h-5 w-5" />
                <span className="sr-only">Account</span>
              </Button>
            </Link>
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="text-white/90 hover:text-emerald-400">
                <ShoppingCart className="h-5 w-5" />
                <span className="sr-only">Cart</span>
              </Button>
            </Link>
            <Button
              variant="outline"
              className="border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-black"
            >
              Sign In
            </Button>
            <Button className="bg-emerald-500 text-black hover:bg-emerald-600">Get Started</Button>
          </div>

          <Button variant="ghost" size="icon" className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 top-16 bg-black/95 backdrop-blur-sm z-40">
          <nav className="flex flex-col p-8 space-y-6">
            <Link
              href="/"
              className="text-lg font-medium text-white hover:text-emerald-400 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/services"
              className="text-lg font-medium text-white hover:text-emerald-400 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Services
            </Link>
            <Link
              href="/pricing"
              className="text-lg font-medium text-white hover:text-emerald-400 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Pricing
            </Link>
            <Link
              href="/courses"
              className="text-lg font-medium text-white hover:text-emerald-400 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Courses
            </Link>
            <Link
              href="/tools"
              className="text-lg font-medium text-white hover:text-emerald-400 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Tools
            </Link>
            <Link
              href="/resources"
              className="text-lg font-medium text-white hover:text-emerald-400 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Resources
            </Link>
            <Link
              href="/contact"
              className="text-lg font-medium text-white hover:text-emerald-400 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
            <div className="pt-6 flex flex-col space-y-4">
              <Button
                variant="outline"
                className="w-full border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-black"
              >
                Sign In
              </Button>
              <Button className="w-full bg-emerald-500 text-black hover:bg-emerald-600">Get Started</Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
