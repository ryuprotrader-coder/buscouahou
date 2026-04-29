import { Router, Request, Response } from 'express';
import { ok, err, Errors, anonClient, setCookie, clearCookie, requireAuth } from '../_helpers';

const router = Router();

router.post('/login', async (req: Request, res: Response) => {
  const body = req.body;
  const missing: string[] = [];
  
  if (!body.email || typeof body.email !== 'string') missing.push('email');
  if (!body.password || typeof body.password !== 'string') missing.push('senha');
  if (missing.length) return Errors.MISSING_FIELDS(res, missing);

  const email = body.email.trim().toLowerCase();
  const password = body.password;

  if (!email.includes('@')) return err(res, 'INVALID_EMAIL', 'O e-mail informado não é válido.', 400);
  if (password.length < 6) return err(res, 'INVALID_PASSWORD', 'A senha deve ter no mínimo 6 caracteres.', 400);

  try {
    const supabase = anonClient();
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      if (error.message.includes('Invalid login credentials')) {
        return err(res, 'WRONG_CREDENTIALS', 'E-mail ou senha incorretos. Verifique e tente novamente.', 401);
      }
      if (error.message.includes('Email not confirmed')) {
        return err(res, 'EMAIL_NOT_CONFIRMED', 'Seu e-mail ainda não foi confirmado. Verifique sua caixa de entrada.', 403);
      }
      if (error.message.includes('Too many requests')) {
        return err(res, 'RATE_LIMITED', 'Muitas tentativas de login. Aguarde alguns minutos e tente novamente.', 429);
      }
      return err(res, 'AUTH_ERROR', error.message, 401);
    }

    if (!data.session || !data.user) {
      return err(res, 'NO_SESSION', 'Não foi possível criar a sessão. Tente novamente.', 500);
    }

    setCookie(res, data.session);

    return ok(res, {
      user: { id: data.user.id, email: data.user.email, ...data.user.user_metadata },
      session: { access_token: data.session.access_token, expires_at: data.session.expires_at },
    });
  } catch (e) {
    return Errors.INTERNAL(res, e instanceof Error ? e.message : String(e));
  }
});

router.post('/registro', async (req: Request, res: Response) => {
  const body = req.body;
  const missing: string[] = [];
  
  if (!body.email || typeof body.email !== 'string') missing.push('email');
  if (!body.password || typeof body.password !== 'string') missing.push('senha');
  if (!body.nome || typeof body.nome !== 'string') missing.push('nome');
  if (missing.length) return Errors.MISSING_FIELDS(res, missing);

  const email = body.email.trim().toLowerCase();
  const password = body.password;
  const nome = body.nome.trim();
  const sobrenome = typeof body.sobrenome === 'string' ? body.sobrenome.trim() : undefined;
  const role = body.role === 'lojista' ? 'lojista' : 'cliente';

  if (!email.includes('@')) return err(res, 'INVALID_EMAIL', 'O e-mail informado não é válido.', 400);
  if (password.length < 6) return err(res, 'WEAK_PASSWORD', 'A senha deve ter no mínimo 6 caracteres.', 400);
  if (nome.length < 2) return err(res, 'INVALID_NAME', 'O nome deve ter pelo menos 2 caracteres.', 400);

  try {
    const supabase = anonClient();
    // No express não temos o origin fácil sem um cabeçalho confiavel, vamos pegar do referer ou do .env
    const origin = req.headers.origin || process.env.CORS_ORIGIN || 'http://localhost:4321';

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { nome, sobrenome, role },
        emailRedirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      if (error.message.includes('already registered') || error.message.includes('already exists')) {
        return err(res, 'EMAIL_TAKEN', 'Este e-mail já está cadastrado. Tente fazer login ou redefinir sua senha.', 409);
      }
      if (error.message.includes('Password')) {
        return err(res, 'WEAK_PASSWORD', 'Senha fraca. Use pelo menos 6 caracteres com letras e números.', 400);
      }
      return err(res, 'SIGNUP_ERROR', error.message, 400);
    }

    if (!data.user) {
      return err(res, 'SIGNUP_FAILED', 'Não foi possível criar a conta. Tente novamente.', 500);
    }

    try {
      if (data.session) {
        await supabase.auth.setSession({
          access_token: data.session.access_token,
          refresh_token: data.session.refresh_token,
        });
      }
      await supabase.from('profiles').insert({
        id: data.user.id,
        nome,
        sobrenome: sobrenome ?? null,
        role
      });
    } catch (profileErr) {
      console.error('[auth/registro] Erro ao criar profile na tabela: ', profileErr);
    }

    if (data.session) {
      setCookie(res, data.session);
    }

    return res.status(201).json({
      ok: true,
      data: {
        user: { id: data.user.id, email: data.user.email },
        requiresEmailConfirmation: !data.session,
      }
    });
  } catch (e) {
    return Errors.INTERNAL(res, e instanceof Error ? e.message : String(e));
  }
});

router.post('/logout', async (req: Request, res: Response) => {
  try {
    const auth = await requireAuth(req);
    if (auth) {
      await auth.supabase.auth.signOut();
    }
  } catch {
    // Falha silenciosa
  }
  clearCookie(res);
  return ok(res, { message: 'Logout realizado com sucesso.' });
});

router.get('/session', async (req: Request, res: Response) => {
  try {
    const auth = await requireAuth(req);
    if (!auth) {
      return ok(res, { authenticated: false, session: null, user: null });
    }

    const { data: { session } } = await auth.supabase.auth.getSession();
    if (!session || !session.user) {
      return ok(res, { authenticated: false, session: null, user: null });
    }
    const user = session.user;

    return ok(res, {
      authenticated: true,
      session: { access_token: session.access_token, expires_at: session.expires_at },
      user: { id: user.id, email: user.email, ...user.user_metadata },
    });
  } catch (e) {
    return Errors.INTERNAL(res, e instanceof Error ? e.message : String(e));
  }
});

router.post('/nova-senha', async (req: Request, res: Response) => {
  const body = req.body;
  const missing: string[] = [];

  // Supabase envia o link de recuperação no formato implicit flow:
  // #access_token=...&refresh_token=...&type=recovery
  if (!body.access_token || typeof body.access_token !== 'string') missing.push('access_token');
  if (!body.refresh_token || typeof body.refresh_token !== 'string') missing.push('refresh_token');
  if (!body.password || typeof body.password !== 'string') missing.push('senha');
  if (missing.length) return Errors.MISSING_FIELDS(res, missing);

  const password = body.password;

  if (password.length < 6) return err(res, 'WEAK_PASSWORD', 'A nova senha deve ter no mínimo 6 caracteres.', 400);

  try {
    const supabase = anonClient();

    // Restaura a sessão a partir dos tokens do link de recuperação
    const { data: sessionData, error: sessionError } = await supabase.auth.setSession({
      access_token: body.access_token.trim(),
      refresh_token: body.refresh_token.trim(),
    });

    if (sessionError || !sessionData.session) {
      return err(res, 'INVALID_TOKEN', 'O link de recuperação é inválido ou já expirou. Solicite um novo.', 400);
    }

    // Atualiza a senha
    const { error: updateError } = await supabase.auth.updateUser({ password });

    if (updateError) {
      if (updateError.message.includes('Password')) {
        return err(res, 'WEAK_PASSWORD', 'Senha fraca. Use pelo menos 6 caracteres com letras e números.', 400);
      }
      return err(res, 'UPDATE_FAILED', updateError.message, 400);
    }

    setCookie(res, sessionData.session);

    return ok(res, { message: 'Senha atualizada com sucesso. Você já está logado.' });
  } catch (e) {
    return Errors.INTERNAL(res, e instanceof Error ? e.message : String(e));
  }
});

router.post('/reset-senha', async (req: Request, res: Response) => {
  const body = req.body;
  if (!body.email || typeof body.email !== 'string') {
    return Errors.MISSING_FIELDS(res, ['email']);
  }

  const email = body.email.trim().toLowerCase();
  if (!email.includes('@')) return err(res, 'INVALID_EMAIL', 'O e-mail informado não é válido.', 400);

  try {
    const supabase = anonClient();
    const origin = req.headers.origin || process.env.CORS_ORIGIN || 'http://localhost:4321';

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${origin}/auth/nova-senha`,
    });

    if (error) {
      if (error.message.includes('Too many requests')) {
        return err(res, 'RATE_LIMITED', 'Muitas tentativas de recuperação. Aguarde alguns minutos e tente novamente.', 429);
      }
      return err(res, 'RESET_ERROR', error.message, 400);
    }

    return ok(res, { message: 'Se este e-mail estiver cadastrado, você receberá as instruções de recuperação em breve.' });
  } catch (e) {
    return Errors.INTERNAL(res, e instanceof Error ? e.message : String(e));
  }
});

export default router;
