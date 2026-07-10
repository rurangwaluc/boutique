import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { PwaRegister } from './pwa-register';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'La Elegant Boutique',
    template: '%s / La Elegant Boutique',
  },
  description: 'Sales, stock, customers, unpaid sales, expenses, and reports for La Elegant Boutique.',
  manifest: '/manifest.webmanifest',
  applicationName: 'La Elegant Boutique',
  appleWebApp: {
    capable: true,
    title: 'La Elegant',
    statusBarStyle: 'default',
  },
  icons: {
    icon: [
      {
        url: '/icons/la-elegant-icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: [
      {
        url: '/icons/la-elegant-icon.svg',
        type: 'image/svg+xml',
      },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: '#F05A9D',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={geistSans.variable + ' ' + geistMono.variable}>
        <ThemeProvider>
          <PwaRegister />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
