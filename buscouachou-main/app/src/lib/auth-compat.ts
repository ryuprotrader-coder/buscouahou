/**
 * auth-compat.ts — mantém a função syncSessionCookie para compatibilidade
 * com o middleware e código legado que ainda faz import direto.
 */
import type { Session } from '@supabase/supabase-js';
import { AUTH_COOKIE_NAME, serializeSessionCookie } from './auth-cookie';

function writeSessionCookie(session: Session | null) {
  if (typeof document === 'undefined') return;
  if (!session) {
    document.cookie = `${AUTH_COOKIE_NAME}=; Path=/; Max-Age=0; SameSite=Lax`;
    return;
  }
  const maxAge = session.expires_at
    ? Math.max(session.expires_at - Math.floor(Date.now() / 1000), 0)
    : 60 * 60 * 24 * 7;
  const secure = window.location.protocol === 'https:' ? '; Secure' : '';
  document.cookie = `${AUTH_COOKIE_NAME}=${serializeSessionCookie(session)}; Path=/; Max-Age=${maxAge}; SameSite=Lax${secure}`;
}

export async function syncSessionCookie(session?: Session | null) {
  if (session !== undefined) {
    writeSessionCookie(session);
    return session;
  }
  // Lazy import to avoid circular dep
  const { supabase } = await import('./supabase');
  const { data } = await supabase.auth.getSession();
  writeSessionCookie(data.session ?? null);
  return data.session ?? null;
}
