import { createClient } from '@supabase/supabase-js';

/**
 * Client Supabase — instância para uso no browser (client-side).
 * Lazy: só cria o client quando chamado pela primeira vez.
 */
let _supabase: ReturnType<typeof createClient> | null = null;

export function getSupabaseClient() {
  if (!_supabase) {
    const url = import.meta.env.PUBLIC_SUPABASE_URL as string;
    const key = import.meta.env.PUBLIC_SUPABASE_ANON_KEY as string;
    _supabase = createClient(url, key, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
        storageKey: 'maismelhor-auth',
      },
    });
  }
  return _supabase;
}

/**
 * Alias para compatibilidade — prefer getSupabaseClient() para lazy init.
 */
export const supabase = new Proxy({} as ReturnType<typeof createClient>, {
  get(_target, prop) {
    return (getSupabaseClient() as any)[prop];
  },
});


export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          nome: string;
          sobrenome: string | null;
          telefone: string | null;
          avatar_url: string | null;
          role: 'cliente' | 'lojista' | 'admin';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          nome: string;
          sobrenome?: string | null;
          telefone?: string | null;
          avatar_url?: string | null;
          role?: 'cliente' | 'lojista' | 'admin';
        };
        Update: {
          nome?: string;
          sobrenome?: string | null;
          telefone?: string | null;
          avatar_url?: string | null;
          role?: 'cliente' | 'lojista' | 'admin';
        };
      };
      lojas: {
        Row: {
          id: string;
          slug: string;
          nome: string;
          descricao: string | null;
          imagem_url: string | null;
          capa_url: string | null;
          categoria_id: number | null;
          telefone: string | null;
          endereco: string | null;
          longitude: number | null;
          latitude: number | null;
          taxa_entrega: number;
          tempo_entrega: string | null;
          avaliacao: number;
          total_avaliacoes: number;
          status: 'ativa' | 'inativa' | 'pendente';
          destaque: boolean;
          created_at: string;
          updated_at: string;
        };
      };
      produtos: {
        Row: {
          id: string;
          loja_id: string;
          nome: string;
          descricao: string | null;
          preco: number;
          imagem_url: string | null;
          disponivel: boolean;
          destaque: boolean;
          created_at: string;
        };
      };
      pedidos: {
        Row: {
          id: string;
          user_id: string;
          loja_id: string;
          status: 'pendente' | 'confirmado' | 'em_preparo' | 'em_entrega' | 'entregue' | 'cancelado';
          subtotal: number;
          taxa_entrega: number;
          desconto: number;
          total: number;
          created_at: string;
        };
      };
      planos: {
        Row: {
          id: string;
          nome: string;
          preco: number;
          features: string[];
          color: string;
          created_at: string;
        };
      };
      assinaturas: {
        Row: {
          id: string;
          user_id: string;
          plano_id: string;
          status: string;
          created_at: string;
          expires_at: string | null;
        };
      };
      historico_cobrancas: {
        Row: {
          id: string;
          user_id: string;
          plano_nome: string;
          valor: number;
          status: string;
          data_cobranca: string;
        };
      };
    };
  };
};
