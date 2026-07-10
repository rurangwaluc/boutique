'use client';

import { useEffect } from 'react';

export function PwaRegister() {
  useEffect(() => {
    if (!('serviceWorker' in navigator)) {
      return;
    }

    const register = async () => {
      try {
        await navigator.serviceWorker.register('/sw.js', {
          scope: '/',
        });
      } catch {
        // Keep the app usable even if service worker registration fails.
      }
    };

    window.addEventListener('load', register);

    return () => {
      window.removeEventListener('load', register);
    };
  }, []);

  return null;
}
