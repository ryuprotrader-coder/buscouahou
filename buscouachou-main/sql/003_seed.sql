-- ============================================================
-- MAIS MELHOR — Seed de Dados Iniciais
-- Execute APÓS 001_schema.sql e 002_auth_rls.sql
-- ============================================================

-- ============================================================
-- CATEGORIAS
-- ============================================================

insert into public.categorias (nome, icone, cor) values
  ('Restaurante',          'UtensilsCrossed', '#FF6B35'),
  ('Farmácia',             'Pill',            '#4CAF50'),
  ('Mercado & Hortifruti', 'ShoppingCart',    '#2196F3'),
  ('Café & Confeitaria',   'Coffee',          '#8D6E63'),
  ('Padaria',              'Croissant',       '#FFC107'),
  ('Pet Shop',             'PawPrint',        '#9C27B0'),
  ('Eletrônicos',          'Cpu',             '#607D8B'),
  ('Moda & Acessórios',    'ShoppingBag',     '#E91E63'),
  ('Saúde & Bem-estar',    'Heart',           '#00BCD4'),
  ('Serviços',             'Wrench',          '#FF9800')
on conflict (nome) do nothing;

-- ============================================================
-- LOJAS DE EXEMPLO
-- (Espelho dos dados de src/lib/stores.ts)
-- Nota: owner_id nulo — serão atribuídos ao admin depois
-- ============================================================

insert into public.lojas (
  slug, nome, descricao,
  imagem_url, capa_url,
  categoria_id,
  telefone, endereco,
  longitude, latitude,
  horario,
  taxa_entrega, tempo_entrega,
  avaliacao, total_avaliacoes,
  status, destaque
)
select
  'pizzaria-bella-massa',
  'Pizzaria Bella Massa',
  'A melhor pizza artesanal da região, feita com ingredientes frescos e massa fina crocante. Promoções exclusivas toda semana!',
  'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
  c.id,
  '(47) 99999-1234',
  'Rua das Flores, 123 — Centro',
  -48.7663, -24.2245,
  '{"seg_sex": "18h–23h", "sab_dom": "12h–00h"}'::jsonb,
  0, '30-45 min',
  4.8, 342,
  'ativa', true
from public.categorias c where c.nome = 'Restaurante';

insert into public.lojas (
  slug, nome, descricao,
  imagem_url, capa_url,
  categoria_id,
  telefone, endereco,
  longitude, latitude,
  horario,
  taxa_entrega, tempo_entrega,
  avaliacao, total_avaliacoes,
  status, destaque
)
select
  'farmacia-vida-saude',
  'Farmácia Vida & Saúde',
  'Farmácia completa com atendimento farmacêutico especializado, medicamentos de referência e genéricos, perfumaria e muito mais.',
  'https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&w=800&q=80',
  c.id,
  '(47) 99999-5678',
  'Av. Principal, 456 — Bairro Novo',
  -48.7629, -24.2205,
  '{"seg_sab": "07h–22h", "dom": "08h–20h"}'::jsonb,
  4.90, '15-25 min',
  4.9, 218,
  'ativa', false
from public.categorias c where c.nome = 'Farmácia';

insert into public.lojas (
  slug, nome, descricao,
  imagem_url, capa_url,
  categoria_id,
  telefone, endereco,
  longitude, latitude,
  horario,
  taxa_entrega, tempo_entrega,
  avaliacao, total_avaliacoes,
  status, destaque
)
select
  'mercado-central',
  'Mercado Central',
  'O mercado mais completo da cidade! Frutas, verduras e legumes frescos diretamente do produtor. Carnes selecionadas e produtos importados.',
  'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80',
  c.id,
  '(47) 99999-9012',
  'Rua do Comércio, 789 — Mercado',
  -48.7610, -24.2215,
  '{"seg_sab": "06h–20h", "dom": "06h–14h"}'::jsonb,
  0, 'Hoje',
  4.7, 503,
  'ativa', true
from public.categorias c where c.nome = 'Mercado & Hortifruti';

insert into public.lojas (
  slug, nome, descricao,
  imagem_url, capa_url,
  categoria_id,
  telefone, endereco,
  longitude, latitude,
  horario,
  taxa_entrega, tempo_entrega,
  avaliacao, total_avaliacoes,
  status, destaque
)
select
  'cafeteria-aroma',
  'Cafeteria Aroma',
  'Café especial da fazenda para sua xícara. Grãos selecionados, torrefação artesanal e bolos caseiros feitos com amor todos os dias.',
  'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80',
  c.id,
  '(47) 99999-3456',
  'Praça Central, 10 — Centro Histórico',
  -48.7645, -24.2260,
  '{"seg_sex": "07h–19h", "sab_dom": "08h–18h"}'::jsonb,
  2.90, '10-20 min',
  4.6, 89,
  'ativa', false
from public.categorias c where c.nome = 'Café & Confeitaria';

-- ============================================================
-- PRODUTOS DAS LOJAS
-- ============================================================

-- Produtos: Pizzaria Bella Massa
insert into public.produtos (loja_id, nome, preco, imagem_url, disponivel, destaque)
select l.id, 'Pizza Margherita',        39.90, 'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?auto=format&fit=crop&w=300&q=80', true, true  from public.lojas l where l.slug = 'pizzaria-bella-massa'
union all
select l.id, 'Pizza Quatro Queijos',    49.90, 'https://images.unsplash.com/photo-1548369937-47519962c11a?auto=format&fit=crop&w=300&q=80', true, false from public.lojas l where l.slug = 'pizzaria-bella-massa'
union all
select l.id, 'Pizza Frango c/ Catupiry',44.90, 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=300&q=80', true, false from public.lojas l where l.slug = 'pizzaria-bella-massa'
union all
select l.id, 'Refrigerante 2L',          9.90, 'https://images.unsplash.com/photo-1527960471264-932f39eb5846?auto=format&fit=crop&w=300&q=80', true, false from public.lojas l where l.slug = 'pizzaria-bella-massa';

-- Produtos: Farmácia Vida & Saúde
insert into public.produtos (loja_id, nome, preco, imagem_url, disponivel, destaque)
select l.id, 'Vitamina C 1g (60 cáps)',  24.90, 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=300&q=80', true, true  from public.lojas l where l.slug = 'farmacia-vida-saude'
union all
select l.id, 'Protetor Solar FPS 70',    38.90, 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=300&q=80', true, false from public.lojas l where l.slug = 'farmacia-vida-saude'
union all
select l.id, 'Álcool Gel Antisséptico',  12.90, 'https://images.unsplash.com/photo-1584483766114-2cea6facdf57?auto=format&fit=crop&w=300&q=80', true, false from public.lojas l where l.slug = 'farmacia-vida-saude'
union all
select l.id, 'Dipirona 500mg (20 comp)',  6.90, 'https://images.unsplash.com/photo-1550572017-edd951b55104?auto=format&fit=crop&w=300&q=80', true, false from public.lojas l where l.slug = 'farmacia-vida-saude';

-- Produtos: Mercado Central
insert into public.produtos (loja_id, nome, preco, imagem_url, disponivel, destaque)
select l.id, 'Cesta de Frutas (5kg)',    29.90, 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=300&q=80', true, true  from public.lojas l where l.slug = 'mercado-central'
union all
select l.id, 'Peito de Frango (kg)',     14.90, 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=300&q=80', true, false from public.lojas l where l.slug = 'mercado-central'
union all
select l.id, 'Pão Francês (6 un)',        5.90, 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=300&q=80', true, false from public.lojas l where l.slug = 'mercado-central'
union all
select l.id, 'Leite Integral (1L)',       4.50, 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=300&q=80', true, false from public.lojas l where l.slug = 'mercado-central';

-- Produtos: Cafeteria Aroma
insert into public.produtos (loja_id, nome, preco, imagem_url, disponivel, destaque)
select l.id, 'Café Especial 200ml',       9.90, 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=300&q=80', true, true  from public.lojas l where l.slug = 'cafeteria-aroma'
union all
select l.id, 'Cappuccino Italiano',      12.90, 'https://images.unsplash.com/photo-1572286258217-40f579f7ad83?auto=format&fit=crop&w=300&q=80', true, false from public.lojas l where l.slug = 'cafeteria-aroma'
union all
select l.id, 'Bolo de Cenoura (fatia)',  11.90, 'https://images.unsplash.com/photo-1542826438-bd32f43d626f?auto=format&fit=crop&w=300&q=80', true, false from public.lojas l where l.slug = 'cafeteria-aroma'
union all
select l.id, 'Croissant de Manteiga',     8.90, 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=300&q=80', true, false from public.lojas l where l.slug = 'cafeteria-aroma';

-- ============================================================
-- PROMOÇÕES DE EXEMPLO
-- ============================================================

insert into public.promocoes (loja_id, titulo, descricao, tipo, valor, ativo)
select l.id, '50% OFF nas Pizzas', 'Metade do preço em toda linha de pizzas tradicionais!', 'percentual', 50, true
from public.lojas l where l.slug = 'pizzaria-bella-massa';

insert into public.promocoes (loja_id, titulo, descricao, tipo, valor, ativo)
select l.id, 'Frete Grátis', 'Entrega grátis para pedidos acima de R$ 50,00', 'frete_gratis', null, true
from public.lojas l where l.slug = 'mercado-central';
