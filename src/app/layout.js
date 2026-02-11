/**
 * Root Layout
 * Main layout untuk seluruh aplikasi
 */

import { Inter } from 'next/font/google';
import './globals.css';
import { AppProvider } from '@/contexts/AppContext';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Football Ranking System',
  description: 'International Football Ranking & Competition Management System',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProvider>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#151a2e',
                color: '#e4e7eb',
                border: '1px solid #2a2f45',
              },
              success: {
                iconTheme: {
                  primary: '#10b981',
                  secondary: '#fff',
                },
              },
              error: {
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#fff',
                },
              },
            }}
          />
        </AppProvider>
      </body>
    </html>
  );
}