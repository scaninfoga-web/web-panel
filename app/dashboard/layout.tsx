import { DashboardSidebar } from '@/components/dashboard/sidebar';
import Navbar from '@/components/navbar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      <Navbar />
      <DashboardSidebar />
      <main className="absolute w-[-webkit-fill-available] pl-64">
        {children}
      </main>
    </div>
  );
}
