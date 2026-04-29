import { useEffect } from 'react';
import { onAuthStateChange, syncSessionCookie } from '../../lib/auth';

export default function AuthCookieSync() {
  useEffect(() => {
    syncSessionCookie().catch(() => {});

    return onAuthStateChange(async () => {
      await syncSessionCookie();
    });
  }, []);

  return null;
}
