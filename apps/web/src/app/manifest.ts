import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'La Elegant Boutique',
    short_name: 'La Elegant',
    description: 'Mobile-first shop system for boutique sales, stock, customers, debts, expenses, and reports.',
    start_url: '/dashboard',
    scope: '/',
    display: 'standalone',
    background_color: '#FAFAFC',
    theme_color: '#F05A9D',
    orientation: 'portrait',
    categories: ['business', 'productivity'],
    icons: [
      {
        src: '/icons/la-elegant-icon.svg',
        sizes: '512x512',
        type: 'image/svg+xml',
        purpose: 'any',
      },
      {
        src: '/icons/la-elegant-maskable.svg',
        sizes: '512x512',
        type: 'image/svg+xml',
        purpose: 'maskable',
      },
    ],
  };
}
