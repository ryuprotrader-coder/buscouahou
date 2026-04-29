import type { Session } from '@supabase/supabase-js';

export const AUTH_COOKIE_NAME = 'maismelhor-auth-token';

export interface StoredSessionCookie {
  access_token: string;
  refresh_token: string;
  expires_at: number | null;
}

export function serializeSessionCookie(session: Pick<Session, 'access_token' | 'refresh_token' | 'expires_at'>): string {
  return encodeURIComponent(
    JSON.stringify({
      access_token: session.access_token,
      refresh_token: session.refresh_token,
      expires_at: session.expires_at ?? null,
    } satisfies StoredSessionCookie)
  );
}

export function parseSessionCookie(value: string): StoredSessionCookie | null {
  try {
    const parsed = JSON.parse(decodeURIComponent(value)) as Partial<StoredSessionCookie>;
    if (!parsed.access_token || !parsed.refresh_token) {
      return null;
    }

    return {
      access_token: parsed.access_token,
      refresh_token: parsed.refresh_token,
      expires_at: typeof parsed.expires_at === 'number' ? parsed.expires_at : null,
    };
  } catch {
    return null;
  }
}
