import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './provider';
import Navbar from '@/components/sub/navbar';
import { SidebarProvider } from '@/context/SidebarContext';

export const metadata: Metadata = {
  title: 'Scaninfoga',
  description: 'Scaninfoga',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scrollbar-custom">
      <body className="">
        <SidebarProvider>
          <Providers>
            <Navbar />
            {children}
          </Providers>
        </SidebarProvider>
      </body>
    </html>
  );
}
