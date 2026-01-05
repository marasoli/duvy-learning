# Duvy Learning
Projeto desenvolvido durante o evento **NLW Agents** da _[Rocketseat](https://www.rocketseat.com.br/)_ para a criação de um webapp de explicação, revisão de estudos e apoio ao aprendizado utilizando Inteligência Artificial.

### 📁 Raiz do projeto
A raiz contém a configuração do **Biome + Ultracite**, responsável por análise e formatação do código em **todo o monorepo**.

1. Instale as dependências na raiz
```bash
npm install
```

## Back-end
### 🚀 Tecnologias
- **Node.js** - Com TypeScript nativo (`experimental-strip-types`)
- **Docker & Docker Compose** - Containerização do banco de dados
- **PostgreSQL** - Extensão **pgvector** para busca vetorial e similaridade semântica
- **Drizzle** - Para operações de type-safe, migrações e população de dados 
- **Fastify** - Framework web com cors, multipart e type-provider-zod
- **Zod** - Para validação de Schema e variaveis de ambiente
- **GenAI** - API Google Geminai para geração e análise de conteúdo com IA

### 🏗️ Arquitetura
- **Plugin Pattern**: Aplicação estruturada com routes registradas como plugins Fastify
- **Validação em camadas**: Zod para schemas HTTP e variáveis de ambiente
- **ORM Type-Safe**: Drizzle com operações totalmente tipadas e migrações versionadas
- **Busca Vetorial**: PostgreSQL com extensão pgvector para similaridade semântica entre audio chunks e perguntas
- **Separação de camadas**: 
  - `db/` - Conexão, schema e migrations
  - `routes/` - Endpoints HTTP com validação de schema
  - `services/` - Lógica de negócio (IA, embeddings, transcrição)

### ⚙️ Configuração
1. Pré-requisitos
- Node.js v22+ 
- Docker e Docker Compose
- API Google Gemini (GenAI) habilitada

2. Configure as variáveis de ambiente
- Utilize o arquivo `.env.example` como base
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
npx drizzle-kit migrate
```

7. Execute o projeto
```bash
npm run dev
```

8. Popule o banco (opcional)
```bash
npm run db:seed
```

### 👾 Scripts Disponíveis
- `npm run dev` - Executa o servidor em modo de desenvolvimento com hot reload (--watch)
- `npm start` - Executa o servidor em modo de produção
- `npm run db:seed` - Popula o banco de dados com dados de exemplo

## Front-end
### 🚀 Tecnologias
- **React & Vite** - Biblioteca para UI com build ultra-rápido
- **TypeScript** - Tipagem estática completa no projeto
- **TanStack React Query** - Gerenciamento de estado do servidor com cache e sincronização automática
- **React Hook Form** - Gerenciamento de formulários com validação
- **React Router** - Roteamento declarativo
- **Zod** - Validação de schema (client-side)
- **Web Speech API** - Gravação de áudio nativo do navegador com `MediaRecorder`
- **TailwindCSS** - Utility-first CSS framework integrado com Vite
- **Shadcn UI** - Componentes headless de alta qualidade
- **Radix UI** - Primitivos acessíveis (dialogs, popovers, etc)
- **Lucide React** - Ícones SVG consistentes
- **Dayjs** - Parsing e formatação de datas leve
- **Class Variance Authority** - Composição de classes para variantes de componentes
- **CLSX/Tailwind Merge** - Utilitários para concatenar classes TailwindCSS

### 🏗️ Arquitetura
- **Componentes** - Design system com Shadcn/UI, Radix UI primitivos e CVA para variantes
- **Gerenciamento de estado**: React Query para cache e sincronização de dados do servidor
- **Composição** - Radix Slot para componentes flexíveis, padrão compound components
- **Hooks customizados**: Abstrações para chamadas HTTP
- **Roteamento** - React Router com 3 rotas principais:
  - `/` - Criar e listar salas de estudo
  - `/room/:roomId` - Visualizar questões de uma sala
  - `/room/:roomId/audio` - Gravar áudio para fazer perguntas

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

> ⚠️ O **backend deve estar rodando** antes de iniciar o frontend

### 👾 Scripts Disponíveis
- `npm run dev` - Inicia o servidor de desenvolvimento com Vite (hot reload)
- `npm run build` - Compila TypeScript e gera build de produção otimizado
- `npm run preview` - Preview local do build de produção

## 🌐 Portas e Endpoints
**Frontend React -** `http://localhost:5173` <br>
**Backend API -** `http://localhost:3333`

1. Salas de Estudo
- `GET /rooms` - Lista todas as salas de estudo disponíveis
- `POST /rooms` - Cria uma nova sala de estudo
  - Body: `{ name: string, description?: string }`

2. Questões
- `GET /rooms/{roomId}/questions` - Lista questões de uma sala
- `POST /rooms/{roomId}/questions` - Cria uma nova questão
  - Body: `{ question: string }`
  - Usa busca vetorial para encontrar chunks de áudio relevantes
  - Gera resposta com IA baseada nos chunks encontrados

3. Áudio
- `POST /rooms/{roomId}/audio` - Faz upload de áudio
  - Form Data: `file` (blob de áudio em webm)
  - Transcreve o áudio usando Gemini 2.5 Flash
  - Gera embeddings vetoriais para busca semântica
  - Armazena na tabela `audio_chunks`

4. Health Check
- `GET /health` - Verifica se a aplicação está funcionando

## 🤖 Criação de Questão com IA
1. Usuário grava áudio via `RecordRoom` (WebM)
2. Frontend faz POST `/rooms/{roomId}/audio`
3. Backend transcreve com Gemini → armazena transcription + embeddings
4. Usuário digita ou fala pergunta na sala
5. Frontend faz POST `/rooms/{roomId}/questions`
6. Backend busca chunks similares usando pgvector (similaridade > 0.7)
7. Gera resposta com IA usando os chunks encontrados
8. Questão e resposta são salvas no banco
9. Frontend renderiza questão com resposta em React Query cache
