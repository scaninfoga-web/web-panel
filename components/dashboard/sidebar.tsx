// 'use client';

// import { cn } from '@/lib/utils';
// import { Button } from '@/components/ui/button';
// import {
//   Bookmark,
//   Clock,
//   FileText,
//   LayoutDashboard,
//   Telescope,
//   Monitor,
// } from 'lucide-react';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';

// const sidebarLinks = [
//   {
//     title: 'Dashboard',
//     icon: LayoutDashboard,
//     href: '/dashboard',
//   },
//   {
//     title: 'Combined Dash',
//     icon: LayoutDashboard,
//     href: '/combinedDash',
//   },
//   {
//     title: 'Ghunt',
//     icon: Telescope,
//     href: '/ghunt',
//   },
//   {
//     title: 'Scaninfoga Intelligence',
//     icon: Telescope,
//     href: '/scaninfogaIntelligence',
//   },
//   {
//     title: 'Bookmarks',
//     icon: Bookmark,
//     href: '/dashboard/bookmarks',
//   },
//   {
//     title: 'History',
//     icon: Clock,
//     href: '/dashboard/history',
//   },
//   {
//     title: 'Reports',
//     icon: FileText,
//     href: '/dashboard/reports',
//   },
//   {
//     title: 'Monitor',
//     icon: Monitor,
//     href: '/dashboard/monitor',
//   },
//   {
//     title: 'Transaction History',
//     icon: Monitor,
//     href: '/transactionHistory',
//   },
// ];

// export function DashboardSidebar() {
//   const pathname = usePathname();

//   return (
//     <aside className="left-0 top-0 z-40 hidden h-screen w-64 border-r border-gray-800 bg-gray-900/50 pt-16 backdrop-blur-sm md:fixed md:block">
//       <div className="flex h-full flex-col px-3 py-4">
//         <nav className="space-y-1">
//           {sidebarLinks.map((link) => {
//             const isActive = pathname === link.href;
//             return (
//               <Link key={link.href} href={link.href} className="block">
//                 <Button
//                   variant="ghost"
//                   className={cn(
//                     'w-full justify-start gap-2 hover:bg-gray-800/50',
//                     isActive &&
//                       'bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20',
//                   )}
//                 >
//                   <link.icon className="h-5 w-5" />
//                   {link.title}
//                 </Button>
//               </Link>
//             );
//           })}
//         </nav>
//       </div>
//     </aside>
//   );
// }

'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Bookmark,
  Clock,
  FileText,
  LayoutDashboard,
  Telescope,
  Monitor,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSelector } from 'react-redux';

const sidebarLinks = [
  {
    title: 'User Transactions',
    icon: LayoutDashboard,
    href: '/userTransactions',
    roles: ['ADMIN'],
  },
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    href: '/dashboard',
    roles: ['USER', 'ADMIN'],
  },
  {
    title: 'Combined Dash',
    icon: LayoutDashboard,
    href: '/combinedDash',
    roles: ['USER'],
  },
  {
    title: 'Ghunt',
    icon: Telescope,
    href: '/ghunt',
    roles: ['USER', 'ADMIN'],
  },
  {
    title: 'Scaninfoga Intelligence',
    icon: Telescope,
    href: '/scaninfogaIntelligence',
    roles: ['USER', 'ADMIN'],
  },
  {
    title: 'Bookmarks',
    icon: Bookmark,
    href: '/dashboard/bookmarks',
    roles: ['USER'],
  },
  {
    title: 'History',
    icon: Clock,
    href: '/dashboard/history',
    roles: ['USER', 'ADMIN'],
  },
  {
    title: 'Reports',
    icon: FileText,
    href: '/dashboard/reports',
    roles: ['ADMIN'],
  },
  {
    title: 'Monitor',
    icon: Monitor,
    href: '/dashboard/monitor',
    roles: ['ADMIN'],
  },
  {
    title: 'Transaction History',
    icon: Monitor,
    href: '/transactionHistory',
    roles: ['USER'],
  },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const userType = useSelector((state: any) => state.user.user.userType);

  console.log('USERTYOE: ', userType);

  const filteredLinks = sidebarLinks.filter((link) =>
    link.roles.includes(userType),
  );

  return (
    <aside className="left-0 top-0 z-40 hidden h-screen w-64 border-r border-gray-800 bg-gray-900/50 pt-16 backdrop-blur-sm md:fixed md:block">
      <div className="flex h-full flex-col px-3 py-4">
        <nav className="space-y-1">
          {filteredLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link key={link.href} href={link.href} className="block">
                <Button
                  variant="ghost"
                  className={cn(
                    'w-full justify-start gap-2 hover:bg-gray-800/50',
                    isActive &&
                      'bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20',
                  )}
                >
                  <link.icon className="h-5 w-5" />
                  {link.title}
                </Button>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
