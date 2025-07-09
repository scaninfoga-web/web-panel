'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
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
  User,
  Settings,
  ChevronLeft,
} from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import Image from 'next/image';
import { useSidebar } from '@/context/SidebarContext';

const sidebarLinks = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    href: '/dashboard',
    roles: ['USER', 'ADMIN'],
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
    roles: ['USER', 'ADMIN'],
  },
  {
    title: 'History',
    icon: Clock,
    href: '/dashboard/history',
    roles: ['USER', 'ADMIN'],
  },
  { title: 'Reports', icon: FileText, href: '/reports', roles: ['ADMIN'] },
  { title: 'Monitor', icon: Monitor, href: '/monitor', roles: ['ADMIN'] },
];

const getSubscriptionColor = (type?: string) => {
  switch (type?.toUpperCase()) {
    case 'SILVER':
      return 'bg-gradient-to-r from-gray-400 to-gray-600 text-white border-gray-300';
    case 'GOLD':
      return 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white border-yellow-300';
    case 'PLATINUM':
      return 'bg-gradient-to-r from-blue-400 to-blue-600 text-white border-blue-300';
    case 'PREMIUM':
      return 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white border-purple-400';
    default:
      return 'bg-gradient-to-r from-gray-400 to-gray-600 text-white border-gray-300';
  }
};

const getSubscriptionIcon = (type?: string) => <Crown className="h-3 w-3" />;

export function DashboardSidebar() {
  const pathname = usePathname();
  const userData = useSelector((state: RootState) => state.user.user);
  const { isOpen, setIsOpen } = useSidebar();

  const filteredLinks = sidebarLinks.filter((link) =>
    link.roles.includes(userData.userType || 'USER'),
  );

  const initials =
    (userData?.firstName?.charAt(0) || '') +
    (userData?.lastName?.charAt(0) || '');
  const fullName =
    `${userData?.firstName || ''} ${userData?.lastName || ''}`.trim();

  const router = useRouter();

  return (
    <div
      className={cn(
        'bg-black-900/50 fixed inset-y-0 left-0 z-50 w-full transform border-r border-gray-800 backdrop-blur-2xl transition-all duration-100 sm:backdrop-blur-0 md:w-72',
        isOpen ? '-translate-x-0' : '-translate-x-full md:-translate-x-0',
      )}
    >
      <div
        className="relative -top-1 mx-auto h-16 w-52"
        onClick={() => router.push('/')}
      >
        <Image
          src="https://website-stuff-logos.s3.ap-south-1.amazonaws.com/1.png"
          alt="scaninfoga"
          fill
          priority={true}
          loading="eager"
          className="!static sm:hidden"
        />
      </div>

      <div className="border-b border-gray-800"></div>
      <div
        className="flex items-center justify-end pr-4 md:hidden"
        onClick={() => setIsOpen(false)}
      >
        <ChevronLeft height={32} width={32} onClick={() => setIsOpen(false)} />{' '}
        <span>Back</span>
      </div>

      <div className="flex h-full flex-col justify-between">
        <nav className="space-y-1 p-4">
          {filteredLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link href={link.href} key={link.href}>
                <Button
                  variant="ghost"
                  className={cn(
                    'w-full justify-start gap-3 text-gray-300 transition-colors hover:bg-gray-800/50',
                    isActive &&
                      'bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20',
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  <link.icon className="h-5 w-5" />
                  {link.title}
                </Button>
              </Link>
            );
          })}
        </nav>

        <div className="bg-black-900/50 mb-16 border-t border-slate-700 p-4">
          <div className="group mb-3 flex items-center space-x-3 rounded-full p-2 transition-all duration-300 hover:bg-slate-800/50">
            <div className="relative">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg transition-transform duration-300 group-hover:scale-105">
                <span className="text-sm font-bold">{initials || 'U'}</span>
              </div>
              <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-gray-900 bg-green-500"></div>
            </div>

            <div className="min-w-0 flex-1">
              <div className="mb-1 flex items-center space-x-2">
                <span className="truncate text-sm font-semibold text-white">
                  {fullName || 'User'}
                </span>
                <Badge
                  className={`${getSubscriptionColor(userData.subscriptionPlan)} px-2 py-0.5 text-xs shadow-sm`}
                >
                  {getSubscriptionIcon(userData.subscriptionType)}
                  <span className="ml-1 uppercase tracking-wide">
                    {userData?.subscriptionPlan || 'Free'}
                  </span>
                </Badge>
              </div>
              <div className="truncate text-xs text-slate-400">
                {userData?.email || 'No email'}
              </div>
            </div>
          </div>

          <div className="flex space-x-2">
            <Link href="/profile" className="flex-1">
              <Button
                variant="outline"
                size="sm"
                className="h-8 w-full rounded-full text-xs font-medium transition-all duration-200 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 dark:hover:border-blue-700 dark:hover:bg-blue-950 dark:hover:text-blue-300"
                onClick={() => setIsOpen(false)}
              >
                <User className="mr-1.5 h-3 w-3" />
                Profile
              </Button>
            </Link>

            <Link href="/subscriptions" className="flex-1">
              <Button
                variant="outline"
                size="sm"
                className="h-8 w-full rounded-full text-xs font-medium transition-all duration-200 hover:border-purple-300 hover:bg-purple-50 hover:text-purple-700 dark:hover:border-purple-700 dark:hover:bg-purple-950 dark:hover:text-purple-300"
                onClick={() => setIsOpen(false)}
              >
                <Settings className="mr-1.5 h-3 w-3" />
                Plans
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
