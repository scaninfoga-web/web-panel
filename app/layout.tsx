import type { Metadata } from 'next';
import './globals.css';
import axios from 'axios';

import { Providers } from './provider';
import Navbar from '@/components/navbar';

export const metadata: Metadata = {
  title: 'Scaninfoga App',
  description: 'Created by ',
};

axios.defaults.baseURL = 'http://localhost:8000';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Navbar />
          {children}
          </Providers>
      </body>
    </html>
  );
}
