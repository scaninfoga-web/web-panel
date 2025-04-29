import Navbar from '@/components/navbar';
import { ReactNode } from 'react';

export default function DashLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="px-10 pb-8 pt-20">{children}</main>
    </>
  );
}
