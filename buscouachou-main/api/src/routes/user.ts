import { Router, Request, Response } from 'express';
import { ok, err, Errors, requireAuth, anonClient } from '../_helpers';

const router = Router();

router.get('/perfil', async (req: Request, res: Response) => {
  try {
    const auth = await requireAuth(req);
    if (!auth) return Errors.UNAUTHENTICATED(res);

    const { data, error } = await auth.supabase
      .from('profiles')
      .select('*')
      .eq('id', auth.userId)
      .maybeSingle();

    if (error) {
      console.error('[user/perfil GET]', error);
      return Errors.SUPABASE(res, error.message);
    }

    const perfil = data ?? {
      id: auth.userId,
      nome: auth.userMeta?.nome ?? '',
      sobrenome: auth.userMeta?.sobrenome ?? null,
      telefone: null,
      avatar_url: auth.userMeta?.avatar_url ?? null,
      role: auth.userMeta?.role ?? 'cliente',
      created_at: null,
    };

    return ok(res, { perfil, email: auth.userEmail });
  } catch (e) {
    console.error('[user/perfil GET] unhandled:', e);
    return Errors.INTERNAL(res, e instanceof Error ? e.message : String(e));
  }
});

router.put('/perfil', async (req: Request, res: Response) => {
  try {
    const auth = await requireAuth(req);
    if (!auth) return Errors.UNAUTHENTICATED(res);

    const body = req.body;
    const hasProfileField = ['nome', 'sobrenome', 'telefone', 'avatar_url'].some((k) => k in body);
    const hasCredField = ['email', 'password'].some((k) => k in body);

    if (!hasProfileField && !hasCredField) {
      return err(res, 'EMPTY_UPDATE', 'Nenhum campo para atualizar foi informado.', 400);
    }

    if ('nome' in body && (typeof body.nome !== 'string' || body.nome.trim().length < 2)) {
      return err(res, 'INVALID_NAME', 'O nome deve ter pelo menos 2 caracteres.', 400);
    }
    if ('email' in body) {
      if (!String(body.email).includes('@')) return err(res, 'INVALID_EMAIL', 'O e-mail informado não é válido.', 400);
    }
    if ('password' in body && typeof body.password === 'string' && body.password.length < 6) {
      return err(res, 'WEAK_PASSWORD', 'A nova senha deve ter no mínimo 6 caracteres.', 400);
    }

    if (hasProfileField) {
      const profileFields: Record<string, unknown> = { id: auth.userId };
      if ('nome' in body) profileFields.nome = String(body.nome).trim();
      if ('sobrenome' in body) profileFields.sobrenome = body.sobrenome ?? null;
      if ('telefone' in body) profileFields.telefone = body.telefone ?? null;
      if ('avatar_url' in body) profileFields.avatar_url = body.avatar_url ?? null;

      const { error } = await auth.supabase.from('profiles').upsert(profileFields as any);
      if (error) {
        console.error('[user/perfil PUT] profile upsert:', error);
        return Errors.SUPABASE(res, error.message);
      }
    }

    if (hasCredField) {
      const credUpdates: { email?: string; password?: string } = {};
      if (body.email) credUpdates.email = String(body.email).trim().toLowerCase();
      if (body.password) credUpdates.password = String(body.password);

      const { error } = await auth.supabase.auth.updateUser(credUpdates);
      if (error) {
        console.error('[user/perfil PUT] auth update:', error);
        if (error.message.includes('Email')) {
          return err(res, 'EMAIL_UPDATE_FAILED', 'Não foi possível atualizar o e-mail. Verifique se é válido e tente novamente.', 400);
        }
        if (error.message.includes('Password')) {
          return err(res, 'PASSWORD_UPDATE_FAILED', 'Não foi possível atualizar a senha. Use pelo menos 6 caracteres.', 400);
        }
        return Errors.SUPABASE(res, error.message);
      }
    }

    return ok(res, { message: 'Perfil atualizado com sucesso.' });
  } catch (e) {
    console.error('[user/perfil PUT] unhandled:', e);
    return Errors.INTERNAL(res, e instanceof Error ? e.message : String(e));
  }
});

router.get('/planos', async (req: Request, res: Response) => {
  try {
    const supabase = anonClient();
    const { data, error } = await supabase
      .from('planos')
      .select('*')
      .order('preco', { ascending: true });

    if (error) return Errors.SUPABASE(res, error.message);
    return ok(res, { planos: data ?? [] });
  } catch (e) {
    return Errors.INTERNAL(res, e instanceof Error ? e.message : String(e));
  }
});

router.get('/assinatura', async (req: Request, res: Response) => {
  try {
    const auth = await requireAuth(req);
    if (!auth) return Errors.UNAUTHENTICATED(res);

    const { data, error } = await auth.supabase
      .from('assinaturas')
      .select('*, planos(*)')
      .eq('user_id', auth.userId)
      .maybeSingle();

    if (error) return Errors.SUPABASE(res, error.message);
    return ok(res, { assinatura: data ?? null });
  } catch (e) {
    return Errors.INTERNAL(res, e instanceof Error ? e.message : String(e));
  }
});

router.get('/historico', async (req: Request, res: Response) => {
  try {
    const auth = await requireAuth(req);
    if (!auth) return Errors.UNAUTHENTICATED(res);

    const { data, error } = await auth.supabase
      .from('historico_cobrancas')
      .select('*')
      .eq('user_id', auth.userId)
      .order('data_cobranca', { ascending: false });

    if (error) return Errors.SUPABASE(res, error.message);
    return ok(res, { historico: data ?? [] });
  } catch (e) {
    return Errors.INTERNAL(res, e instanceof Error ? e.message : String(e));
  }
});

export default router;
