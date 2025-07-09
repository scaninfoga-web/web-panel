// 'use client';

// import { clearCookies } from '@/actions/clearCookies';
// import { Button } from '@/components/ui/button';
// import { cn, getClientInfo } from '@/lib/utils';
// import { setInfo } from '@/redux/infoSlice';
// import { AppDispatch, RootState } from '@/redux/store';
// import { logout } from '@/redux/userSlice';
// import { fetchWalletBalance } from '@/redux/walletSlice';
// import { getCookie } from 'cookies-next';
// import { Menu, X } from 'lucide-react';
// import Link from 'next/link';
// import { usePathname, useRouter } from 'next/navigation';
// import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { WalletWidget } from '../common/WalletWidget';
// import Image from 'next/image';

// const navItems = [
//   { label: 'Home', href: '/' },
//   { label: 'Tools', href: '/tools' },
//   { label: 'Services', href: '/services' },
//   { label: 'Pricing', href: '/pricing' },
//   { label: 'Contact', href: '/contact' },
//   { label: 'About us', href: '/aboutUs' },
// ];

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const [hasMounted, setHasMounted] = useState(false);
//   const pathname = usePathname();
//   const router = useRouter();
//   const accessToken = getCookie('accessToken');

//   const wallet = useSelector((state: RootState) => state.wallet);
//   const token = useSelector((state: RootState) => state.user.token);

//   const paths = [
//     '/',
//     '/services',
//     '/aboutUs',
//     '/contact',
//     '/pricing',
//     '/tools',
//     '/auth',
//   ];

//   useEffect(() => {
//     setHasMounted(true);
//   }, []);

//   const dispatch = useDispatch<AppDispatch>();

//   useEffect(() => {
//     const fetchInfo = async () => {
//       try {
//         const info = await getClientInfo();
//         dispatch(setInfo(info));
//       } catch (e) {}
//     };
//     fetchInfo();
//   }, [dispatch]);

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 10);
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   useEffect(() => {
//     if (accessToken) {
//       dispatch(fetchWalletBalance());
//     }
//   }, []);

//   if (!hasMounted) return null;

//   return (
//     <header
//       className={cn(
//         'fixed left-0 right-0 top-0 z-50 transition-all duration-300 md:px-8 pb-4',
//         scrolled
//           ? 'bg-black/80 py-2 shadow-lg backdrop-blur-md'
//           : 'bg-transparent py-4',
//       )}
//     >
//       <div className="">
//         <div className="flex items-center justify-between">
//           <Link
//             href="/"
//             className='w-52 h-16'
//           >
//             <Image
//               src="https://website-stuff-logos.s3.ap-south-1.amazonaws.com/1.png"
//               alt="scaninfoga"
//               fill
//               priority={true}
//               loading="eager"
//               className='!static'
//             />
//           </Link>

//           {paths.includes(pathname) ? (
//             <nav className="hidden items-center space-x-8 rounded-full border border-slate-500 bg-[#060b17] px-6 py-2.5 shadow-[inset_0px_1px_2px_0px_rgba(255,255,255,0.1),inset_0px_-1px_2px_0px_rgba(255,255,255,0.1)] transition-all md:flex">
//               <>
//                 {/* {navItems.map((item, index) => {
//                   <Link
//                     key={index}
//                     href={item.href}
//                     className={cn(
//                       `text-base font-medium text-white/90 hover:text-emerald-400`,
//                       pathname === item.href && 'text-black bg-emerald-500 py-1 rounded-3xl px-3',
//                     )}
//                   >
//                     {item.label}
//                   </Link>
//                 })} */}
//                 <Link
//                   href="/"
//                   className={cn(
//                     `text-base font-medium text-white/90 hover:text-emerald-400`,
//                     pathname === '/' &&
//                       'rounded-3xl bg-emerald-500 px-3 py-1 text-black hover:text-black',
//                   )}
//                 >
//                   Home
//                 </Link>
//                 <Link
//                   href="/tools"
//                   className={cn(
//                     `text-base font-medium text-white/90 hover:text-emerald-400`,
//                     pathname === '/tools' &&
//                       'rounded-3xl bg-emerald-500 px-3 py-1 text-black hover:text-black',
//                   )}
//                 >
//                   Tools
//                 </Link>
//                 <Link
//                   href="/services"
//                   className={cn(
//                     `text-base font-medium text-white/90 hover:text-emerald-400`,
//                     pathname === '/services' &&
//                       'rounded-3xl bg-emerald-500 px-3 py-1 text-black hover:text-black',
//                   )}
//                 >
//                   Services
//                 </Link>
//                 <Link
//                   href="/pricing"
//                   className={cn(
//                     `text-base font-medium text-white/90 hover:text-emerald-400`,
//                     pathname === '/pricing' &&
//                       'rounded-3xl bg-emerald-500 px-3 py-1 text-black hover:text-black',
//                   )}
//                 >
//                   Pricing
//                 </Link>
//                 <Link
//                   href="/contact"
//                   className={cn(
//                     `text-base font-medium text-white/90 hover:text-emerald-400`,
//                     pathname === '/contact' &&
//                       'rounded-3xl bg-emerald-500 px-3 py-1 text-black hover:text-black',
//                   )}
//                 >
//                   Contact
//                 </Link>
//                 <Link
//                   href="/aboutUs"
//                   className={cn(
//                     `text-base font-medium text-white/90 hover:text-emerald-400`,
//                     pathname === '/aboutUs' &&
//                       'rounded-3xl bg-emerald-500 px-3 py-1 text-black hover:text-black',
//                   )}
//                 >
//                   About us
//                 </Link>
//               </>
//             </nav>
//           ) : null}

//           <div className="hidden items-center space-x-4 md:flex">
//             {/* <Link href="/account">
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 className="text-white/90 hover:text-emerald-400"
//               >
//                 <User className="h-5 w-5" />
//                 <span className="sr-only">Account</span>
//               </Button>
//             </Link>
//             <Link href="/cart">
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 className="text-white/90 hover:text-emerald-400"
//               >
//                 <ShoppingCart className="h-5 w-5" />
//                 <span className="sr-only">Cart</span>
//               </Button>
//             </Link> */}

//             {token &&
//               // <Button variant='outline' className='flex gap-x-2'><CircleDollarSign className='text-yellow-500'/> {walletBalance}</Button>
//               !paths.includes(pathname) && (
//                 <WalletWidget
//                   walletLoading={wallet?.loading}
//                   credits={wallet.balance}
//                   onTopUp={() => {}}
//                 />
//               )}
//             {!paths.includes(pathname) && (
//               <Button
//                 variant="outline"
//                 className="border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-black"
//                 onClick={async () => {
//                   if (accessToken) {
//                     router.push('/');
//                     await new Promise((resolve) => setTimeout(resolve, 1000));
//                     dispatch(logout());
//                     await clearCookies();
//                     return;
//                   }
//                   router.push('/auth');
//                 }}
//               >
//                 {accessToken ? 'Sign out' : 'Sign in'}
//               </Button>
//             )}

//             {accessToken ? (
//               paths.includes(pathname) && (
//                 <Button
//                   className="bg-emerald-500 text-black hover:bg-emerald-600"
//                   onClick={() => router.push('/dashboard')}
//                 >
//                   Go to dashboard
//                 </Button>
//               )
//             ) : (
//               <Button
//                 className="bg-emerald-500 text-black hover:bg-emerald-600"
//                 onClick={() => router.push('/auth')}
//               >
//                 Get Started
//               </Button>
//             )}
//           </div>
//           <div className='mr-4' onClick={() => setIsOpen(!isOpen)}>

//             {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//             <span className="sr-only">Toggle menu</span>
//           </div>
//         </div>
//       </div>

//       {/* Mobile menu */}
//       {isOpen && (
//         <div className="absolute left-0 right-0 h-screen bg-black/95 backdrop-blur-sm md:hidden">
//           <nav className="flex flex-col space-y-6 p-8">
//             {[
//               '/',
//               '/tools',
//               '/services',
//               '/pricing',
//               '/contact',
//               '/aboutUs',
//             ].map((href) => (
//               <Link
//                 key={href}
//                 href={href}
//                 className="text-lg font-medium text-white hover:text-emerald-400"
//                 onClick={() => setIsOpen(false)}
//               >
//                 {href === '/'
//                   ? 'Home'
//                   : href.slice(1).replace(/([A-Z])/g, ' $1')}
//               </Link>
//             ))}

//             <div className="flex flex-col space-y-4 pt-6">
//               <Button
//                 variant="outline"
//                 className="w-full border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-black"
//                 onClick={() => {
//                   setIsOpen(false);
//                   router.push('/auth');
//                 }}
//               >
//                 Sign In
//               </Button>
//               <Button
//                 className="w-full bg-emerald-500 text-black hover:bg-emerald-600"
//                 onClick={() => {
//                   setIsOpen(false);
//                   router.push('/auth');
//                 }}
//               >
//                 Get Started
//               </Button>
//             </div>
//           </nav>
//         </div>
//       )}
//     </header>
//   );
// }

// 'use client';

// import { clearCookies } from '@/actions/clearCookies';
// import { Button } from '@/components/ui/button';
// import { cn, getClientInfo } from '@/lib/utils';
// import { setInfo } from '@/redux/infoSlice';
// import { AppDispatch, RootState } from '@/redux/store';
// import { logout } from '@/redux/userSlice';
// import { fetchWalletBalance } from '@/redux/walletSlice';
// import { getCookie } from 'cookies-next';
// import { Menu, X } from 'lucide-react';
// import Link from 'next/link';
// import { usePathname, useRouter } from 'next/navigation';
// import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { WalletWidget } from '../common/WalletWidget';
// import Image from 'next/image';

// const navItems = [
//   { label: 'Home', href: '/' },
//   { label: 'Tools', href: '/tools' },
//   { label: 'Services', href: '/services' },
//   { label: 'Pricing', href: '/pricing' },
//   { label: 'Contact', href: '/contact' },
//   { label: 'About us', href: '/aboutUs' },
// ];

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const [hasMounted, setHasMounted] = useState(false);

//   const pathname = usePathname();
//   const router = useRouter();
//   const dispatch = useDispatch<AppDispatch>();

//   const accessToken = getCookie('accessToken');
//   const wallet = useSelector((state: RootState) => state.wallet);
//   const token = useSelector((state: RootState) => state.user.token);

//   const publicRoutes = [
//     '/',
//     '/services',
//     '/aboutUs',
//     '/contact',
//     '/pricing',
//     '/tools',
//     '/auth',
//   ];

//   useEffect(() => {
//     setHasMounted(true);
//   }, []);

//   useEffect(() => {
//     const fetchInfo = async () => {
//       try {
//         const info = await getClientInfo();
//         dispatch(setInfo(info));
//       } catch (e) {
//         console.error('Failed to fetch client info', e);
//       }
//     };
//     fetchInfo();
//   }, [dispatch]);

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 10);
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   useEffect(() => {
//     if (accessToken) {
//       dispatch(fetchWalletBalance());
//     }
//   }, [accessToken, dispatch]);

//   // Lock scroll when mobile menu is open
//   useEffect(() => {
//     document.body.style.overflow = isOpen ? 'hidden' : '';
//     return () => {
//       document.body.style.overflow = '';
//     };
//   }, [isOpen]);

//   if (!hasMounted) return null;

//   return (
//     <header
//       className={cn(
//         'fixed left-0 right-0 top-0 z-50 transition-all duration-300 md:px-8 pb-4',
//         scrolled
//           ? 'bg-black/80 py-2 shadow-lg backdrop-blur-md'
//           : 'bg-transparent py-4',
//       )}
//     >
//       <div className="flex items-center justify-between">
//         <Link href="/" className="w-52 h-16">
//           <Image
//             src="https://website-stuff-logos.s3.ap-south-1.amazonaws.com/1.png"
//             alt="scaninfoga"
//             fill
//             priority={true}
//             loading="eager"
//             className="!static"
//           />
//         </Link>

//         {publicPaths.includes(pathname) && (
//           <nav className="hidden items-center space-x-8 rounded-full border border-slate-500 bg-[#060b17] px-6 py-2.5 shadow-[inset_0px_1px_2px_0px_rgba(255,255,255,0.1),inset_0px_-1px_2px_0px_rgba(255,255,255,0.1)] transition-all md:flex">
//             {navItems.map((item) => (
//               <Link
//                 key={item.href}
//                 href={item.href}
//                 className={cn(
//                   `text-base font-medium text-white/90 hover:text-emerald-400`,
//                   pathname === item.href &&
//                     'rounded-3xl bg-emerald-500 px-3 py-1 text-black hover:text-black',
//                 )}
//               >
//                 {item.label}
//               </Link>
//             ))}
//           </nav>
//         )}

//         <div className="hidden items-center space-x-4 md:flex">
//           {token && !publicPaths.includes(pathname) && (
//             <WalletWidget
//               walletLoading={wallet?.loading}
//               credits={wallet.balance}
//               onTopUp={() => {}}
//             />
//           )}

//           {!publicPaths.includes(pathname) && (
//             <Button
//               variant="outline"
//               className="border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-black"
//               onClick={async () => {
//                 if (accessToken) {
//                   router.push('/');
//                   await new Promise((resolve) => setTimeout(resolve, 1000));
//                   dispatch(logout());
//                   await clearCookies();
//                   return;
//                 }
//                 router.push('/auth');
//               }}
//             >
//               {accessToken ? 'Sign out' : 'Sign in'}
//             </Button>
//           )}

//           {accessToken ? (
//             publicPaths.includes(pathname) && (
//               <Button
//                 className="bg-emerald-500 text-black hover:bg-emerald-600"
//                 onClick={() => router.push('/dashboard')}
//               >
//                 Go to dashboard
//               </Button>
//             )
//           ) : (
//             <Button
//               className="bg-emerald-500 text-black hover:bg-emerald-600"
//               onClick={() => router.push('/auth')}
//             >
//               Get Started
//             </Button>
//           )}
//         </div>

//         <div className="mr-4 cursor-pointer md:hidden" onClick={() => setIsOpen(!isOpen)}>
//           {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//           <span className="sr-only">Toggle menu</span>
//         </div>
//       </div>

//       {/* Mobile menu */}
//       {isOpen && (
//         <div className="absolute left-0 right-0 top-0 h-screen bg-black/95 backdrop-blur-sm md:hidden">
//           <nav className="flex flex-col space-y-6 p-8 pt-24">
//             {navItems.map((item) => (
//               <Link
//                 key={item.href}
//                 href={item.href}
//                 className="text-lg font-medium text-white hover:text-emerald-400"
//                 onClick={() => setIsOpen(false)}
//               >
//                 {item.label}
//               </Link>
//             ))}

//             <div className="flex flex-col space-y-4 pt-6">
//               <Button
//                 variant="outline"
//                 className="w-full border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-black"
//                 onClick={() => {
//                   setIsOpen(false);
//                   router.push('/auth');
//                 }}
//               >
//                 Sign In
//               </Button>
//               <Button
//                 className="w-full bg-emerald-500 text-black hover:bg-emerald-600"
//                 onClick={() => {
//                   setIsOpen(false);
//                   router.push('/auth');
//                 }}
//               >
//                 Get Started
//               </Button>
//             </div>
//           </nav>
//         </div>
//       )}
//     </header>
//   );
// }

'use client';

import { clearCookies } from '@/actions/clearCookies';
import { Button } from '@/components/ui/button';
import { cn, getClientInfo } from '@/lib/utils';
import { setInfo } from '@/redux/infoSlice';
import { AppDispatch, RootState } from '@/redux/store';
import { logout } from '@/redux/userSlice';
import { fetchWalletBalance } from '@/redux/walletSlice';
import { getCookie } from 'cookies-next';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { WalletWidget } from '../common/WalletWidget';
import Image from 'next/image';
import { useSidebar } from '@/context/SidebarContext';
import { publicRoutes } from '@/lib/routePermissions';
import { toast } from 'sonner';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Tools', href: '/tools' },
  { label: 'Services', href: '/services' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Contact', href: '/contact' },
  { label: 'About us', href: '/aboutUs' },
];

export default function Navbar() {
  const { isOpen: sidebarOpen, setIsOpen: setSideBarOpen } = useSidebar();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const accessToken = getCookie('accessToken');
  const wallet = useSelector((state: RootState) => state.wallet);
  const token = useSelector((state: RootState) => state.user.token);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const info = await getClientInfo();
        if (!(info instanceof Error)) {
          dispatch(setInfo(info));
        }
      } catch (e) {
        if (e instanceof Error) {
          router.push('/');
          try {
            const permission = await navigator.permissions.query({
              name: 'geolocation',
            });

            if (permission.state === 'denied') {
              toast.error(
                'We need your location to proceed. Please enable it in your browser’s address bar.',
                {
                  id: 1,
                  duration: 8000,
                },
              );
              return;
            }
            const retryInfo = await getClientInfo();
            if (!(retryInfo instanceof Error)) {
              dispatch(setInfo(retryInfo));
              return;
            }
          } catch (geoError) {}
        }
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

  useEffect(() => {
    if (accessToken) {
      dispatch(fetchWalletBalance());
    }
  }, [accessToken, dispatch]);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!hasMounted) return null;

  return (
    <header
      className={cn(
        'fixed left-0 right-0 top-0 z-50 bg-[#060b17] pb-4 transition-all duration-300 md:px-8',
        // scrolled
        //   ? 'bg-gray-900/50 py-2 shadow-lg backdrop-blur-2xl'
        //   : 'bg-transparent py-4',
      )}
    >
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="relative -top-1 -z-50 h-16 w-52 hover:cursor-pointer"
        >
          <Image
            src="https://website-stuff-logos.s3.ap-south-1.amazonaws.com/1.png"
            alt="scaninfoga"
            fill
            priority={true}
            loading="eager"
            className="!static"
          />
        </Link>

        {publicRoutes.includes(pathname) && (
          <nav className="hidden items-center space-x-8 rounded-full border border-slate-500 bg-[#060b17] px-6 py-2.5 shadow-[inset_0px_1px_2px_0px_rgba(255,255,255,0.1),inset_0px_-1px_2px_0px_rgba(255,255,255,0.1)] transition-all md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  `text-base font-medium text-white/90 hover:text-emerald-400`,
                  pathname === item.href &&
                    'rounded-3xl bg-emerald-500 px-3 py-1 text-black hover:text-black',
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}

        <div className="hidden items-center space-x-4 md:flex">
          {token && !publicRoutes.includes(pathname) && (
            <WalletWidget
              walletLoading={wallet?.loading}
              credits={wallet.balance}
              onTopUp={() => {}}
            />
          )}

          {!publicRoutes.includes(pathname) && (
            <Button
              variant="outline"
              className="border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-black"
              onClick={async () => {
                if (accessToken) {
                  router.push('/');
                  await new Promise((resolve) => setTimeout(resolve, 1000));
                  dispatch(logout());
                  await clearCookies();
                  return;
                }
                router.push('/auth');
              }}
            >
              {accessToken ? 'Sign out' : 'Sign in'}
            </Button>
          )}

          {accessToken ? (
            publicRoutes.includes(pathname) && (
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

        {(!token || publicRoutes.includes(pathname)) && (
          <div
            className="mr-4 cursor-pointer md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            <span className="sr-only">Toggle menu</span>
          </div>
        )}
        {token && !publicRoutes.includes(pathname) ? (
          <div
            className="mr-4 cursor-pointer md:hidden"
            onClick={() => setSideBarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
            <span className="sr-only">Toggle menu</span>
          </div>
        ) : (
          // <></>
          <div
            className={cn(
              'fixed right-0 top-0 h-screen w-4/5 max-w-xs transform bg-black/95 backdrop-blur-sm transition-transform duration-300 md:hidden',
              isOpen ? 'translate-x-0' : 'translate-x-full',
            )}
          >
            <div className="flex items-center justify-between p-4">
              <span className="text-lg font-semibold text-white">Menu</span>
              <button onClick={() => setIsOpen(false)}>
                <X className="h-6 w-6 text-white" />
              </button>
            </div>

            <nav className="flex flex-col space-y-6 p-8 pt-6">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-lg font-medium text-white hover:text-emerald-400"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}

              <div className="flex flex-col space-y-4 pt-6">
                <Button
                  variant="outline"
                  className="w-full border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-black"
                  onClick={async () => {
                    if (accessToken) {
                      router.push('/');
                      await new Promise((resolve) => setTimeout(resolve, 1000));
                      dispatch(logout());
                      await clearCookies();
                      return;
                    }
                    router.push('/auth');
                  }}
                >
                  {accessToken ? 'Sign out' : 'Sign in'}
                </Button>{' '}
                {accessToken ? (
                  publicRoutes.includes(pathname) && (
                    <Button
                      className="w-full bg-emerald-500 text-black hover:bg-emerald-600"
                      onClick={() => router.push('/dashboard')}
                    >
                      Go to dashboard
                    </Button>
                  )
                ) : (
                  <Button
                    className="w-full bg-emerald-500 text-black hover:bg-emerald-600"
                    onClick={() => router.push('/auth')}
                  >
                    Get Started
                  </Button>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
