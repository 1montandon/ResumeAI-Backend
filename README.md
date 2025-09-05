🧠 ResumeAI - Backend

## 📝 Descrição

O **ResumeAI Backend** é a API REST que alimenta a aplicação ResumeAI, fornecendo serviços de análise de currículos utilizando Inteligência Artificial. Construído com Node.js, TypeScript e Express, o backend gerencia autenticação de usuários, upload de arquivos, integração com IA (Google Gemini) e persistência de dados com PostgreSQL e Prisma ORM.

## 🚀 Tecnologias Utilizadas

### **Principais**

- **Node.js** - Runtime JavaScript para servidor
- **TypeScript** - Superset JavaScript com tipagem estática
- **Express.js** - Framework web minimalista e flexível
- **Prisma ORM** - ORM moderno para TypeScript e Node.js
- **PostgreSQL** - Banco de dados relacional robusto

### **Inteligência Artificial**

- **Google Gemini AI** - Modelo de IA para análise de currículos
- **AI SDK** - Kit de desenvolvimento para integração com IAs

### **Autenticação & Segurança**

- **JSON Web Token (JWT)** - Autenticação baseada em tokens
- **bcrypt** - Hash seguro de senhas
- **CORS** - Controle de acesso entre origens

### **Upload & Arquivos**

- **Multer** - Middleware para upload de arquivos
- **File System** - Gerenciamento de arquivos do servidor

### **Qualidade de Código**

- **Biome** - Linter e formatador de código ultrarrápido

### **Desenvolvimento**

- **Docker** - Containerização da aplicação
- **ts-node-dev** - Desenvolvimento com hot reload
- **tsup** - Build tool para TypeScript

## 📁 Estrutura do Projeto

```
src/
├── config/           # Configurações (IA, banco, etc.)
│   └── geminiai.ts   # Configuração do Google Gemini
├── controllers/      # Controladores das rotas
│   ├── analysis.ts   # Controller de análises
│   ├── auth.ts       # Controller de autenticação
│   └── user.ts       # Controller de usuários
├── error/            # Tratamento de erros
│   └── error.ts      # Classes de erro personalizadas
├── middlewares/      # Middlewares da aplicação
│   ├── auth.ts       # Middleware de autenticação
│   └── error-handler.ts # Middleware de tratamento de erros
├── prisma/           # Cliente Prisma
│   └── client.ts     # Instância do cliente Prisma
├── routes/           # Definição das rotas
│   ├── analysis.ts   # Rotas de análise
│   ├── auth.ts       # Rotas de autenticação
│   ├── index.ts      # Agregador de rotas
│   └── user.ts       # Rotas de usuário
├── services/         # Lógica de negócio
│   ├── analysis/     # Serviços de análise
│   ├── auth/         # Serviços de autenticação
│   └── user/         # Serviços de usuário
├── types/            # Definições TypeScript
│   ├── analysis.ts   # Tipos de análise
│   └── user.ts       # Tipos de usuário
├── utils/            # Utilitários
│   └── generateToken.ts # Geração de tokens JWT
└── server.ts         # Ponto de entrada da aplicação

prisma/
├── schema.prisma     # Esquema do banco de dados
└── migrations/       # Histórico de migrações
```

## ⚙️ Pré-requisitos

Certifique-se de ter instalado em sua máquina:

- **Node.js** (versão 22+ recomendada)
- **npm** ou **yarn** (gerenciador de pacotes)
- **PostgreSQL** (versão 14+ recomendada)
- **Docker** (opcional, para containerização)
- **Git** (para clonagem do repositório)

## 🛠️ Configuração e Setup

### **1. Clone o repositório**

```bash
git clone <url-do-repositorio>
cd ResumeIA-Backend
```

### **2. Instale as dependências**

```bash
npm install
# ou
yarn install
```

### **3. Configure as variáveis de ambiente**

Crie um arquivo `.env` na raiz do projeto:

```env
# Database
DATABASE_URL="postgresql://usuario:senha@localhost:5432/resumeai?schema=public"

# JWT
JWT_SECRET="seu-jwt-secret-super-secreto"

# Google Gemini AI
GOOGLE_GENERATIVE_AI_API_KEY="sua-chave-da-api-gemini"

# Server
PORT=3000
NODE_ENV=development
```

### **4. Configure o banco de dados**

#### **Opção 1: Docker (Recomendado)**

```bash
# Execute o PostgreSQL via Docker
docker-compose up -d
```

#### **Opção 2: PostgreSQL Local**

```bash
# Certifique-se que o PostgreSQL está rodando
# e ajuste a DATABASE_URL no .env
```

### **5. Execute as migrações do banco**

```bash
npx prisma migrate dev
```

### **6. Inicie o servidor de desenvolvimento**

```bash
npm run dev
# ou
yarn dev
```

### **7. Acesse a API**

A API estará disponível em: `http://localhost:3000`

## 🔧 Scripts Disponíveis

| Comando                    | Descrição                                       |
| -------------------------- | ------------------------------------------------- |
| `npm run dev`            | Inicia servidor de desenvolvimento com hot reload |
| `npm run build`          | Gera build de produção                          |
| `npm run start`          | Inicia servidor de produção                     |
| `npx prisma studio`      | Interface visual do banco de dados                |
| `npx prisma migrate dev` | Cria e aplica novas migrações                   |
| `npx prisma generate`    | Gera cliente Prisma                               |

## 🛣️ Principais Endpoints

### **🔐 Autenticação**

| Método  | Endpoint      | Descrição          | Auth |
| -------- | ------------- | -------------------- | ---- |
| `POST` | `/register` | Cadastro de usuário | ❌   |
| `POST` | `/login`    | Login de usuário    | ❌   |

**Exemplo - Cadastro:**

```json
POST /register
Content-Type: application/json

{
  "email": "usuario@email.com",
  "username": "usuario123",
  "password": "senha123"
}
```

**Resposta:**

```json
{
  "user": {
    "id": "uuid",
    "email": "usuario@email.com",
    "username": "usuario123"
  },
  "token": "jwt-token"
}
```

### **👤 Usuários**

| Método | Endpoint         | Descrição                 | Auth |
| ------- | ---------------- | --------------------------- | ---- |
| `GET` | `/user/me`     | Dados do usuário logado    | ✅   |
| `PUT` | `/user/update` | Atualizar dados do usuário | ✅   |

### **📊 Análises**

| Método    | Endpoint             | Descrição                     | Auth |
| ---------- | -------------------- | ------------------------------- | ---- |
| `POST`   | `/analysis/upload` | Upload e análise de currículo | ✅   |
| `GET`    | `/analysis`        | Listar análises do usuário    | ✅   |
| `GET`    | `/analysis/:id`    | Obter análise específica      | ✅   |
| `DELETE` | `/analysis/:id`    | Deletar análise                | ✅   |

**Exemplo - Upload de Currículo:**

```bash
POST /analysis/upload
Authorization: Bearer jwt-token
Content-Type: multipart/form-data

resume: arquivo.pdf
jobDescription: "Desenvolvedor Full Stack com experiência em React e Node.js..."
```

**Resposta:**

```json
{
  "id": "uuid",
  "score": 8.5,
  "strengths": "Experiência sólida em JavaScript...",
  "weaknesses": "Falta experiência em testes automatizados...",
  "overview": "Perfil promissor para a vaga...",
  "resumeUrl": "/uploads/arquivo-hash",
  "createdAt": "2025-01-01T00:00:00Z"
}
```

## 🗄️ Modelo de Dados

### **User**

```typescript
{
  id: string          // UUID
  email: string       // Email único
  username: string    // Username único
  password: string    // Hash da senha
  analyses: Analysis[] // Relação com análises
  createdAt: DateTime // Data de criação
}
```

### **Analysis**

```typescript
{
  id: string           // UUID
  jobDescription: string // Descrição da vaga
  score: number        // Pontuação (0-10)
  strengths: string    // Pontos fortes
  weaknesses: string   // Pontos fracos
  overview: string     // Visão geral
  resumeUrl: string    // URL do arquivo
  userId: string       // ID do usuário
  createdAt: DateTime  // Data de criação
}
```

## 🤖 Integração com IA

O sistema utiliza o **Google Gemini AI** para análise de currículos:

1. **Upload**: Usuário envia currículo (PDF/DOC)
2. **Processamento**: Arquivo é salvo e texto extraído
3. **Análise**: IA analisa currículo vs descrição da vaga
4. **Resultado**: Retorna pontuação, pontos fortes/fracos e overview

## 🐳 Docker

### **Executar com Docker Compose**

```bash
# Inicia todos os serviços (PostgreSQL + API)
docker-compose up -d

# Logs da aplicação
docker-compose logs -f app

# Parar serviços
docker-compose down
```

### **Build da imagem**

```bash
# Build da imagem Docker
docker build -t resumeai-backend .

# Executar container
docker run -p 3000:3000 --env-file .env resumeai-backend
```

## 🎯 Roadmap

### **Versão 1.1**

- [X] Parar de salvar os Resumes localmente
- [X] Melhorar Prompt
- [ ] Melhorar organizacao, separa mais em utils e tirar um pouco dos service
- [ ] Padronizar os retornos de dados da api, ex: apenas arrays (mesmo para um elemento)
- [ ] Validação de dados com Zod
- [ ] Autenticação com a biblioteca Better-Auth
- [ ] Testes Automatizados
- [ ] Documentação da API (Swagger)
- [ ] Rate limiting para APIs
- [ ] Logs estruturados (Winston)
- [ ] Métricas e monitoramento
- [ ] Cache com Redis

### **Versão 1.2**

- [ ] Suporte a múltiplos formatos (DOC, DOCX)
- [ ] OCR para imagens de currículos
- [ ] Análise de soft skills
- [ ] API de webhooks

### **Versão 2.0**

- [ ] Microserviços
- [ ] Análise de vagas do LinkedIn
- [ ] Sistema de templates
- [ ] ML próprio para análises

## 🧪 Testes

```bash
# Executar testes (quando implementados)
npm test

# Testes de integração
npm run test:integration

# Coverage
npm run test:coverage
```

## 🔒 Segurança

- **Autenticação JWT** com expiração
- **Hash de senhas** com bcrypt (12 rounds)
- **CORS** configurado para domínios específicos
- **Rate limiting** (planejado)
- **Sanitização** de arquivos upload

## 🤝 Contribuição

Este projeto é desenvolvido para fins de estudo. Contribuições são bem-vindas!

1. Faça um fork do projeto
2. Crie sua feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto é desenvolvido para fins educacionais e de estudo.

## 👨‍💻 Autor

Desenvolvido com ❤️ para consolidação de conhecimentos em **Node.js**, **TypeScript**, **APIs REST** e **integração com IA**.
