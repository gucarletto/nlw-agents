# NLW Agents

Projeto fullstack com foco em gerenciamento de salas e agentes, utilizando tecnologias modernas para backend e frontend.

## Tecnologias Utilizadas

### Backend (`server/`)
- **Node.js** + **TypeScript**
- **Drizzle ORM** (migrations, schema)
- **Fastify** (servidor HTTP)
- **dotenv** (variáveis de ambiente)
- **Docker** (containerização, banco de dados)

### Frontend (`web/`)
- **React** + **TypeScript**
- **Vite** (build e dev server)
- **React Router DOM** (rotas)

## Padrões de Projeto
- Estrutura modular por domínio (ex: `db/schema`, `http/routes`, `pages/`)
- Separação clara entre frontend e backend
- Uso de variáveis de ambiente para configuração
- Migrations versionadas para o banco de dados

## Setup e Configuração

### Pré-requisitos
- Node.js >= 22
- Docker (opcional, recomendado para banco de dados)

### Backend
```bash
cd server
npm install
# Para rodar o banco de dados com Docker:
docker-compose up -d
# Para rodar o servidor:
npm run dev
```

### Frontend
```bash
cd web
npm install
npm run dev
```

Acesse o frontend em `http://localhost:5173` (ou porta configurada pelo Vite).

---

> Projeto desenvolvido para o NLW Agents.
