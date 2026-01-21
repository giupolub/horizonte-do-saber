# Horizonte do Saber - Plataforma Educacional

## 📖 Descrição do Projeto

O Horizonte do Saber é uma plataforma educacional voltada para professores e alunos da rede pública de ensino. A aplicação permite:

- Cadastro de professores
- Cadastro de alunos com matrícula automática
- Publicação de postagens educacionais (aulas, atividades, comunicados)
- Busca e listagem de dados de forma centralizada

O projeto foi desenvolvido com foco em boas práticas de backend, utilizando Node.js, Express, MongoDB, Docker e GitHub Actions.

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
│  ├─ models/
│  │   ├─ Post.js
│  │   ├─ Aluno.js
│  │   ├─ Professor.js
│  │   └─ Counter.js
│  ├─ routes/
│  │   ├─ postRoutes.js
│  │   ├─ alunoRoutes.js
│  │   └─ professorRoutes.js
│  ├─ utils/
│  │   └─ gerarMatricula.js
│  ├─ server.js
│  └─ index.js
├─ tests/
├─ .github/workflows/
├─ Dockerfile
├─ docker-compose.yml
├─ .env
├─ package.json
└─ README.md
```
---

## 📚 Entidades do Sistema

### 🧑‍🏫 Professor

Campos:
- nome (máx 30)
- sobrenome (máx 70)
- disciplina (máx 50)
- email (único, validado)
- telefone (único, apenas números)

### 🎓 Aluno

Campos:
- nome (máx 30)
- sobrenome (máx 70)
- email (único, validado)
- telefone (único, apenas números)
- matricula (gerada automaticamente)

### 📝 Postagem

Campos:
- titulo
- conteudo
- autor

---

## ⚡ Setup Inicial

### 1. Clonar o repositório

```bash
git clone https://github.com/giupolub/horizonte-do-saber.git
ou
git clone git@github.com:giupolub/horizonte-do-saber.git

cd horizonte-do-saber
```

### 2. Abra o Docker Desktop para garantir que o Docker e o Docker Compose estão ativos

### 3. Instalar dependências

```bash
npm install
```

### 4. Configurar variáveis de ambiente

Crie um arquivo `.env` com as seguintes variáveis:

```env
Para rodar local:

PORT=3000
MONGO_URI=mongodb://localhost:27017/horizonte-do-saber

Para rodar dentro do container:

PORT=3000
MONGO_URI=mongodb://mongodb:27017/horizonte-do-saber
```

### 5. Rodar a aplicação local

Suba o Mongo no container:
```env
docker compose up -d mongodb
```

Rode o backend local:
```env
npm run dev
```

### 5.1 Rodar a aplicação no Docker

Suba apenas com o docker:
```env
docker compose up --build
```

A aplicação estará disponível em `http://localhost:3000`.

### 6. Rodar testes

```bash
npm test
```

---

## 🚀 Endpoints da API

### Alunos

| Método | Endpoint               | Descrição                                 |
| ------ | ---------------------- | ----------------------------------------- |
| GET    | /alunos                | Listar alunos                             |
| GET    | /alunos/:id            | Buscar aluno por id                       |
| POST   | /alunos                | Criar aluno                               |
| PUT    | /alunos/:id            | Atualizar aluno                           |
| DELETE | /alunos/:id            | Remover aluno                             |
| GET    | /alunos/search?q=termo | Buscar aluno por nome/sobrenome/matricula |

Exemplo de requisição (para criar/atualizar):

```bash
{
  "nome": "Giuseppe",
  "sobrenome": "Orlandi",
  "email": "giuseppe.po@hotmail.com",
  "telefone": "11 9 9999 9999"
}
```

### Professores

| Método | Endpoint              | Descrição                         |
| ------ | --------------------- | --------------------------------- |
| GET    | /professores                | Listar professores       |
| GET    | /professores/:id            | Buscar professor por id   |
| POST   | /professores                | Criar professor            |
| PUT    | /professores/:id            | Atualizar professor   |
| DELETE | /professores/:id            | Remover professor               |
| GET    | /professores/search?q=termo | Buscar professor por nome/sobrenome/disciplina |

Exemplo de requisição (para criar/atualizar):

```bash
{
  "nome": "Maria",
  "sobrenome": "Joaquina",
  "disciplina": "Geologia",
  "email": "maria@joaquina.com",
  "telefone": "11111111112"
}
```

### Postagens

| Método | Endpoint              | Descrição                         |
| ------ | --------------------- | --------------------------------- |
| GET    | /posts                | Listar postagens       |
| GET    | /posts/:id            | Buscar postagem por id   |
| POST   | /posts                | Criar postagem            |
| PUT    | /posts/:id            | Atualizar postagem   |
| DELETE | /posts/:id            | Remover postagem               |
| GET    | /posts/search?q=termo | Buscar postagem por autor/titulo/conteudo |

Exemplo de requisição (para criar/atualizar):

```bash
{
	"titulo": "Introdução à Programação com Lógica",
	"conteudo": "Nesta atividade, os alunos terão o primeiro contato com conceitos de lógica de programação, como variáveis, condições e repetição. Assista ao vídeo indicado, leia o material de apoio e resolva os desafios propostos utilizando pseudocódigo. O foco é desenvolver o raciocínio lógico antes do uso de uma linguagem de programação específica.",
	"autor": "Prof. Felipe Martins"
}
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


O Horizonte do Saber evoluiu de um simples blog para um sistema educacional completo, com:

- Controle de alunos e professores
- Matrícula automática
- Persistência real em banco
- Boas práticas de backend
- Estrutura pronta para escalar

Projeto ideal para portfólio e demonstração de backend profissional.