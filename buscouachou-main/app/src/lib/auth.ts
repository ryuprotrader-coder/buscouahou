/**
 * auth.ts — client-side auth helpers.
 *
 * Estratégia:
 *  - Mutações de auth (login, logout, registro…) → fetch da API externa EXPRESS 
 *    passando credentials para garantir que o cookie server-side seja salvo.
 *  - Leituras de dados do usuário e perfil também via API externa para manter 
 *    a fonte de verdade no servidor, isolando o Supabase do cliente.
 */
import type { AuthError, Session, User } from '@supabase/supabase-js';
import { supabase } from './supabase';
import { AUTH_COOKIE_NAME, serializeSessionCookie } from './auth-cookie';

export const API_URL = import.meta.env.PUBLIC_API_URL || 'http://localhost:3001';

export interface SignUpData {
  email: string;
  password: string;
  nome: string;
  sobrenome?: string;
  role?: 'cliente' | 'lojista';
}

export interface SignInData {
  email: string;
  password: string;
}

export interface AuthResult<T = null> {
  data: T | null;
  error: AuthError | Error | null;
}

// ---------------------------------------------------------------------------
// Auth
// ---------------------------------------------------------------------------

export async function signUp({ email, password, nome, sobrenome, role = 'cliente' }: SignUpData): Promise<AuthResult<User>> {
  const res = await fetch(`${API_URL}/api/auth/registro`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, nome, sobrenome, role }),
    credentials: 'include',
  });
  const json = await res.json();
  if (!res.ok) return { data: null, error: new Error(json.error?.message ?? 'Erro ao registrar.') };
  return { data: json.data?.user ?? null, error: null };
}

export async function signIn({ email, password }: SignInData): Promise<AuthResult<{ session: Session; user: User & { role?: string } }>> {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
    credentials: 'include',
  });
  const json = await res.json();
  if (!res.ok) return { data: null, error: new Error(json.error?.message ?? 'Credenciais inválidas.') };
  return { data: json.data ?? null, error: null };
}

export async function signInWithGoogle(): Promise<AuthResult> {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: `${window.location.origin}/auth/callback` },
  });
  return { data: null, error };
}

export async function signOut(): Promise<AuthResult> {
  const res = await fetch(`${API_URL}/api/auth/logout`, { method: 'POST', credentials: 'include' });
  const json = await res.json();
  if (!res.ok) return { data: null, error: new Error(json.error?.message ?? 'Erro ao sair.') };
  
  await supabase.auth.signOut(); // Limpar cliente local do sdk também
  return { data: null, error: null };
}

export async function resetPassword(email: string): Promise<AuthResult> {
  const res = await fetch(`${API_URL}/api/auth/reset-senha`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
    credentials: 'include',
  });
  const json = await res.json();
  if (!res.ok) return { data: null, error: new Error(json.error?.message ?? 'Erro ao redefinir senha.') };
  return { data: null, error: null };
}

export async function updatePassword(newPassword: string): Promise<AuthResult> {
  const res = await fetch(`${API_URL}/api/user/perfil`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password: newPassword }),
    credentials: 'include',
  });
  const json = await res.json();
  if (!res.ok) return { data: null, error: new Error(json.error?.message ?? 'Erro ao atualizar senha.') };
  return { data: null, error: null };
}

// ---------------------------------------------------------------------------
// Session / User (Ainda usando SDK para algumas verificações cliente, mas idealmente seria api)
// ---------------------------------------------------------------------------

export async function getSession(): Promise<Session | null> {
  const { data } = await supabase.auth.getSession();
  return data.session ?? null;
}

export async function getUser(): Promise<User | null> {
  const { data } = await supabase.auth.getUser();
  return data.user ?? null;
}

export function onAuthStateChange(
  callback: (session: Session | null) => void | Promise<void>
): () => void {
  const { data } = supabase.auth.onAuthStateChange(async (_event, session) => {
    await callback(session);
  });
  return () => data.subscription.unsubscribe();
}

// ---------------------------------------------------------------------------
// User data — via API Externa
// ---------------------------------------------------------------------------

export async function getProfile() {
  const res = await fetch(`${API_URL}/api/user/perfil`, { credentials: 'include' });
  const json = await res.json();
  if (!res.ok) {
    console.error('[auth] Failed to fetch profile via API:', json.error?.message);
    return null;
  }
  return json.data?.perfil ?? null;
}

export async function updateProfile(data: {
  nome?: string;
  sobrenome?: string | null;
  telefone?: string | null;
  avatar_url?: string | null;
}) {
  const res = await fetch(`${API_URL}/api/user/perfil`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    credentials: 'include',
  });
  const json = await res.json();
  if (!res.ok) {
    return { error: new Error(json.error?.message ?? 'Failed to update profile') };
  }
  return { error: null };
}

export async function updateUserCredentials(data: { email?: string; password?: string }) {
  const res = await fetch(`${API_URL}/api/user/perfil`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    credentials: 'include',
  });
  const json = await res.json();
  if (!res.ok) {
    return { error: new Error(json.error?.message ?? 'Failed to update credentials') };
  }
  return { error: null };
}

export async function getPlanos() {
  const res = await fetch(`${API_URL}/api/user/planos`);
  const json = await res.json();
  if (!res.ok) return [];
  return json.data?.planos ?? [];
}

export async function getUserAssinatura() {
  const res = await fetch(`${API_URL}/api/user/assinatura`, { credentials: 'include' });
  const json = await res.json();
  if (!res.ok) return null;
  return json.data?.assinatura ?? null;
}

export async function getBillingHistory() {
  const res = await fetch(`${API_URL}/api/user/historico`, { credentials: 'include' });
  const json = await res.json();
  if (!res.ok) return [];
  return json.data?.historico ?? [];
}

// ---------------------------------------------------------------------------
// Cookie sync — mantido para compatibilidade com AuthCookieSync.tsx
// ---------------------------------------------------------------------------

function writeSessionCookie(session: import('@supabase/supabase-js').Session | null) {
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

export async function syncSessionCookie(session?: import('@supabase/supabase-js').Session | null) {
  if (session !== undefined) {
    writeSessionCookie(session);
    return session;
  }
  const { data } = await supabase.auth.getSession();
  writeSessionCookie(data.session ?? null);
  return data.session ?? null;
}
