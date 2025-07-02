import { DashboardSidebar } from '@/components/dashboard/sidebar';
import Navbar from '@/components/sub/navbar';
import React from 'react';
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />

      <DashboardSidebar />

      <div className="px-4 pt-20 md:pl-80 md:pr-10">{children}</div>
    </>
  );
}
