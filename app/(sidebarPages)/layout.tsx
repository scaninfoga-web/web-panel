import { DashboardSidebar } from '@/components/dashboard/sidebar';
import React from 'react';
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DashboardSidebar />
      <div className="pl-72 pr-10 pt-20">{children}</div>
    </>
  );
}
