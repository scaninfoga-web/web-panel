import { DashboardSidebar } from '@/components/dashboard/sidebar';
import Navbar from '@/components/navbar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <DashboardSidebar />
      <main className="absolute w-[-webkit-fill-available] pl-1 md:pl-64">
        {children}
      </main>
    </div>
  );
}
