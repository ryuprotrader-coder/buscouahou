-- ============================================================
-- MAIS MELHOR — Schema Principal
-- Execute este arquivo no SQL Editor do Supabase
-- ============================================================

-- Habilitar extensão para UUID
create extension if not exists "uuid-ossp";

-- Habilitar PostGIS para geolocalização (disponível no Supabase)
create extension if not exists "postgis";

-- ============================================================
-- ENUM TYPES
-- ============================================================

create type user_role as enum ('cliente', 'lojista', 'admin');
create type loja_status as enum ('ativa', 'inativa', 'pendente');
create type pedido_status as enum ('pendente', 'confirmado', 'em_preparo', 'em_entrega', 'entregue', 'cancelado');
create type promocao_tipo as enum ('percentual', 'valor_fixo', 'frete_gratis');

-- ============================================================
-- TABELA: profiles
-- Estende auth.users do Supabase
-- ============================================================

create table public.profiles (
  id          uuid references auth.users(id) on delete cascade primary key,
  nome        text not null,
  sobrenome   text,
  telefone    text,
  avatar_url  text,
  role        user_role not null default 'cliente',
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

comment on table public.profiles is 'Perfis de usuários vinculados ao auth.users do Supabase';

-- ============================================================
-- TABELA: categorias
-- Categorias de lojas
-- ============================================================

create table public.categorias (
  id          serial primary key,
  nome        text not null unique,
  icone       text,            -- nome do ícone (lucide-react)
  cor         text,            -- cor hex para UI
  ativo       boolean not null default true,
  created_at  timestamptz not null default now()
);

comment on table public.categorias is 'Categorias de lojas (Restaurante, Farmácia, Mercado, etc.)';

-- ============================================================
-- TABELA: lojas
-- ============================================================

create table public.lojas (
  id              uuid primary key default uuid_generate_v4(),
  owner_id        uuid references public.profiles(id) on delete set null,
  categoria_id    integer references public.categorias(id) on delete set null,
  slug            text not null unique,
  nome            text not null,
  descricao       text,
  imagem_url      text,
  capa_url        text,
  telefone        text,
  email           text,
  endereco        text,
  cidade          text,
  estado          text,
  cep             text,
  -- Geolocalização (longitude, latitude)
  longitude       double precision,
  latitude        double precision,
  localizacao     geometry(Point, 4326),  -- PostGIS point
  horario         jsonb,                   -- { "seg_sex": "08h-22h", "sab": "08h-20h", ... }
  taxa_entrega    numeric(10, 2) default 0,
  tempo_entrega   text,                    -- ex: "30-45 min"
  avaliacao       numeric(3, 2) default 0,
  total_avaliacoes integer default 0,
  status          loja_status not null default 'pendente',
  destaque        boolean not null default false,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

comment on table public.lojas is 'Lojas cadastradas na plataforma Mais Melhor';

-- Índice para busca geoespacial por proximidade
create index lojas_localizacao_idx on public.lojas using gist(localizacao);
create index lojas_slug_idx on public.lojas(slug);
create index lojas_status_idx on public.lojas(status);

-- ============================================================
-- TABELA: categorias_produto
-- Categorias de produtos dentro de uma loja
-- ============================================================

create table public.categorias_produto (
  id          serial primary key,
  loja_id     uuid references public.lojas(id) on delete cascade,
  nome        text not null,
  ordem       integer not null default 0,
  created_at  timestamptz not null default now()
);

-- ============================================================
-- TABELA: produtos
-- ============================================================

create table public.produtos (
  id                    uuid primary key default uuid_generate_v4(),
  loja_id               uuid references public.lojas(id) on delete cascade not null,
  categoria_produto_id  integer references public.categorias_produto(id) on delete set null,
  nome                  text not null,
  descricao             text,
  preco                 numeric(10, 2) not null,
  imagem_url            text,
  disponivel            boolean not null default true,
  destaque              boolean not null default false,
  ordem                 integer not null default 0,
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now()
);

comment on table public.produtos is 'Produtos oferecidos pelas lojas';

create index produtos_loja_idx on public.produtos(loja_id);
create index produtos_disponivel_idx on public.produtos(disponivel);

-- ============================================================
-- TABELA: promocoes
-- ============================================================

create table public.promocoes (
  id              uuid primary key default uuid_generate_v4(),
  loja_id         uuid references public.lojas(id) on delete cascade not null,
  produto_id      uuid references public.produtos(id) on delete cascade,
  titulo          text not null,
  descricao       text,
  tipo            promocao_tipo not null,
  valor           numeric(10, 2),  -- % ou R$ dependendo do tipo
  codigo          text unique,     -- cupom opcional
  valido_desde    timestamptz not null default now(),
  valido_ate      timestamptz,
  ativo           boolean not null default true,
  created_at      timestamptz not null default now()
);

comment on table public.promocoes is 'Promoções e ofertas das lojas';

create index promocoes_loja_idx on public.promocoes(loja_id);
create index promocoes_ativo_idx on public.promocoes(ativo);

-- ============================================================
-- TABELA: enderecos_cliente
-- ============================================================

create table public.enderecos_cliente (
  id          uuid primary key default uuid_generate_v4(),
  user_id     uuid references public.profiles(id) on delete cascade not null,
  apelido     text not null default 'Casa',   -- "Casa", "Trabalho", etc.
  logradouro  text not null,
  numero      text,
  complemento text,
  bairro      text,
  cidade      text not null,
  estado      text not null,
  cep         text,
  longitude   double precision,
  latitude    double precision,
  principal   boolean not null default false,
  created_at  timestamptz not null default now()
);

create index enderecos_user_idx on public.enderecos_cliente(user_id);

-- ============================================================
-- TABELA: pedidos
-- ============================================================

create table public.pedidos (
  id                  uuid primary key default uuid_generate_v4(),
  user_id             uuid references public.profiles(id) on delete set null not null,
  loja_id             uuid references public.lojas(id) on delete set null not null,
  endereco_id         uuid references public.enderecos_cliente(id) on delete set null,
  status              pedido_status not null default 'pendente',
  subtotal            numeric(10, 2) not null,
  taxa_entrega        numeric(10, 2) not null default 0,
  desconto            numeric(10, 2) not null default 0,
  total               numeric(10, 2) not null,
  codigo_promocao     text,
  observacoes         text,
  estimativa_entrega  text,
  avaliacao           integer check (avaliacao between 1 and 5),
  comentario          text,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

comment on table public.pedidos is 'Pedidos realizados pelos clientes';

create index pedidos_user_idx on public.pedidos(user_id);
create index pedidos_loja_idx on public.pedidos(loja_id);
create index pedidos_status_idx on public.pedidos(status);

-- ============================================================
-- TABELA: itens_pedido
-- ============================================================

create table public.itens_pedido (
  id              uuid primary key default uuid_generate_v4(),
  pedido_id       uuid references public.pedidos(id) on delete cascade not null,
  produto_id      uuid references public.produtos(id) on delete set null,
  nome_produto    text not null,   -- snapshot do nome ao momento do pedido
  preco_unitario  numeric(10, 2) not null,
  quantidade      integer not null check (quantidade > 0),
  subtotal        numeric(10, 2) generated always as (preco_unitario * quantidade) stored,
  observacoes     text
);

create index itens_pedido_idx on public.itens_pedido(pedido_id);

-- ============================================================
-- FUNÇÃO: atualizar updated_at automaticamente
-- ============================================================

create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_updated_at_profiles
  before update on public.profiles
  for each row execute function public.handle_updated_at();

create trigger set_updated_at_lojas
  before update on public.lojas
  for each row execute function public.handle_updated_at();

create trigger set_updated_at_produtos
  before update on public.produtos
  for each row execute function public.handle_updated_at();

create trigger set_updated_at_pedidos
  before update on public.pedidos
  for each row execute function public.handle_updated_at();

-- ============================================================
-- FUNÇÃO: sincronizar localizacao (geometry) com lon/lat
-- ============================================================

create or replace function public.sync_loja_localizacao()
returns trigger as $$
begin
  if new.longitude is not null and new.latitude is not null then
    new.localizacao = st_setsrid(st_makepoint(new.longitude, new.latitude), 4326);
  end if;
  return new;
end;
$$ language plpgsql;

create trigger sync_localizacao_lojas
  before insert or update of longitude, latitude on public.lojas
  for each row execute function public.sync_loja_localizacao();

-- ============================================================
-- FUNÇÃO: buscar lojas próximas (RPC)
-- Parâmetros: lon, lat, raio em metros
-- ============================================================

create or replace function public.lojas_proximas(
  lon double precision,
  lat double precision,
  raio_metros integer default 5000
)
returns table (
  id              uuid,
  slug            text,
  nome            text,
  descricao       text,
  imagem_url      text,
  capa_url        text,
  categoria       text,
  avaliacao       numeric,
  total_avaliacoes integer,
  taxa_entrega    numeric,
  tempo_entrega   text,
  destaque        boolean,
  distancia_m     double precision
) as $$
begin
  return query
  select
    l.id,
    l.slug,
    l.nome,
    l.descricao,
    l.imagem_url,
    l.capa_url,
    c.nome as categoria,
    l.avaliacao,
    l.total_avaliacoes,
    l.taxa_entrega,
    l.tempo_entrega,
    l.destaque,
    st_distance(
      l.localizacao::geography,
      st_setsrid(st_makepoint(lon, lat), 4326)::geography
    ) as distancia_m
  from public.lojas l
  left join public.categorias c on c.id = l.categoria_id
  where
    l.status = 'ativa'
    and l.localizacao is not null
    and st_dwithin(
      l.localizacao::geography,
      st_setsrid(st_makepoint(lon, lat), 4326)::geography,
      raio_metros
    )
  order by distancia_m asc;
end;
$$ language plpgsql stable;
