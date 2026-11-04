import { useState, useEffect } from 'react';

export const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.iqw.iqworld_mobile&hl=en_IN';
export const APP_STORE_URL = 'https://apps.apple.com/in/app/iqworld-display/id6748666233';

/**
 * Returns the store URL matching the user's operating system.
 * - iOS / iPadOS -> Apple App Store
 * - Android / Others -> Google Play Store
 */
export const getSmartAppUrl = () => {
  if (typeof window === 'undefined') return PLAY_STORE_URL;

  const ua = navigator.userAgent || navigator.vendor || window.opera || '';
  const isIOS = /iPad|iPhone|iPod/.test(ua) && !window.MSStream;
  const isIPadOS = navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;

  if (isIOS || isIPadOS) {
    return APP_STORE_URL;
  }
  return PLAY_STORE_URL;
};

/**
 * React hook that dynamically detects iOS vs Android on mount
 * and provides the smart URL, platform flags, and direct links.
 */
export function useSmartAppUrl() {
  const [appUrl, setAppUrl] = useState(PLAY_STORE_URL);
  const [isApple, setIsApple] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const ua = navigator.userAgent || navigator.vendor || window.opera || '';
    const isIOS = /iPad|iPhone|iPod/.test(ua) && !window.MSStream;
    const isIPadOS = navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;

    if (isIOS || isIPadOS) {
      setAppUrl(APP_STORE_URL);
      setIsApple(true);
    } else {
      setAppUrl(PLAY_STORE_URL);
      setIsApple(false);
    }
  }, []);

  return { 
    appUrl, 
    isApple, 
    playStoreUrl: PLAY_STORE_URL, 
    appStoreUrl: APP_STORE_URL 
  };
}

