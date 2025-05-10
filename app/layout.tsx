import type { Metadata } from 'next';
import './globals.css';
import axios from 'axios';

import { Providers } from './provider';

export const metadata: Metadata = {
  title: 'Scaninfoga App',
  description: 'Scaninfoga',
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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
