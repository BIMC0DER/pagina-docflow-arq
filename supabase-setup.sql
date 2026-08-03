-- =============================================================
-- Setup da tabela da lista de espera — DocFlow ARQ
-- Rode este script no SQL Editor do Supabase (uma vez só)
--
-- Mesmo projeto Supabase da pagina-lives-bimcoder, tabela separada.
-- As colunas seguem o padrão do leads-dashboard: para ver os leads
-- na dashboard, basta apontar SUPABASE_TABLE para esta tabela.
-- =============================================================

create table if not exists public.app_paginadocflow_lista (
  id           bigserial primary key,
  nome         text        not null,
  email        text        not null,
  telefone     text        not null,
  origem       text        default 'pagina-docflow-arq',
  utm_source   text        not null default 'organico',
  created_at   timestamptz not null default now()
);

-- Índices para dedup, busca e leitura por período
create index if not exists app_paginadocflow_lista_email_idx
  on public.app_paginadocflow_lista (email);

create index if not exists app_paginadocflow_lista_created_at_idx
  on public.app_paginadocflow_lista (created_at desc);

create index if not exists app_paginadocflow_lista_utm_source_idx
  on public.app_paginadocflow_lista (utm_source);

-- RLS: anon só pode INSERIR (sem SELECT/UPDATE/DELETE).
-- É o que torna seguro deixar a chave anon dentro do script.js.
alter table public.app_paginadocflow_lista enable row level security;

drop policy if exists "anon_pode_inserir" on public.app_paginadocflow_lista;
create policy "anon_pode_inserir"
  on public.app_paginadocflow_lista
  for insert
  to anon
  with check (true);

drop policy if exists "authenticated_pode_ler" on public.app_paginadocflow_lista;
create policy "authenticated_pode_ler"
  on public.app_paginadocflow_lista
  for select
  to authenticated
  using (true);
