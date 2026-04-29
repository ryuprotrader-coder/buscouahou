-- ============================================================
-- MAIS MELHOR — Autenticação & Row Level Security (RLS)
-- Execute APÓS 001_schema.sql
-- ============================================================

-- ============================================================
-- TRIGGER: criar profile automaticamente ao registrar
-- ============================================================

create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, nome, sobrenome, avatar_url, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'nome', split_part(new.email, '@', 1)),
    new.raw_user_meta_data->>'sobrenome',
    new.raw_user_meta_data->>'avatar_url',
    coalesce((new.raw_user_meta_data->>'role')::user_role, 'cliente')
  );
  return new;
end;
$$ language plpgsql security definer;

-- Registrar o trigger no schema auth (evento de novo usuário)
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================================
-- HABILITAR RLS EM TODAS AS TABELAS
-- ============================================================

alter table public.profiles           enable row level security;
alter table public.categorias         enable row level security;
alter table public.lojas              enable row level security;
alter table public.categorias_produto enable row level security;
alter table public.produtos           enable row level security;
alter table public.promocoes          enable row level security;
alter table public.enderecos_cliente  enable row level security;
alter table public.pedidos            enable row level security;
alter table public.itens_pedido       enable row level security;

-- ============================================================
-- FUNÇÃO HELPER: verificar role do usuário logado
-- ============================================================

create or replace function public.get_my_role()
returns user_role as $$
  select role from public.profiles where id = auth.uid();
$$ language sql stable security definer;

-- ============================================================
-- RLS: profiles
-- ============================================================

-- Usuário acessa apenas o próprio perfil
create policy "profiles: leitura própria"
  on public.profiles for select
  using (id = auth.uid());

-- Admin vê todos
create policy "profiles: admin vê todos"
  on public.profiles for select
  using (public.get_my_role() = 'admin');

-- Usuário edita apenas o próprio perfil
create policy "profiles: edição própria"
  on public.profiles for update
  using (id = auth.uid())
  with check (id = auth.uid());

-- Trigger cria o perfil (service_role no insert, não precisa de policy de insert para usuario)

-- ============================================================
-- RLS: categorias (públicas para leitura)
-- ============================================================

create policy "categorias: leitura pública"
  on public.categorias for select
  using (ativo = true);

create policy "categorias: admin gerencia"
  on public.categorias for all
  using (public.get_my_role() = 'admin');

-- ============================================================
-- RLS: lojas
-- ============================================================

-- Clientes e visitantes leem lojas ativas
create policy "lojas: leitura pública (ativas)"
  on public.lojas for select
  using (status = 'ativa');

-- Lojista lê a própria loja (mesmo inativa/pendente)
create policy "lojas: lojista lê a própria"
  on public.lojas for select
  using (owner_id = auth.uid());

-- Lojista edita a própria loja
create policy "lojas: lojista edita a própria"
  on public.lojas for update
  using (owner_id = auth.uid())
  with check (owner_id = auth.uid());

-- Lojista cria loja (ficará pendente até admin aprovar)
create policy "lojas: lojista cria"
  on public.lojas for insert
  with check (
    owner_id = auth.uid()
    and public.get_my_role() in ('lojista', 'admin')
    and status = 'pendente'
  );

-- Admin gerencia todas
create policy "lojas: admin gerencia todas"
  on public.lojas for all
  using (public.get_my_role() = 'admin');

-- ============================================================
-- RLS: categorias_produto
-- ============================================================

create policy "cat_produto: leitura pública"
  on public.categorias_produto for select
  using (
    exists (
      select 1 from public.lojas l
      where l.id = loja_id and l.status = 'ativa'
    )
  );

create policy "cat_produto: lojista gerencia"
  on public.categorias_produto for all
  using (
    exists (
      select 1 from public.lojas l
      where l.id = loja_id and l.owner_id = auth.uid()
    )
  );

-- ============================================================
-- RLS: produtos
-- ============================================================

-- Todos leem produtos de lojas ativas
create policy "produtos: leitura pública"
  on public.produtos for select
  using (
    disponivel = true
    and exists (
      select 1 from public.lojas l
      where l.id = loja_id and l.status = 'ativa'
    )
  );

-- Lojista gerencia seus produtos
create policy "produtos: lojista gerencia"
  on public.produtos for all
  using (
    exists (
      select 1 from public.lojas l
      where l.id = loja_id and l.owner_id = auth.uid()
    )
  );

-- Admin gerencia todos
create policy "produtos: admin gerencia"
  on public.produtos for all
  using (public.get_my_role() = 'admin');

-- ============================================================
-- RLS: promocoes
-- ============================================================

create policy "promocoes: leitura pública"
  on public.promocoes for select
  using (
    ativo = true
    and (valido_ate is null or valido_ate > now())
  );

create policy "promocoes: lojista gerencia"
  on public.promocoes for all
  using (
    exists (
      select 1 from public.lojas l
      where l.id = loja_id and l.owner_id = auth.uid()
    )
  );

create policy "promocoes: admin gerencia"
  on public.promocoes for all
  using (public.get_my_role() = 'admin');

-- ============================================================
-- RLS: enderecos_cliente
-- ============================================================

create policy "enderecos: cliente gerencia os próprios"
  on public.enderecos_cliente for all
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

create policy "enderecos: admin gerencia todos"
  on public.enderecos_cliente for all
  using (public.get_my_role() = 'admin');

-- ============================================================
-- RLS: pedidos
-- ============================================================

-- Cliente vê os próprios pedidos
create policy "pedidos: cliente vê os próprios"
  on public.pedidos for select
  using (user_id = auth.uid());

-- Cliente cria pedido
create policy "pedidos: cliente cria"
  on public.pedidos for insert
  with check (user_id = auth.uid());

-- Cliente pode avaliar/comentar (update restrito)
create policy "pedidos: cliente avalia"
  on public.pedidos for update
  using (user_id = auth.uid() and status = 'entregue')
  with check (user_id = auth.uid());

-- Lojista vê pedidos da sua loja
create policy "pedidos: lojista vê da sua loja"
  on public.pedidos for select
  using (
    exists (
      select 1 from public.lojas l
      where l.id = loja_id and l.owner_id = auth.uid()
    )
  );

-- Lojista atualiza status do pedido
create policy "pedidos: lojista atualiza status"
  on public.pedidos for update
  using (
    exists (
      select 1 from public.lojas l
      where l.id = loja_id and l.owner_id = auth.uid()
    )
  );

-- Admin vê todos
create policy "pedidos: admin gerencia todos"
  on public.pedidos for all
  using (public.get_my_role() = 'admin');

-- ============================================================
-- RLS: itens_pedido
-- ============================================================

create policy "itens: cliente vê os próprios"
  on public.itens_pedido for select
  using (
    exists (
      select 1 from public.pedidos p
      where p.id = pedido_id and p.user_id = auth.uid()
    )
  );

create policy "itens: cliente insere em pedido próprio"
  on public.itens_pedido for insert
  with check (
    exists (
      select 1 from public.pedidos p
      where p.id = pedido_id and p.user_id = auth.uid()
    )
  );

create policy "itens: lojista vê itens da sua loja"
  on public.itens_pedido for select
  using (
    exists (
      select 1 from public.pedidos p
      join public.lojas l on l.id = p.loja_id
      where p.id = pedido_id and l.owner_id = auth.uid()
    )
  );

create policy "itens: admin gerencia todos"
  on public.itens_pedido for all
  using (public.get_my_role() = 'admin');
