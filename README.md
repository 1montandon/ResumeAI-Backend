# Resume AI - Backend

Um projeto de backend para análise inteligente de currículos utilizando IA, desenvolvido como projeto de prática e treinamento pessoal.

## � Tecnologias Utilizadas

- **Node.js** com TypeScript
- **Express.js** - Framework web
- **Prisma ORM** - Gerenciamento de banco de dados
- **PostgreSQL** - Banco de dados
- **Google Gemini AI** - IA para análise de currículos
- **JWT** - Autenticação
- **Multer** - Upload de arquivos
- **Docker** - Containerização
- **Biome** - Linting e formatação de código

## 🏗️ Arquitetura e Padrões

- **MVC Pattern** - Controllers, Services e Routes separados
- **Service Layer** - Lógica de negócio isolada
- **Middleware Pattern** - Autenticação e tratamento de erros
- **Repository Pattern** - Acesso a dados através do Prisma ORM

## 📁 Estrutura do Projeto

```
src/
├── config/          # Configurações (Gemini AI)
├── controllers/     # Controladores da aplicação
├── middlewares/     # Middlewares (auth, error-handler)
├── prisma/         # Cliente Prisma
├── routes/         # Definição das rotas
├── services/       # Lógica de negócio
├── types/          # Definições de tipos TypeScript
└── utils/          # Utilitários
```

## ⚙️ Configuração e Setup

### Pré-requisitos

- Node.js 22+
- Docker e Docker Compose
- PostgreSQL

### 1. Clone o repositório

```bash
git clone https://github.com/1montandon/ResumeIA-Backend.git
cd ResumeIA-Backend
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
DATABASE_URL="postgresql://docker:docker@localhost:5432/docker"
JWT_SECRET="seu_jwt_secret_aqui"
GOOGLE_GENERATIVE_AI_API_KEY="sua_api_key_do_gemini"
PORT=3000
```

### 4. Inicie o banco de dados

```bash
docker-compose up -d
```

### 5. Execute as migrações do banco

```bash
npx prisma migrate dev
```

### 6. Inicie o servidor de desenvolvimento

```bash
npm run dev
```

## 🚀 Scripts Disponíveis

- `npm run dev` - Inicia o servidor em modo desenvolvimento
- `npm run build` - Gera o build de produção
- `npm start` - Inicia o servidor de produção
- `npx prisma studio` - Abre o Prisma Studio para visualizar dados

## 📡 Endpoints Principais

- `GET /health` - Health check da aplicação
- `POST /api/auth/register` - Registro de usuário
- `POST /api/auth/login` - Login de usuário
- `POST /api/analysis` - Análise de currículo (autenticado)
- `GET /api/analysis` - Lista análises do usuário
- `GET /api/user/me` - Informações do usuário logado

## 🤖 Funcionalidades

- **Análise de Currículos**: Upload de arquivos PDF/DOC e análise com IA
- **Pontuação e Feedback**: Sistema de scoring e sugestões de melhoria
- **Gestão de Usuários**: Registro, login e perfil de usuário
- **Histórico de Análises**: Armazenamento e consulta de análises anteriores

## � Desenvolvimento

O projeto utiliza:

- **TypeScript** com suporte experimental do Node.js
- **Biome** para linting e formatação
- **Watch mode** para desenvolvimento com hot reload
- **Prisma** para ORM type-safe

---

_Projeto desenvolvido para fins de estudo e prática pessoal._
