JWTeste - API de Autenticação e Autorização 🔐
Breve Descrição: Uma API Node.js robusta e fortemente tipada com Express e TypeScript, utilizando JWT para autenticação, bcrypt para segurança de senhas, Prisma ORM com PostgreSQL para gestão de dados e Docker para conteinerização, focando em controle de acesso baseado em papéis (RBAC).

Sumário 📋
Visão Geral
Funcionalidades
Tecnologias Utilizadas
Pré-requisitos
Instalação e Execução
Estrutura do Projeto
Endpoints da API
Autenticação e Autorização
Como Contribuir
Licença
Contato
Visão Geral 🌐
Este projeto backend foi desenvolvido para fornecer um sistema de autenticação e autorização seguro e escalável. Ele utiliza JSON Web Tokens (JWT) para gerenciar sessões de usuários de forma stateless, implementa bcrypt para o hash seguro de senhas e adota o Prisma ORM para uma interação eficiente e tipada com um banco de dados PostgreSQL. O controle de acesso é baseado em papéis (RBAC - Role-Based Access Control), permitindo a proteção granular de rotas. Todo o desenvolvimento é feito em TypeScript, garantindo código fortemente tipado, e a aplicação pode ser conteinerizada com Docker para fácil implantação e consistência ambiental.

Funcionalidades ✨
As principais características e módulos implementados neste projeto são:

Autenticação de Usuários: Permite o registro de novos usuários e o login seguro com credenciais (email e password).
Geração de JWT: Emissão de JSON Web Tokens de acesso para usuários autenticados, contendo informações de identificação e papel.
Controle de Acesso Baseado em Papéis (RBAC): Proteção de rotas da API com base nos papéis (USER, ADMIN) atribuídos aos usuários, garantindo que apenas usuários autorizados acessem recursos específicos.
Segurança de Senhas: Utilização de bcrypt para armazenar senhas de forma segura, inviabilizando a recuperação em texto simples.
Middlewares Customizados:
Extração de Token: Middleware para extrair o JWT do cabeçalho Authorization da requisição.
Autenticação de Token: Middleware para verificar a validade e a integridade do JWT, decodificando-o e anexando as informações do usuário (id, email, role) ao objeto req.user.
Autorização por Papel: Middleware para verificar se o usuário autenticado possui o papel necessário para acessar um recurso específico.
Logout Simples: Implementação de logout que foca na remoção do token no lado do cliente, seguindo o padrão stateless do JWT.
Persistência de Dados: Utilização do Prisma ORM para uma interação elegante e tipada com o banco de dados PostgreSQL.
Conteinerização: Configuração Docker para facilitar a execução e o gerenciamento do ambiente da aplicação (e do PostgreSQL, se usado com Docker Compose).
Tecnologias Utilizadas 🛠️
Este projeto foi construído utilizando as seguintes tecnologias:

Node.js
Express.js
TypeScript
Docker
JWT (jsonwebtoken)
Bcrypt.js
Prisma ORM
PostgreSQL: Sistema de gerenciamento de banco de dados relacional.
ts-node-dev: Para desenvolvimento com hot-reloading.
Insomnia / Postman: Para testar os endpoints da API.
Pré-requisitos ✅
Para iniciar o projeto para testes, você precisará ter os seguintes softwares instalados e suas versões compatíveis com as do package.json:

Node.js: ^18.0.0 ou superior (compatível com package.json: ^20.0.0 ou ^24.0.3 conforme @types/node). Recomenda-se usar a versão 20.x ou 24.x para melhor compatibilidade.
npm: ^9.0.0 ou superior (geralmente vem com Node.js).
PostgreSQL: Instância do banco de dados instalada e rodando (ou configurada para ser iniciada via Docker/Docker Compose).
Docker Desktop: Para rodar o ambiente conteinerizado (se for usar o Dockerfile).
(Opcional, mas útil) Insomnia ou Postman para testar as requisições HTTP da API.
Instalação e Execução 🚀
Siga os passos abaixo para configurar e rodar o projeto em seu ambiente local.

Clone o repositório:

Bash

git clone https://github.com/SEU_USUARIO/JWTTESTE.git
cd JWTTESTE/Backend # Navegue até a pasta raiz do backend do projeto
Instale as dependências:

Bash

npm install # ou yarn install
Configuração do Ambiente:

Crie um arquivo .env na raiz do diretório Backend (onde está o package.json) com as seguintes variáveis:
Fragmento do código

DATABASE_URL="postgresql://USUARIO:SENHA@HOST:PORTA/NOMEDOBANCO?schema=public" # Ex: "postgresql://user:password@localhost:5432/mydb?schema=public"
JWT_SECRET="sua_chave_secreta_muito_segura_e_longa_para_jwt_aqui"
PORT=3000 # Porta em que o servidor será executado
JWT_SECRET: Esta chave deve ser a mesma usada para assinar e verificar seus JWTs. Escolha uma string longa e complexa para fins de segurança.
DATABASE_URL: Configure a string de conexão para o seu banco de dados PostgreSQL.
Configuração e Migração do Banco de Dados:

Abra o arquivo prisma/schema.prisma para verificar a configuração do seu datasource (provedor postgresql e url).
Execute as migrações do Prisma para criar as tabelas no seu banco de dados:
Bash

npx prisma migrate dev --name init_database # 'init_database' é um nome de exemplo para sua primeira migração
Importante: Se você já tinha o esquema e só adicionou o campo role, este comando criará uma migração para essa alteração.
Gere o cliente Prisma: Sempre execute este comando após qualquer alteração no schema.prisma ou migração para atualizar os tipos TypeScript.
Bash

npx prisma generate
Para popular o banco com dados de teste (ex: um usuário admin), você pode usar o Prisma Studio: npx prisma studio.
Iniciar o Servidor:

Para desenvolvimento com hot-reloading:

Bash

npm run dev
Se for rodar via Docker (construir a imagem e iniciar o contêiner):

Bash

docker build -t jwtteste-backend .
docker run -p 3000:3000 jwtteste-backend
Nota: Se você usa Docker Compose para gerenciar o DB e o backend, o comando seria docker-compose up --build.
O servidor deve iniciar na porta especificada no seu .env (padrão: 3000).

Estrutura do Projeto 📂
A estrutura do projeto está organizada da seguinte forma:

JWTTESTE/
├── Backend/
│   ├── node_modules/         # Dependências do Node.js
│   ├── prisma/               # Configurações do Prisma ORM e schema.prisma
│   │   └── prismaClient/     # Instância do cliente Prisma
│   │       └── prismaClient.ts
│   ├── src/
│   │   ├── minhaAPI/
│   │   │   ├── config/          # Arquivos de configuração (ex: JWT)
│   │   │   │   └── config.ts
│   │   │   ├── controllers/     # Lógica de negócio principal (login, logout)
│   │   │   │   ├── login/
│   │   │   │   │   └── login.ts
│   │   │   │   └── logout/
│   │   │   │       └── logout.ts
│   │   │   ├── middlewares/     # Funções de middleware para o Express
│   │   │   │   ├── authenticated.ts # Verifica e decodifica o JWT
│   │   │   │   ├── authorized.ts    # Verifica o papel do usuário
│   │   │   │   └── extracaoToken.ts # Extrai o token do cabeçalho
│   │   │   ├── registro/        # Lógica de registro de usuários
│   │   │   │   └── registro.ts
│   │   │   ├── routers/         # Definição das rotas da API
│   │   │   │   └── routers.ts
│   │   │   └── types/           # Definições de tipos customizados
│   │   │       └── customRequest.ts # Extensão da interface Request do Express
│   │   ├── app.ts               # Configuração da aplicação Express
│   │   └── server.ts            # Ponto de entrada para iniciar o servidor
│   ├── .dockerignore           # Arquivos/pastas a serem ignorados pelo Docker
│   ├── .env                    # Variáveis de ambiente (ex: credenciais do DB, JWT Secret)
│   ├── .env.example            # Exemplo de arquivo .env
│   ├── .gitignore              # Arquivos/pastas a serem ignorados pelo Git
│   ├── Dockerfile              # Definição do contêiner Docker
│   ├── package.json            # Metadados do projeto e dependências
│   ├── package-lock.json       # Bloqueio de versão das dependências
│   └── tsconfig.json           # Configurações do compilador TypeScript
Endpoints da API 🎯
Todos os endpoints assumem um prefixo base como http://localhost:3000/api (ajuste conforme a configuração do seu app.ts e .env).

Autenticação
POST /api/login

Descrição: Autentica um usuário e retorna um JSON Web Token (JWT).
Corpo da Requisição (JSON):
JSON

{
  "email": "usuario@example.com",
  "password": "suaSenha"
}
Resposta de Sucesso (200 OK):
JSON

{
  "message": "Login bem-sucedido!",
  "token": "eyJhbGciOiJIUzI1Ni...",
  "user": {
    "id": "uuid-do-usuario",
    "email": "usuario@example.com",
    "role": "USER" # ou "ADMIN"
  }
}
Resposta de Erro (400 Bad Request): { "error": "Credenciais inválidas." }
POST /api/register

Descrição: Registra um novo usuário no sistema. Por padrão, o role atribuído a novos usuários é 'USER'.
Corpo da Requisição (JSON):
JSON

{
  "email": "novo.usuario@example.com",
  "password": "umaSenhaForte!",
  "name": "Nome do Novo Usuário"
}
Resposta de Sucesso (201 Created): { "message": "Usuário registrado com sucesso!" }
Resposta de Erro (400 Bad Request): { "error": "Erro ao registrar usuário." } (ou mais específico, ex: "Email já em uso.")
POST /api/logout

Descrição: Notifica o servidor sobre a intenção de logout. No backend, apenas registra o evento (opcionalmente) e retorna sucesso, enquanto o token é descartado no lado do cliente.
Headers: (Opcional, se a rota de logout for protegida para fins de log) Authorization: Bearer <JWT_TOKEN>
Resposta de Sucesso (200 OK): { "message": "Logout bem-sucedido." }
Rotas Protegidas
As rotas protegidas requerem um JWT válido no cabeçalho Authorization: Bearer <seu_token>.

GET /api/rota-protegida

Descrição: Rota de exemplo que exige apenas autenticação (qualquer usuário com um JWT válido pode acessá-la, independentemente do papel).
Headers: Authorization: Bearer <JWT_TOKEN>
Resposta de Sucesso (200 OK):
JSON

{
  "message": "Acesso permitido à rota protegida (apenas autenticação)!",
  "user": { "id": "...", "email": "...", "role": "..." },
  "token": "..."
}
Resposta de Erro (401 Unauthorized): { "error": "Token não fornecido/inválido/expirado." }
Resposta de Erro (403 Forbidden): { "error": "Token de autenticação inválido." } (se o token for malformado ou não verificado)
GET /api/rota-protegida-admin-somente

Descrição: Rota de exemplo que exige autenticação E o papel de ADMIN. Usuários com role: "USER" serão negados.
Headers: Authorization: Bearer <JWT_TOKEN> (de um usuário com role: "ADMIN")
Resposta de Sucesso (200 OK):
JSON

{
  "message": "Acesso permitido! Bem-vindo, [email do admin]! Você é um ADMIN e acessou a área de ADMIN.",
  "user": { "id": "...", "email": "...", "role": "ADMIN" },
  "token": "..."
}
Resposta de Erro (401 Unauthorized): { "error": "Token não fornecido/inválido/expirado." }
Resposta de Erro (403 Forbidden): { "error": "Acesso negado: Você não tem permissão para realizar esta ação." } (para usuários com role: "USER" ou outros papéis não ADMIN)
Autenticação e Autorização 🔒
Este projeto implementa um fluxo de segurança detalhado:

Autenticação (Login): Usuários fazem login, e suas senhas são verificadas contra hashes armazenados (bcrypt.js). Em caso de sucesso, um JWT é gerado e assinado com uma chave secreta (JWT_SECRET), contendo o id, email e role do usuário no payload.
Extração de Token (extracaoToken middleware): Para rotas protegidas, este middleware é o primeiro na cadeia. Ele extrai o JWT do cabeçalho Authorization (formato Bearer <token>) e o anexa a req.token.
Autenticação de Token (authenticated middleware): Após a extração, este middleware verifica a validade e a integridade do JWT usando a mesma JWT_SECRET. Se válido, ele decodifica o token e anexa as informações do usuário (incluindo o role) ao objeto req.user.
Autorização (authorized middleware): Este é o último middleware de segurança. Ele recebe uma lista de papéis permitidos para a rota específica. Ele verifica se o role do req.user (preenchido por authenticated) está incluído nesta lista. Se não estiver, o acesso é negado (status 403 Forbidden).
Como Contribuir 🤝
Contribuições são bem-vindas! Se você quiser melhorar este projeto, siga os passos:

Faça um fork do repositório.
Crie uma nova branch para sua feature ou correção de bug (git checkout -b feature/minha-nova-feature).
Faça suas alterações e adicione commits claros e descritivos (git commit -m 'feat: adiciona funcionalidade X').
Envie suas alterações para o seu fork (git push origin feature/minha-nova-feature).
Abra um Pull Request para a branch main (ou master) deste repositório.
Licença 📄
Este projeto está sob a licença MIT License.

Contato 📧
Seu Nome - seu.email@example.com
Seu GitHub - https://github.com/seu-usuario
Seu LinkedIn (Opcional) - https://linkedin.com/in/seu-perfil
