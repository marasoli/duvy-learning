# Duvy Learning
Projeto desenvolvido durante o evento **NLW Agents** da _[Rocketseat](https://www.rocketseat.com.br/)_ para a criação de um webapp com Inteligência Artificial e desenvolvimento de API.

### 📁 Raiz do projeto
A raiz contém a configuração do **Biome + Ultracite**, responsável por análise e formatação do código em **todo o monorepo**.
1. Instale as dependências na raiz
```bash
npm install
```

## Back-end
### 🚀 Tecnologias
- **Node.js** - Com TypeScript nativo (experimental-strip-types)
- **Docker** - Containerização do banco de dados
- **PostgreSQL** - Com extensão **pgvector** para vetores
- **Drizzle ORM** - Operações de type-safe no banco de dados
- **Fastify** - Framework web
- **Zod** - Validação de Schema

### 🏗️ Arquitetura
- Separação de responsabilidades entre rotas, schemas e conexão com banco
- Validação de schemas com Zod para type-safety
- ORM type-safe com Drizzle para operações de banco de dados
- Validação de variáveis de ambiente centralizadas

### ⚙️ Configuração
1. Pré-requisito
- Node.js v22+ 
- Docker e Docker compose

2. Configure as variáveis de ambiente
- Utilize os arquivos `.env.example` como base
- Há arquivos de exemplo em `docker/` e `server/` 
- Renomeie para `.env` e altere os valores necessários

3. Entre na pasta back: `cd back`

4. Instale as dependências
```bash
npm install
```
5. Inicie o banco de dados com o Docker
```bash
cd docker
docker compose up -d
```

6. Execute as migrações do banco
```bash
cd server
npx drizzle-kit migrate
```

7. Execute o projeto
```bash
npm run dev
```

### 👾 Scripts Disponíveis
- `npm run dev` - Executa o servidor em modo de desenvolvimento com hot reload
- `npm start` - Executa o servidor em modo de produção
- `npm run db:seed` - Popula o banco de dados com dados de exemplo

## Front-end
### 🚀 Tecnologias
- **React/Vite** - Biblioteca para UI e ferramentas de desenvolvimento
- **React Router Dom** - Biblioteca de roteamento
- **TanStack React Query** - Gerenciamento de estado servidor e cache
- **TypeScript** - Superset JavaScript com tipagem estática
- **TailwindCSS** - Framework CSS utility-first
- **Shadcn/ui** - Sistema de componentes
- **Radix UI** - Componentes primitivos acessíveis
- **Lucide React** - Biblioteca de ícones

### 🏗️ Arquitetura
- Arquitetura baseada em componentes React
- Roteamento baseado em arquivos com React Router
- Gerenciamento de estado servidor com React Query
- Componentes com variantes usando CVA
- Padrão de composição com Radix Slot

### ⚙️ Configuração
1. Entre na pasta front: `cd front`

2. Instale as dependências
```bash
npm install
```

3. Execute o projeto
```bash
npm run dev
```

> ⚠️ O backend **deve estar rodando** antes de iniciar o frontend

### 👾 Scripts Disponíveis
- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera build de produção
- `npm run preview` - Preview do build de produção

## 🌐 Portas e Endpoints
**Frontend React -** `http://localhost:5173` <br>
**Backend API -** `http://localhost:3333`
- `GET /health` - Health check da aplicação
- `GET /rooms` - Lista as salas disponíveis
