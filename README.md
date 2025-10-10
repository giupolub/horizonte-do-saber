# Horizonte do Saber - Plataforma de Blogging Dinâmico

## 📖 Descrição do Projeto

O **Horizonte do Saber** é uma aplicação de blogging voltada para professores e alunos da rede pública de educação. A plataforma permite que docentes postem aulas, atividades e mensagens, enquanto alunos podem visualizar e buscar conteúdos de forma centralizada e tecnológica.

O projeto foi implementado utilizando **Node.js**, **Express**, **MongoDB**, **Docker** e **GitHub Actions** para automação de CI/CD.

---

## ⚙️ Tecnologias Utilizadas

* **Back-end:** Node.js, Express
* **Banco de dados:** MongoDB
* **Testes unitários:** Jest, Supertest
* **Containerização:** Docker
* **Automação CI/CD:** GitHub Actions
* **Linting:** ESLint

---

## 🏗 Arquitetura da Aplicação

O projeto segue uma arquitetura simples e modular:

```
horizonte-do-saber/
├─ src/
│  ├─ models/          # Modelos do MongoDB (Post)
│  ├─ routes/          # Rotas da API (postRoutes.js)
│  ├─ server.js        # Configuração do servidor Express
├─ tests/              # Testes unitários e de integração
├─ .github/workflows/  # Workflows do GitHub Actions (CI/CD)
├─ Dockerfile          # Containerização da aplicação
├─ .env                # Variáveis de ambiente
├─ package.json
├─ README.md
```

* **Modelos:** `Post` representa uma postagem com `título`, `conteúdo`, `autor` e `timestamps`.
* **Rotas:** CRUD completo + busca por palavras-chave.
* **Testes:** Cobertura mínima de 20%, garantindo estabilidade nas funções críticas.

---

## ⚡ Setup Inicial

### 1. Clonar o repositório

```bash
git clone https://github.com/seu-usuario/horizonte-do-saber.git
ou
git clone git@github.com:giupolub/horizonte-do-saber.git

cd horizonte-do-saber
```

### 2. Instalar dependências

```bash
npm install
```

### 3. Configurar variáveis de ambiente

Crie um arquivo `.env` com as seguintes variáveis:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/horizonte-do-saber
```

### 4. Rodar a aplicação

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:3000`.

### 5. Rodar testes

```bash
npm test
```

---

## 🚀 Endpoints da API

| Método | Endpoint              | Descrição                         | Corpo da Requisição                                     |
| ------ | --------------------- | --------------------------------- | ------------------------------------------------------- |
| GET    | /posts                | Lista de todas as postagens       | -                                                       |
| GET    | /posts/:id            | Retorna uma postagem específica   | -                                                       |
| POST   | /posts                | Cria uma nova postagem            | `{ "title": "...", "content": "...", "author": "..." }` |
| PUT    | /posts/:id            | Atualiza uma postagem existente   | `{ "title": "...", "content": "...", "author": "..." }` |
| DELETE | /posts/:id            | Exclui uma postagem               | -                                                       |
| GET    | /posts/search?q=termo | Busca postagens por palavra-chave | -                                                       |

---

## 🐳 Docker

### 1. Configurar variáveis de ambiente

Crie (ou edite) o arquivo `.env` com as seguintes variáveis:

```env
PORT=3000
MONGO_URI=mongodb://mongodb:27017/horizonte-do-saber
```

### 2. Abra o Docker Desktop para garantir que o Docker e o Docker Compose estão ativos

### 3. Build e execução dos containers

No terminal, execute o seguinte comando para construir as imagens e subir os containers:

```bash
docker-compose up --build
```

---

## 📦 CI/CD - GitHub Actions

O workflow configurado executa automaticamente:

1. Instalação de dependências.
2. Rodar ESLint para verificação de código.
3. Executa testes unitários.
4. Gera relatório de cobertura.

---

## 📝 Cobertura de Testes

* Cobertura mínima de 20% garantida.
* Testes realizados com **Jest** e **Supertest**.
* Endpoints críticos (POST, PUT, DELETE) totalmente testados.

---

## 🛠 Desafios e Experiências


* Configuração do Jest com MongoDB in-memory.
* Problemas com grandes arquivos no GitHub e configuração do `.gitignore`.
* Ajustes de ESLint e padronização do código.
* Aprendizado com Docker e CI/CD no GitHub Actions.
* Realizar a ligação de todos os componentes para fazer o projeto rodar.

---

## 📚 Conclusão

O projeto Horizonte do Saber entrega uma **plataforma funcional de blogging** com backend robusto, persistência de dados e testes unitários, pronta para ser usada por professores e alunos, com automação de deploy e containerização.
