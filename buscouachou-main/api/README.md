# MaisMelhor — API

API REST em **Node.js + Express + TypeScript** que serve como backend de autenticação e dados de usuário para o projeto MaisMelhor. Integrada ao **Supabase** para auth e banco de dados.

---

## Índice

- [Stack](#stack)
- [Configuração](#configuração)
- [Rodando localmente](#rodando-localmente)
- [Estrutura](#estrutura)
- [Padrão de resposta](#padrão-de-resposta)
- [Rotas — Auth](#rotas--auth-apiauth)
- [Rotas — User](#rotas--user-apiuser)
- [Códigos de erro](#códigos-de-erro)
- [Autenticação via Cookie](#autenticação-via-cookie)
- [Testando](#testando)

---

## Stack

| Pacote | Versão | Função |
|---|---|---|
| `express` | ^5 | Framework HTTP |
| `@supabase/supabase-js` | ^2 | Auth + banco de dados |
| `cookie-parser` | ^1.4 | Leitura de cookies em rotas protegidas |
| `cors` | ^2.8 | Controle de origem cross-site |
| `dotenv` | ^17 | Variáveis de ambiente |
| `ts-node-dev` | ^2 | Hot-reload em desenvolvimento |
| `typescript` | ^6 | Tipagem estática |

---

## Configuração

Crie (ou edite) o arquivo `.env` na raiz de `/api`:

```env
PORT=3001
CORS_ORIGIN=http://localhost:4321

SUPABASE_PROJECT_URL=https://<seu-projeto>.supabase.co
SUPABASE_ANON_KEY=<sua-anon-key>
```

> [!IMPORTANT]
> Nunca commite o `.env` com credenciais reais. Adicione ao `.gitignore`.

---

## Rodando localmente

```bash
# Instalar dependências
npm install

# Modo desenvolvimento (hot-reload)
npm run dev

# Build para produção
npm run build

# Executar build
npm start
```

O servidor sobe em `http://localhost:3001` por padrão.

---

## Estrutura

```
api/
├── src/
│   ├── index.ts          # Entry point: Express, middlewares, registro de rotas
│   ├── _helpers.ts       # Utilitários: respostas JSON, cookie, Supabase clients, requireAuth
│   └── routes/
│       ├── auth.ts       # /api/auth/*
│       └── user.ts       # /api/user/*
├── dist/                 # Build compilado (gerado por `npm run build`)
├── auth-test.html        # Página HTML para testes manuais de auth
├── .env                  # Variáveis de ambiente (não versionar)
├── package.json
└── tsconfig.json
```

---

## Padrão de resposta

Todas as rotas retornam JSON no seguinte formato:

**Sucesso**
```json
{
  "ok": true,
  "data": { ... }
}
```

**Erro**
```json
{
  "ok": false,
  "error": {
    "code": "CODIGO_DO_ERRO",
    "message": "Mensagem legível para o usuário.",
    "details": "Detalhes internos (opcional)"
  }
}
```

---

## Rotas — Auth `/api/auth`

### `POST /api/auth/login`

Autentica um usuário existente. Define o cookie `maismelhor-auth-token` em caso de sucesso.

**Body**
```json
{
  "email": "usuario@email.com",
  "password": "senha123"
}
```

**Resposta 200**
```json
{
  "ok": true,
  "data": {
    "user": { "id": "uuid", "email": "...", "nome": "...", "role": "cliente" },
    "session": { "access_token": "...", "expires_at": 1234567890 }
  }
}
```

**Erros possíveis**

| Código | HTTP | Descrição |
|---|---|---|
| `MISSING_FIELDS` | 400 | `email` ou `senha` ausentes |
| `INVALID_EMAIL` | 400 | E-mail sem `@` |
| `INVALID_PASSWORD` | 400 | Senha com menos de 6 caracteres |
| `WRONG_CREDENTIALS` | 401 | E-mail ou senha incorretos |
| `EMAIL_NOT_CONFIRMED` | 403 | E-mail ainda não confirmado |
| `RATE_LIMITED` | 429 | Muitas tentativas |

---

### `POST /api/auth/registro`

Cria uma nova conta. Define o cookie de sessão quando não há confirmação de e-mail pendente.

**Body**
```json
{
  "nome": "João",
  "sobrenome": "Silva",       // opcional
  "email": "novo@email.com",
  "password": "senha123",
  "role": "cliente"           // "cliente" | "lojista" (default: "cliente")
}
```

**Resposta 201**
```json
{
  "ok": true,
  "data": {
    "user": { "id": "uuid", "email": "..." },
    "requiresEmailConfirmation": false
  }
}
```

**Erros possíveis**

| Código | HTTP | Descrição |
|---|---|---|
| `MISSING_FIELDS` | 400 | Campos obrigatórios ausentes |
| `INVALID_EMAIL` | 400 | E-mail inválido |
| `WEAK_PASSWORD` | 400 | Senha fraca (< 6 chars) |
| `INVALID_NAME` | 400 | Nome com menos de 2 chars |
| `EMAIL_TAKEN` | 409 | E-mail já cadastrado |

---

### `GET /api/auth/session`

Verifica se a sessão atual (via cookie) é válida.

**Resposta 200 — autenticado**
```json
{
  "ok": true,
  "data": {
    "authenticated": true,
    "session": { "access_token": "...", "expires_at": 1234567890 },
    "user": { "id": "uuid", "email": "...", "nome": "...", "role": "lojista" }
  }
}
```

**Resposta 200 — não autenticado**
```json
{
  "ok": true,
  "data": { "authenticated": false, "session": null, "user": null }
}
```

---

### `POST /api/auth/logout`

Encerra a sessão no Supabase e limpa o cookie `maismelhor-auth-token`.

**Resposta 200**
```json
{
  "ok": true,
  "data": { "message": "Logout realizado com sucesso." }
}
```

---

### `POST /api/auth/reset-senha`

Envia um e-mail com link de recuperação de senha.

**Body**
```json
{ "email": "usuario@email.com" }
```

**Resposta 200**
```json
{
  "ok": true,
  "data": { "message": "Se este e-mail estiver cadastrado, você receberá as instruções em breve." }
}
```

**Erros possíveis**

| Código | HTTP | Descrição |
|---|---|---|
| `MISSING_FIELDS` | 400 | `email` ausente |
| `INVALID_EMAIL` | 400 | E-mail inválido |
| `RATE_LIMITED` | 429 | Muitas tentativas |

---

## Rotas — User `/api/user`

> [!NOTE]
> Todas as rotas marcadas com 🔒 exigem cookie de sessão válido (`maismelhor-auth-token`).

---

### 🔒 `GET /api/user/perfil`

Retorna o perfil do usuário autenticado.

**Resposta 200**
```json
{
  "ok": true,
  "data": {
    "perfil": {
      "id": "uuid",
      "nome": "João",
      "sobrenome": "Silva",
      "telefone": null,
      "avatar_url": null,
      "role": "cliente",
      "created_at": "2024-01-01T00:00:00Z"
    },
    "email": "joao@email.com"
  }
}
```

---

### 🔒 `PUT /api/user/perfil`

Atualiza campos do perfil e/ou credenciais do usuário autenticado. Envie apenas os campos que deseja alterar.

**Campos de perfil** (tabela `profiles`): `nome`, `sobrenome`, `telefone`, `avatar_url`

**Campos de credencial** (Supabase Auth): `email`, `password`

**Body (exemplo)**
```json
{
  "nome": "João Carlos",
  "email": "novo@email.com",
  "password": "nova-senha-123"
}
```

**Resposta 200**
```json
{
  "ok": true,
  "data": { "message": "Perfil atualizado com sucesso." }
}
```

**Erros possíveis**

| Código | HTTP | Descrição |
|---|---|---|
| `EMPTY_UPDATE` | 400 | Nenhum campo enviado |
| `INVALID_NAME` | 400 | Nome com menos de 2 chars |
| `INVALID_EMAIL` | 400 | E-mail inválido |
| `WEAK_PASSWORD` | 400 | Senha com menos de 6 chars |
| `EMAIL_UPDATE_FAILED` | 400 | Falha ao atualizar e-mail no Supabase |
| `PASSWORD_UPDATE_FAILED` | 400 | Falha ao atualizar senha no Supabase |

---

### `GET /api/user/planos`

Lista todos os planos disponíveis, ordenados por preço crescente. **Público** (sem autenticação).

**Resposta 200**
```json
{
  "ok": true,
  "data": { "planos": [ { "id": 1, "nome": "...", "preco": 29.9 } ] }
}
```

---

### 🔒 `GET /api/user/assinatura`

Retorna a assinatura ativa do usuário autenticado, com dados do plano incluídos.

**Resposta 200**
```json
{
  "ok": true,
  "data": {
    "assinatura": {
      "id": "uuid",
      "user_id": "uuid",
      "status": "ativa",
      "planos": { "id": 1, "nome": "Pro", "preco": 49.9 }
    }
  }
}
```

---

### 🔒 `GET /api/user/historico`

Retorna o histórico de cobranças do usuário, do mais recente para o mais antigo.

**Resposta 200**
```json
{
  "ok": true,
  "data": {
    "historico": [
      { "id": "uuid", "user_id": "uuid", "valor": 49.9, "data_cobranca": "2024-06-01T00:00:00Z" }
    ]
  }
}
```

---

## Códigos de erro

| Código | HTTP | Situação |
|---|---|---|
| `UNAUTHENTICATED` | 401 | Cookie ausente ou rota protegida acessada sem login |
| `INVALID_SESSION` | 401 | Sessão expirada ou inválida |
| `MISSING_FIELDS` | 400 | Campos obrigatórios ausentes no body |
| `NOT_FOUND` | 404 | Recurso não encontrado |
| `SUPABASE_ERROR` | 422 | Erro retornado pelo Supabase |
| `INTERNAL_ERROR` | 500 | Erro inesperado no servidor |

---

## Autenticação via Cookie

A sessão é mantida através do cookie **`maismelhor-auth-token`**, que armazena um JSON com `access_token` e `refresh_token` do Supabase.

```
Configuração do cookie:
  Path:     /
  SameSite: Lax
  HttpOnly: false
  Secure:   false (dev) / true (prod)
  MaxAge:   tempo até expiração da sessão Supabase
```

> [!WARNING]
> Em produção, configure `secure: true` e `sameSite: 'strict'` no helper `setCookie` em `src/_helpers.ts`.

Todas as chamadas do frontend devem incluir `credentials: 'include'` (fetch) ou equivalente para que o cookie seja enviado:

```js
fetch('http://localhost:3001/api/user/perfil', {
  credentials: 'include'
})
```

---

## Testando

Abra **`auth-test.html`** diretamente no navegador para testar todas as rotas de autenticação com uma interface visual. O arquivo já está no diretório `/api`.
