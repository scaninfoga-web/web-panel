export const publicRoutes: string[] = [
  '/',
  '/subscriptions',
  '/auth',
  '/aboutUs',
  '/pricing',
  '/tools',
  '/contact',
  '/api/ip',
  '/auth/admin',
  '/auth/reset-password',
  '/terms-conditions',
  '/privacy',
  '/refund-policy',
  '/services',
];

export const routeAccess: Record<string, string[]> = {
  '/dashboard': ['USER', 'ADMIN'],
  '/combinedDash': ['USER'],
  '/scaninfogaIntelligence': ['USER', 'ADMIN'],
  '/dashboard/bookmarks': ['USER'],
  '/dashboard/history': ['USER', 'ADMIN'],
  '/reports': ['ADMIN'],
  'dashboard/monitor': ['ADMIN'],
  '/transactionHistory': ['USER', 'ADMIN'],
  '/userTransactions': ['ADMIN'],
};
