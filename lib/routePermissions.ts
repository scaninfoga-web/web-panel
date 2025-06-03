export const publicRoutes: string[] = [
  '/',
  '/auth',
  '/aboutUs',
  '/pricing',
  '/tools',
  '/contact',
  '/api/ip',
  '/auth/admin',
];

export const routeAccess: Record<string, string[]> = {
  '/dashboard': ['USER'],
  '/combinedDash': ['USER'],
  '/scaninfogaIntelligence': ['USER'],
  '/dashboard/bookmarks': ['USER'],
  '/dashboard/history': ['USER', 'ADMIN'],
  '/reports': ['ADMIN'],
  'dashboard/monitor': ['ADMIN'],
  '/transactionHistory': ['USER', 'ADMIN'],
  '/userTransactions': ['ADMIN'],
};
