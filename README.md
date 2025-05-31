

# ResumeIA-Backend

**ResumeIA-Backend** é a API backend de um projeto em desenvolvimento com fins educacionais.

A proposta da aplicação é analisar a compatibilidade entre currículos (CVs) e descrições de vagas de emprego, utilizando 
inteligência artificial para fornecer insights úteis sobre o quanto um candidato se encaixa nos requisitos de uma vaga.

Este projeto está sendo desenvolvido com foco em aprendizado nas tecnologias Node.js, TypeScript, Express e Prisma ORM.

## 🔧 Tecnologias utilizadas

- **Node.js** – Ambiente de execução JavaScript
- **Express** – Framework web minimalista
- **Prisma** – ORM para interação com o banco de dados
- **OpenAI API** – Utilizada para analisar e comparar currículos e vagas com base em IA
- **PostgreSQL** – Banco de dados relacional

## 🚀 Funcionalidades (em desenvolvimento)

- Cadastro e Login de usuarios
- Análise de compatibilidade entre currículo e vaga usando IA
- API RESTful com rotas organizadas por recursos


## 🧪 Como rodar localmente

### 1. Clone o repositório

```bash
git clone https://github.com/1montandon/ResumeIA-Backend.git
cd ResumeIA-Backend
````

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure o banco de dados

Crie um arquivo `.env` baseado no `.env.example` com as informações do seu banco de dados PostgreSQL e chave da API da OpenAI:

```env
DATABASE_URL=postgresql://usuario:senha@localhost:5432/resumeia
OPENAI_API_KEY=sua_chave_openai_aqui
```

### 4. Rode as migrações

```bash
npx prisma migrate dev
```

### 5. Inicie o servidor

```bash
npm run dev
```

## 🤖 Sobre a análise com IA

A aplicação utiliza a API da OpenAI para comparar o conteúdo textual de currículos e descrições de vagas. A IA retorna uma análise textual e um score de compatibilidade, que podem ser usados por recrutadores ou candidatos para entender melhor os pontos fortes e fracos de um currículo frente a uma oportunidade.

## 📌 Status

> 🚧 Projeto em desenvolvimento – funcionalidades estão sendo adicionadas e aprimoradas continuamente para fins de estudo e aprendizado.

## 📄 Licença

Este projeto é livre para fins de estudo. Nenhuma garantia de produção é oferecida neste estágio.

Desenvolvido por [@1montandon](https://github.com/1montandon) 💻


