'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Shield, User, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn, getClientInfo } from '@/lib/utils';
import { usePathname, useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { clearCookies } from '@/actions/clearCookies';
import { logout } from '@/redux/userSlice';
import { getCookie } from 'cookies-next';
import { setInfo } from '@/redux/infoSlice';
import { AppDispatch } from '@/redux/store';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const accessToken = getCookie('accessToken');

  const paths = [
    '/',
    '/services',
    '/aboutUs',
    '/contact',
    '/pricing',
    '/tools',
    '/auth',
  ];

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const info = await getClientInfo();
        dispatch(setInfo(info));
      } catch (e) {
        console.error('Error fetching client info:', e);
      }
    };

    fetchInfo();
  }, [dispatch]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!hasMounted) return null;

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
            {paths.includes(pathname) ? (
              <>
                <Link
                  href="/"
                  className={cn(
                    `text-base font-medium text-white/90 hover:text-emerald-400`,
                    pathname === '/' && 'text-emerald-500',
                  )}
                >
                  Home
                </Link>
                <Link
                  href="/tools"
                  className={cn(
                    `text-base font-medium text-white/90 hover:text-emerald-400`,
                    pathname === '/tools' && 'text-emerald-500',
                  )}
                >
                  Tools
                </Link>
                <Link
                  href="/services"
                  className={cn(
                    `text-base font-medium text-white/90 hover:text-emerald-400`,
                    pathname === '/services' && 'text-emerald-500',
                  )}
                >
                  Services
                </Link>
                <Link
                  href="/pricing"
                  className={cn(
                    `text-base font-medium text-white/90 hover:text-emerald-400`,
                    pathname === '/pricing' && 'text-emerald-500',
                  )}
                >
                  Pricing
                </Link>
                <Link
                  href="/contact"
                  className={cn(
                    `text-base font-medium text-white/90 hover:text-emerald-400`,
                    pathname === '/contact' && 'text-emerald-500',
                  )}
                >
                  Contact
                </Link>
                <Link
                  href="/aboutUs"
                  className={cn(
                    `text-base font-medium text-white/90 hover:text-emerald-400`,
                    pathname === '/aboutUs' && 'text-emerald-500',
                  )}
                >
                  About us
                </Link>
              </>
            ) : null}
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
                if (accessToken) {
                  dispatch(logout());
                  await clearCookies();
                  return router.refresh();
                }
                router.push('/auth');
              }}
            >
              {accessToken ? 'Sign out' : 'Sign in'}
            </Button>
            {accessToken ? (
              paths.includes(pathname) && (
                <Button
                  className="bg-emerald-500 text-black hover:bg-emerald-600"
                  onClick={() => router.push('/dashboard')}
                >
                  Go to dashboard
                </Button>
              )
            ) : (
              <Button
                className="bg-emerald-500 text-black hover:bg-emerald-600"
                onClick={() => router.push('/auth')}
              >
                Get Started
              </Button>
            )}
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
            {[
              '/',
              '/tools',
              '/services',
              '/pricing',
              '/contact',
              '/aboutUs',
            ].map((href) => (
              <Link
                key={href}
                href={href}
                className="text-lg font-medium text-white hover:text-emerald-400"
                onClick={() => setIsOpen(false)}
              >
                {href === '/'
                  ? 'Home'
                  : href.slice(1).replace(/([A-Z])/g, ' $1')}
              </Link>
            ))}

            <div className="flex flex-col space-y-4 pt-6">
              <Button
                variant="outline"
                className="w-full border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-black"
                onClick={() => {
                  setIsOpen(false);
                  router.push('/auth');
                }}
              >
                Sign In
              </Button>
              <Button
                className="w-full bg-emerald-500 text-black hover:bg-emerald-600"
                onClick={() => {
                  setIsOpen(false);
                  router.push('/auth');
                }}
              >
                Get Started
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
