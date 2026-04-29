import { createClient } from '@supabase/supabase-js';
import { defineMiddleware } from 'astro:middleware';
import { AUTH_COOKIE_NAME, parseSessionCookie } from './lib/auth-cookie';

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;
  const isDashboard = pathname.startsWith('/dashboard');
  const isAuthPage = pathname.startsWith('/auth');

  const rawCookie = context.cookies.get(AUTH_COOKIE_NAME)?.value;
  const storedSession = rawCookie ? parseSessionCookie(rawCookie) : null;

  let session: import('@supabase/supabase-js').Session | null = null;

  if (storedSession) {
    try {
      const supabase = createClient(
        import.meta.env.SUPABASE_PROJECT_URL,
        import.meta.env.SUPABASE_ANON_KEY,
        { auth: { persistSession: false, autoRefreshToken: false } }
      );

      const { data, error } = await supabase.auth.setSession({
        access_token: storedSession.access_token,
        refresh_token: storedSession.refresh_token,
      });

      if (!error) {
        session = data.session ?? null;
      }
    } catch {
      session = null;
    }
  }

  context.locals.session = session;
  context.locals.user = session?.user ?? null;

  if (isDashboard && !session) {
    const loginUrl = new URL('/auth/login', context.url);
    loginUrl.searchParams.set('redirect', pathname);
    return context.redirect(loginUrl.toString());
  }

  if (isAuthPage && session && !pathname.startsWith('/auth/callback')) {
    return context.redirect('/client');
  }

  return next();
});
