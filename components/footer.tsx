import Link from "next/link"
import { Shield, Mail, Phone, MapPin, Github, Twitter, Linkedin, Facebook } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-emerald-500" />
              <span className="text-xl font-bold tracking-tight">
                <span className="text-emerald-500">scan</span>infoga
              </span>
            </Link>
            <p className="text-white/70">
              Providing cutting-edge cybersecurity solutions to protect your digital assets and infrastructure.
            </p>
            <div className="flex space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="text-white/70 hover:text-emerald-500 hover:bg-emerald-500/10"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white/70 hover:text-emerald-500 hover:bg-emerald-500/10"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white/70 hover:text-emerald-500 hover:bg-emerald-500/10"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white/70 hover:text-emerald-500 hover:bg-emerald-500/10"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Button>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-white/70 hover:text-emerald-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-white/70 hover:text-emerald-400 transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/courses" className="text-white/70 hover:text-emerald-400 transition-colors">
                  Courses
                </Link>
              </li>
              <li>
                <Link href="/tools" className="text-white/70 hover:text-emerald-400 transition-colors">
                  Tools
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-white/70 hover:text-emerald-400 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/70 hover:text-emerald-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-emerald-500 mt-0.5" />
                <span className="text-white/70">contact@scaninfoga.in</span>
              </li>
              <li className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-emerald-500 mt-0.5" />
                <span className="text-white/70">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-emerald-500 mt-0.5" />
                <span className="text-white/70">123 Security Street, Cyber City, 10001</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Subscribe</h3>
            <p className="text-white/70 mb-4">Stay updated with the latest cybersecurity news and updates.</p>
            <div className="space-y-3">
              <Input placeholder="Enter your email" className="bg-gray-800 border-gray-700 focus:border-emerald-500" />
              <Button className="w-full bg-emerald-500 text-black hover:bg-emerald-600">Subscribe</Button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/60 text-sm">&copy; {new Date().getFullYear()} ScanInfoga. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-white/60 text-sm hover:text-emerald-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-white/60 text-sm hover:text-emerald-400 transition-colors">
              Terms of Service
            </Link>
            <Link href="/sitemap" className="text-white/60 text-sm hover:text-emerald-400 transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
