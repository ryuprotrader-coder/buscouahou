import { createClient } from '@supabase/supabase-js';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { Request, Response } from 'express';

// Trazido da lógica antiga de Astro (auth-cookie.ts)
export const AUTH_COOKIE_NAME = 'maismelhor-auth-token';

export function parseSessionCookie(cookieValue: string) {
  try {
    // express cookie-parser já faz decodeURIComponent, então cookieValue costuma ser JSON cru
    // Mas para segurança, tentamos JSON.parse direto, ou um fallback com decode extra
    const jsonStr = cookieValue.startsWith('{') ? cookieValue : decodeURIComponent(cookieValue);
    const parsed = JSON.parse(jsonStr) as { access_token: string; refresh_token: string };
    
    if (!parsed.access_token || !parsed.refresh_token) return null;
    return parsed;
  } catch (err) {
    console.log('[parseSessionCookie] Error parsing cookie value:', cookieValue);
    console.log('[parseSessionCookie] Exception:', err);
    return null;
  }
}

export function serializeSessionCookie(session: { access_token: string; refresh_token: string }) {
  // Express `res.cookie` usa encodeURIComponent() por padrão se passarmos uma string pura.
  // Porém, passaremos um objeto JSON já construído
  return JSON.stringify({
    access_token: session.access_token,
    refresh_token: session.refresh_token,
  });
}

// ---------------------------------------------------------------------------
// Respostas JSON padronizadas para Express
// ---------------------------------------------------------------------------

export function ok<T>(res: Response, data: T, status = 200) {
  return res.status(status).json({ ok: true, data });
}

export function err(res: Response, code: string, message: string, status = 400, details?: string) {
  return res.status(status).json({
    ok: false,
    error: { code, message, ...(details ? { details } : {}) },
  });
}

// Erros comuns
export const Errors = {
  UNAUTHENTICATED: (res: Response) =>
    err(res, 'UNAUTHENTICATED', 'Você precisa estar logado para acessar este recurso.', 401),
  INVALID_SESSION: (res: Response) =>
    err(res, 'INVALID_SESSION', 'Sua sessão expirou ou é inválida. Faça login novamente.', 401),
  MISSING_FIELDS: (res: Response, fields: string[]) =>
    err(res, 'MISSING_FIELDS', `Campos obrigatórios ausentes: ${fields.join(', ')}.`, 400),
  NOT_FOUND: (res: Response, entity: string) =>
    err(res, 'NOT_FOUND', `${entity} não encontrado(a).`, 404),
  SUPABASE: (res: Response, message: string) =>
    err(res, 'SUPABASE_ERROR', `Erro no banco de dados: ${message}`, 422),
  INTERNAL: (res: Response, details?: string) =>
    err(res, 'INTERNAL_ERROR', 'Ocorreu um erro inesperado no servidor. Tente novamente em instantes.', 500, details),
};

// ---------------------------------------------------------------------------
// Clientes Supabase
// ---------------------------------------------------------------------------

export interface AuthContext {
  supabase: SupabaseClient;
  userId: string;
  userEmail: string | undefined;
  userMeta: Record<string, unknown>;
}

export async function requireAuth(req: Request): Promise<AuthContext | null> {
  console.log(`[requireAuth] Request to: ${req.url}`);
  const rawCookie = req.cookies[AUTH_COOKIE_NAME];
  
  if (!rawCookie) {
    console.log('[requireAuth] FAIL: No cookie found in req.cookies');
    return null;
  }

  const stored = parseSessionCookie(rawCookie);
  if (!stored) {
    console.log('[requireAuth] FAIL: Cookie present but failed to parse');
    return null;
  }

  const url = process.env.SUPABASE_PROJECT_URL!;
  const key = process.env.SUPABASE_ANON_KEY!;

  const supabase = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });

  const { data, error } = await supabase.auth.setSession({
    access_token: stored.access_token,
    refresh_token: stored.refresh_token,
  });

  if (error || !data.session || !data.user) {
    console.log('[requireAuth] FAIL: Supabase rejected session', error?.message);
    return null;
  }

  return {
    supabase,
    userId: data.user.id,
    userEmail: data.user.email,
    userMeta: (data.user.user_metadata as Record<string, unknown>) ?? {},
  };
}

export function anonClient(): SupabaseClient {
  return createClient(process.env.SUPABASE_PROJECT_URL!, process.env.SUPABASE_ANON_KEY!, {
    auth: { persistSession: false },
  });
}

export function setCookie(res: Response, session: import('@supabase/supabase-js').Session) {
  const maxAgeSeconds = session.expires_at
    ? Math.max(session.expires_at - Math.floor(Date.now() / 1000), 0)
    : 60 * 60 * 24 * 7;
  
  // Express recebe maxAge em milissegundos
  res.cookie(AUTH_COOKIE_NAME, serializeSessionCookie(session), {
    path: '/',
    maxAge: maxAgeSeconds * 1000,
    sameSite: 'lax',
    httpOnly: false,
    secure: false, // Localhost não é https, cuidado em prod
  });
}

export function clearCookie(res: Response) {
  res.clearCookie(AUTH_COOKIE_NAME, { path: '/' });
}
