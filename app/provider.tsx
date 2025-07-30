'use client';

import { useEffect } from 'react';
import { AuthProvider } from '@/components/providers/AuthProvider';
import { persistor, store } from '@/redux/store';
import { Provider } from 'react-redux';
import { Toaster } from 'sonner';
import { PersistGate } from 'redux-persist/integration/react';
import { usePathname, useRouter } from 'next/navigation';

export function Providers({ children }: { children: React.ReactNode }) {
  const pathName = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Disable right-click
    if (!process.env.NEXT_PUBLIC_BACKEND_URL?.includes('dev')) {
      const handleContextMenu = (e: MouseEvent) => e.preventDefault();
      document.addEventListener('contextmenu', handleContextMenu);

      // Disable F12, Ctrl+Shift+I/J/C, Ctrl+U
      const handleKeyDown = (e: KeyboardEvent) => {
        if (
          e.key === 'F12' ||
          (e.ctrlKey && e.shiftKey && ['I', 'J', 'C'].includes(e.key)) ||
          (e.ctrlKey && e.key === 'U')
        ) {
          e.preventDefault();
        }
      };
      document.addEventListener('keydown', handleKeyDown);

      // Detect DevTools
      const threshold = 160;
      const interval = setInterval(() => {
        const widthThreshold =
          window.outerWidth - window.innerWidth > threshold;
        const heightThreshold =
          window.outerHeight - window.innerHeight > threshold;
        if (widthThreshold || heightThreshold) {
          if (pathName !== '/') {
            router.push('/');
          }
        }
      }, 1000);

      // Cleanup
      return () => {
        document.removeEventListener('contextmenu', handleContextMenu);
        document.removeEventListener('keydown', handleKeyDown);
        clearInterval(interval);
      };
    }
  }, []);

  return (
    <Provider store={store}>
      <Toaster position="top-right" richColors />
      <PersistGate loading={null} persistor={persistor}>
        <AuthProvider>{children}</AuthProvider>
      </PersistGate>
    </Provider>
  );
}
