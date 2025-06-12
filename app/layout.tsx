import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './provider';

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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
