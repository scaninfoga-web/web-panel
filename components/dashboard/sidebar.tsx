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
import { Badge } from '@/components/ui/badge';
import {
  Bookmark,
  Clock,
  FileText,
  LayoutDashboard,
  Telescope,
  Monitor,
  Search,
  Crown,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSelector } from 'react-redux';

const sidebarLinks = [
  {
    title: 'User Profile',
    icon: LayoutDashboard,
    href: '/profile',
    roles: ['ADMIN', 'USER'],
  },
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
    title: 'Digital Intelligence',
    icon: Search,
    href: '/digitalIntelligence',
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
  // {
  //   title: 'Transaction History',
  //   icon: Monitor,
  //   href: '/transactionHistory',
  //   roles: ['USER'],
  // },
];

const getSubscriptionColor = (type: string) => {
  switch (type) {
    case 'silver':
      return 'bg-gradient-to-r from-gray-400 to-gray-600 text-white border-gray-300';
    case 'gold':
      return 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white border-yellow-300';
    case 'platinum':
      return 'bg-gradient-to-r from-purple-400 to-purple-600 text-white border-purple-300';
    default:
      return 'bg-gradient-to-r text-xs from-gray-400 to-gray-600 text-white border-gray-300';
  }
};
const getSubscriptionIcon = (type: string) => {
  return <Crown className="h-5 w-5" />;
};

export function DashboardSidebar() {
  const pathname = usePathname();
  const userType = useSelector((state: any) => state?.user?.user?.userType);
  const userInfo = useSelector((state: any) => state?.user?.user);

  const filteredLinks = sidebarLinks.filter((link) =>
    link.roles.includes(userType),
  );

  return (
    <aside className="left-0 top-0 z-40 hidden h-screen w-64 border-r border-gray-800 bg-gray-900/50 pt-16 backdrop-blur-sm md:fixed md:block">
      <div className="flex h-full flex-col justify-between p-4">
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
        <div className="group flex min-h-16 items-center space-x-2 overflow-hidden border-t border-slate-700 pt-2 hover:cursor-pointer">
          <div className="flex min-h-10 min-w-10 items-center justify-center rounded-full border border-slate-800 text-sm font-semibold uppercase transition-colors duration-500 group-hover:border-slate-700">
            {userInfo?.firstName.charAt(0) + userInfo?.lastName.charAt(0)}
          </div>
          <div>
            <div className="flex items-center space-x-2 text-sm font-medium">
              <span className="whitespace-nowrap">
                {userInfo?.firstName + ' ' + userInfo?.lastName || ''}
              </span>
              <span className="animate-pulse rounded-full border border-slate-600 px-1.5 py-0.5 text-xs text-slate-300">
                Free plan
              </span>
            </div>
            <div className="overflow-hidden text-xs text-slate-400">
              {userInfo?.email || ''}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
