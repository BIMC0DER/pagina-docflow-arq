# DocFlow ARQ — página de captação

Landing page estática da **lista de espera** do DocFlow ARQ: apresenta as
ferramentas do plugin, captura nome + e-mail + WhatsApp e grava no Supabase.

## Stack

HTML + CSS + JS puro. Sem build, sem framework, sem dependências.
Mesmo padrão da `pagina-lives-bimcoder`.

```
pagina-docflow-arq/
├── index.html            ← a página
├── styles.css            ← dark theme (paleta BIM Coder)
├── script.js             ← validação + insert no Supabase + estado de sucesso
├── supabase-setup.sql    ← cria a tabela + RLS (rodar 1x no Supabase)
└── README.md
```

## Setup do Supabase (uma vez)

Abra o **SQL Editor** do projeto Supabase e rode o conteúdo de
[`supabase-setup.sql`](./supabase-setup.sql). Ele cria
`public.app_paginadocflow_lista`:

| campo      | tipo          |
|------------|---------------|
| id         | bigserial PK  |
| nome       | text NOT NULL |
| email      | text NOT NULL |
| telefone   | text NOT NULL |
| origem     | text          |
| utm_source | text NOT NULL |
| created_at | timestamptz   |

A RLS deixa o `anon` apenas **inserir**. É por isso que a chave anon pode
ficar no `script.js`: ela não lê nem apaga nada.

## Publicar

Deploy estático (Vercel, Netlify, Cloudflare Pages): sobe a pasta inteira,
sem passo de build. Depois é só apontar o subdomínio, ex:
`docflow.bimcoder.net`.

## Ver os leads

A [dashboard de leads](../../../..) local já lê essa tabela: no `.env` do
`leads-dashboard`, troque para

```
SUPABASE_TABLE=app_paginadocflow_lista
```

## Rastrear origem

A página lê `?utm_source=` da URL e guarda na sessão, então o valor
sobrevive até o formulário do rodapé. Sem UTM, grava `organico`.

```
https://docflow.bimcoder.net/?utm_source=ig-bio
```

## Fluxo

1. Visitante preenche nome, e-mail e WhatsApp.
2. O JS valida e faz `INSERT` via Supabase REST.
3. Em sucesso, o formulário é substituído pela confirmação na própria página.
4. Em erro, mostra a mensagem e libera o formulário para nova tentativa.

## O que ainda depende de decisão

Estes pontos estão escritos de forma honesta e propositalmente vaga na
página, porque ainda não estão definidos. Quando fecharem, atualizar o FAQ
em `index.html`:

- versões do Revit suportadas;
- preço;
- data de lançamento.
