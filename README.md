

---

# JWTeste - API de Autenticação e Autorização 🔐

Uma API robusta de autenticação e autorização desenvolvida com **Node.js**, **Express** e **TypeScript**, utilizando **JWT** para autenticação, **bcrypt** para segurança de senhas, **Prisma ORM** com **PostgreSQL** para persistência de dados e **Docker** para conteinerização. Inclui **controle de acesso baseado em papéis (RBAC)**.

---

## 📋 Sumário

* [Visão Geral](#visão-geral)
* [Funcionalidades](#funcionalidades)
* [Tecnologias Utilizadas](#tecnologias-utilizadas)
* [Pré-requisitos](#pré-requisitos)
* [Instalação e Execução](#instalação-e-execução)
* [Estrutura do Projeto](#estrutura-do-projeto)
* [Endpoints da API](#endpoints-da-api)
* [Autenticação e Autorização](#autenticação-e-autorização)
* [Como Contribuir](#como-contribuir)
* [Licença](#licença)
* [Contato](#contato)

---

## 🌐 Visão Geral

Este projeto backend foi desenvolvido para fornecer um **sistema de autenticação e autorização seguro e escalável**.

### Principais características:

* **JWT**: Gerenciamento stateless de sessões de usuários.
* **bcrypt**: Hash seguro de senhas.
* **Prisma ORM + PostgreSQL**: Persistência de dados de forma tipada e eficiente.
* **RBAC (Role-Based Access Control)**: Controle granular de acesso por papéis.
* **TypeScript**: Garantia de tipagem forte.
* **Docker**: Ambiente consistente e fácil de implantar.

---

## ✨ Funcionalidades

* Registro de usuários.
* Login com geração de JWT.
* Controle de acesso por papel (USER, ADMIN).
* Middlewares customizados:

  * Extração de token.
  * Autenticação de token.
  * Autorização por papel.
* Logout simples (Stateless).
* Persistência com Prisma + PostgreSQL.
* Conteinerização via Docker.

---

## 🛠️ Tecnologias Utilizadas

* Node.js
* Express.js
* TypeScript
* JWT (jsonwebtoken)
* bcrypt.js
* Prisma ORM
* PostgreSQL
* Docker
* ts-node-dev (hot-reloading)
* Insomnia / Postman (testes de API)

---

## ✅ Pré-requisitos

* **Node.js**: v18.x, v20.x ou v24.x
* **npm**: v9.x ou superior
* **PostgreSQL**: Local ou via Docker
* **Docker Desktop**: Opcional, para conteinerização
* (Opcional) **Insomnia** ou **Postman** para testar requisições

---

## 🚀 Instalação e Execução

### 1. Clonar o Repositório

```bash
git clone https://github.com/GabrielF0900/JWTTESTE.git
cd JWTTESTE/Backend
```

### 2. Instalar Dependências

```bash
npm install
# ou
yarn install
```

### 3. Configurar Ambiente

Crie um arquivo `.env` na raiz do Backend:

```dotenv
DATABASE_URL="postgresql://USUARIO:SENHA@HOST:PORTA/NOMEDOBANCO?schema=public"
JWT_SECRET="sua_chave_secreta_muito_segura_e_longa_para_jwt_aqui"
PORT=3000
```

### 4. Configurar Banco de Dados

* Verifique o arquivo `prisma/schema.prisma`.
* Rode as migrações:

```bash
npx prisma migrate dev --name init_database
```

* Gere o cliente Prisma:

```bash
npx prisma generate
```

* (Opcional) Use o Prisma Studio:

```bash
npx prisma studio
```

### 5. Iniciar o Servidor

#### Em modo desenvolvimento:

```bash
npm run dev
```

#### Via Docker:

```bash
docker build -t jwtteste-backend .
docker run -p 3000:3000 jwtteste-backend
```

#### Via Docker Compose (se configurado):

```bash
docker-compose up --build
```

---

## 📂 Estrutura do Projeto

```
JWTTESTE/
├── Backend/
│   ├── node_modules/
│   ├── prisma/
│   │   └── prismaClient/
│   │       └── prismaClient.ts
│   ├── src/
│   │   ├── minhaAPI/
│   │   │   ├── config/
│   │   │   ├── controllers/
│   │   │   ├── middlewares/
│   │   │   ├── registro/
│   │   │   ├── routers/
│   │   │   └── types/
│   │   ├── app.ts
│   │   └── server.ts
│   ├── .dockerignore
│   ├── .env
│   ├── .env.example
│   ├── .gitignore
│   ├── Dockerfile
│   ├── package.json
│   ├── package-lock.json
│   └── tsconfig.json
```

---

## 🎯 Endpoints da API

**Base URL:** `http://localhost:3000/api`

### 🛡️ Autenticação

| Método | Endpoint  | Descrição                          |
| ------ | --------- | ---------------------------------- |
| POST   | /login    | Login e geração de JWT             |
| POST   | /register | Registro de novo usuário           |
| POST   | /logout   | Logout (client-side token discard) |

### 🔒 Rotas Protegidas

| Método | Endpoint                      | Requisitos de Acesso            |
| ------ | ----------------------------- | ------------------------------- |
| GET    | /rota-protegida               | Qualquer usuário autenticado    |
| GET    | /rota-protegida-admin-somente | Apenas usuários com role: ADMIN |

---

## 🔒 Autenticação e Autorização

**Fluxo de segurança:**

1. **Login:** Usuário envia credenciais. Backend retorna JWT.
2. **Extração de Token:** Middleware captura o token no cabeçalho.
3. **Validação de Token:** Middleware verifica e decodifica o JWT.
4. **Controle de Acesso:** Middleware `authorized` verifica o papel do usuário antes de liberar o acesso.

---

## 🤝 Como Contribuir

1. Faça um fork.
2. Crie uma branch (`git checkout -b feature/nova-feature`).
3. Faça suas alterações.
4. Commit com mensagens claras (`git commit -m 'feat: adiciona nova funcionalidade'`).
5. Push para seu fork (`git push origin feature/nova-feature`).
6. Abra um Pull Request.

---

## 📄 Licença

Este projeto está licenciado sob a **MIT License**.

---

## 📧 Contato

* **Nome:** Gabriel Falcão
* **E-mail:** [Gabrielcfonline0900@gmail.com](mailto:Gabrielcfonline0900@gmail.com)
* **GitHub:** [https://github.com/GabrielF0900](https://github.com/GabrielF0900)
* **LinkedIn:** [https://www.linkedin.com/in/gabrielfalcaodev/](https://www.linkedin.com/in/gabrielfalcaodev/)

---


