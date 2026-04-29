-- 1. Tabela de Planos (O que a plataforma vende)
CREATE TABLE IF NOT EXISTS public.planos (
  id text PRIMARY KEY,
  nome text NOT NULL,
  preco numeric NOT NULL,
  features text[] NOT NULL,
  color text NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Ativa RLS e todos podem ler os planos existentes
ALTER TABLE public.planos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Planos são públicos" ON public.planos FOR SELECT USING (true);

-- Inserir os três planos do Frontend
INSERT INTO public.planos (id, nome, preco, features, color) 
VALUES
('basic', 'Básico', 49.90, ARRAY['Até 30 produtos', 'Até 100 pedidos/mês', 'Suporte básico'], 'text-neutral-400'),
('pro', 'Pro', 99.90, ARRAY['Até 200 produtos', 'Pedidos ilimitados', 'Analytics', 'Promoções', 'Suporte prioritário'], 'text-brand-400'),
('business', 'Business', 199.90, ARRAY['Produtos ilimitados', 'Pedidos ilimitados', 'Sistema de entrega', 'Domínio próprio', 'API access'], 'text-warning')
ON CONFLICT (id) DO NOTHING;


-- 2. Tabela de Assinaturas (Status da inscrição do cliente)
CREATE TABLE IF NOT EXISTS public.assinaturas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  plano_id text REFERENCES public.planos(id) ON DELETE RESTRICT NOT NULL,
  status text NOT NULL DEFAULT 'ativa',
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  expires_at timestamp with time zone
);

ALTER TABLE public.assinaturas ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Usuário vê sua própria assinatura" ON public.assinaturas FOR SELECT USING (auth.uid() = user_id);

-- Para todo usuário criado ter o plano basic por padrão (Gatilho automático - opcional, mas útil)
CREATE OR REPLACE FUNCTION public.inserir_plano_basico_ao_conectar() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.assinaturas (user_id, plano_id, status)
  VALUES (NEW.id, 'basic', 'ativa');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Dispara logo após criar um perfil
DROP TRIGGER IF EXISTS on_profile_created_plan ON public.profiles;
CREATE TRIGGER on_profile_created_plan
  AFTER INSERT ON public.profiles
  FOR EACH ROW EXECUTE PROCEDURE public.inserir_plano_basico_ao_conectar();


-- 3. Tabela de Histórico de Cobranças 
CREATE TABLE IF NOT EXISTS public.historico_cobrancas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  plano_nome text NOT NULL,
  valor numeric NOT NULL,
  status text NOT NULL DEFAULT 'paid',
  data_cobranca timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.historico_cobrancas ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Usuário vê suas próprias cobranças" ON public.historico_cobrancas FOR SELECT USING (auth.uid() = user_id);
