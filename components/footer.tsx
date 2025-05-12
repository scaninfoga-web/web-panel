import Link from 'next/link';
import {
  Shield,
  Mail,
  Phone,
  MapPin,
  Github,
  Twitter,
  Linkedin,
  Facebook,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-gray-900">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-emerald-500" />
              <span className="text-xl font-bold tracking-tight">
                <span className="text-emerald-500">scan</span>infoga
              </span>
            </Link>
            <p className="text-white/70">
              Providing cutting-edge cybersecurity solutions to protect your
              digital assets and infrastructure.
            </p>
            <div className="flex space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="text-white/70 hover:bg-emerald-500/10 hover:text-emerald-500"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white/70 hover:bg-emerald-500/10 hover:text-emerald-500"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white/70 hover:bg-emerald-500/10 hover:text-emerald-500"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white/70 hover:bg-emerald-500/10 hover:text-emerald-500"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Button>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-white/70 transition-colors hover:text-emerald-400"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-white/70 transition-colors hover:text-emerald-400"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/courses"
                  className="text-white/70 transition-colors hover:text-emerald-400"
                >
                  Courses
                </Link>
              </li>
              <li>
                <Link
                  href="/tools"
                  className="text-white/70 transition-colors hover:text-emerald-400"
                >
                  Tools
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-white/70 transition-colors hover:text-emerald-400"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-white/70 transition-colors hover:text-emerald-400"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <Mail className="mt-0.5 h-5 w-5 text-emerald-500" />
                <span className="text-white/70">contact@scaninfoga.in</span>
              </li>
              <li className="flex items-start space-x-3">
                <Phone className="mt-0.5 h-5 w-5 text-emerald-500" />
                <span className="text-white/70">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="mt-0.5 h-5 w-5 text-emerald-500" />
                <span className="text-white/70">
                  123 Security Street, Cyber City, 10001
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">Subscribe</h3>
            <p className="mb-4 text-white/70">
              Stay updated with the latest cybersecurity news and updates.
            </p>
            <div className="space-y-3">
              <Input
                placeholder="Enter your email"
                className="border-gray-700 bg-gray-800 focus:border-emerald-500"
              />
              <Button className="w-full bg-emerald-500 text-black hover:bg-emerald-600">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between border-t border-gray-800 pt-8 md:flex-row">
          <p className="text-sm text-white/60">
            &copy; {new Date().getFullYear()} ScanInfoga. All rights reserved.
          </p>
          <div className="mt-4 flex space-x-6 md:mt-0">
            <Link
              href="/privacy"
              className="text-sm text-white/60 transition-colors hover:text-emerald-400"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-white/60 transition-colors hover:text-emerald-400"
            >
              Terms of Service
            </Link>
            <Link
              href="/sitemap"
              className="text-sm text-white/60 transition-colors hover:text-emerald-400"
            >
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
