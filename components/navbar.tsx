'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Shield, User, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { clearCookies } from '@/actions/clearCookies';
import { useDispatch } from 'react-redux';
import { logout } from '@/redux/userSlice';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  console.log('USER', user);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const router = useRouter();

  return (
    <header
      className={cn(
        'fixed left-0 right-0 top-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-black/80 py-2 shadow-lg backdrop-blur-md'
          : 'bg-transparent py-4',
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

          <nav className="hidden items-center space-x-8 md:flex">
            <Link
              href="/"
              className="text-sm font-medium text-white/90 transition-colors hover:text-emerald-400"
            >
              Home
            </Link>
            <Link
              href="/services"
              className="text-sm font-medium text-white/90 transition-colors hover:text-emerald-400"
            >
              Services
            </Link>
            <Link
              href="/pricing"
              className="text-sm font-medium text-white/90 transition-colors hover:text-emerald-400"
            >
              Pricing
            </Link>
            <Link
              href="/tools"
              className="text-sm font-medium text-white/90 transition-colors hover:text-emerald-400"
            >
              Tools
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium text-white/90 transition-colors hover:text-emerald-400"
            >
              Contact
            </Link>
            <Link
              href="/aboutUs"
              className="text-sm font-medium text-white/90 transition-colors hover:text-emerald-400"
            >
              About us
            </Link>
          </nav>

          <div className="hidden items-center space-x-4 md:flex">
            <Link href="/account">
              <Button
                variant="ghost"
                size="icon"
                className="text-white/90 hover:text-emerald-400"
              >
                <User className="h-5 w-5" />
                <span className="sr-only">Account</span>
              </Button>
            </Link>
            <Link href="/cart">
              <Button
                variant="ghost"
                size="icon"
                className="text-white/90 hover:text-emerald-400"
              >
                <ShoppingCart className="h-5 w-5" />
                <span className="sr-only">Cart</span>
              </Button>
            </Link>
            <Button
              variant="outline"
              className="border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-black"
              onClick={async () => {
                if (user.token) {
                  dispatch(logout());
                  await clearCookies();
                  return router.refresh();
                }
                router.push('/auth');
              }}
            >
              {user.token === null ? 'Sign in' : 'Sign out'}
            </Button>
            {user.token === null ? (
              <Button
                className="bg-emerald-500 text-black hover:bg-emerald-600"
                onClick={() => router.push('/auth')}
              >
                Get Started
              </Button>
            ) : null}
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="text-white md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="fixed inset-0 top-16 z-40 bg-black/95 backdrop-blur-sm md:hidden">
          <nav className="flex flex-col space-y-6 p-8">
            <Link
              href="/"
              className="text-lg font-medium text-white transition-colors hover:text-emerald-400"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/services"
              className="text-lg font-medium text-white transition-colors hover:text-emerald-400"
              onClick={() => setIsOpen(false)}
            >
              Services
            </Link>
            <Link
              href="/pricing"
              className="text-lg font-medium text-white transition-colors hover:text-emerald-400"
              onClick={() => setIsOpen(false)}
            >
              Pricing
            </Link>
            <Link
              href="/tools"
              className="text-lg font-medium text-white transition-colors hover:text-emerald-400"
              onClick={() => setIsOpen(false)}
            >
              Tools
            </Link>
            <Link
              href="/contact"
              className="text-lg font-medium text-white transition-colors hover:text-emerald-400"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
            <Link
              href="/aboutUs"
              className="text-lg font-medium text-white transition-colors hover:text-emerald-400"
              onClick={() => setIsOpen(false)}
            >
              About us
            </Link>
            <div className="flex flex-col space-y-4 pt-6">
              <Button
                variant="outline"
                className="w-full border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-black"
              >
                Sign In
              </Button>
              <Button className="w-full bg-emerald-500 text-black hover:bg-emerald-600">
                Get Started
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
