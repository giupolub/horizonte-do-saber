process.env.NODE_ENV = "test";

const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../src/server");
const Post = require("../src/models/Post");

let mongoServer;

jest.setTimeout(30000);

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await Post.deleteMany({});
});

describe("Testes de endpoints de Postagens", () => {
  it("GET /posts deve retornar array vazio inicialmente", async () => {
    const res = await request(app).get("/posts");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(0);
  });

  it("POST /posts deve criar uma nova postagem", async () => {
    const res = await request(app)
      .post("/posts")
      .send({ titulo: "Aula 1", conteudo: "Conteúdo da aula", autor: "Prof. João" });
    expect(res.statusCode).toBe(201);
    expect(res.body.titulo).toBe("Aula 1");
  });

  it("GET /posts/:id deve retornar postagem específica", async () => {
    const post = await Post.create({ titulo: "Aula 2", conteudo: "Conteúdo 2", autor: "Prof. Maria" });
    const res = await request(app).get(`/posts/${post._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.titulo).toBe("Aula 2");
  });

  it("PUT /posts/:id deve atualizar uma postagem", async () => {
    const post = await Post.create({ titulo: "Aula 3", conteudo: "Conteúdo 3", autor: "Prof. Ana" });
    const res = await request(app)
      .put(`/posts/${post._id}`)
      .send({ titulo: "Aula 3 atualizada", conteudo: "Novo conteúdo", autor: "Prof. Ana" });
    expect(res.statusCode).toBe(200);
    expect(res.body.titulo).toBe("Aula 3 atualizada");
  });

  it("DELETE /posts/:id deve remover uma postagem", async () => {
    const post = await Post.create({ titulo: "Aula 4", conteudo: "Conteúdo 4", autor: "Prof. Carlos" });
    const res = await request(app).delete(`/posts/${post._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Post removido com sucesso.");
  });

  it("GET /posts/search?q=termo deve retornar postagens correspondentes", async () => {
    await Post.create({ titulo: "Matemática básica", conteudo: "Frações e decimais", autor: "Prof. João" });
    await Post.create({ titulo: "Português", conteudo: "Gramática", autor: "Prof. Maria" });

    const res = await request(app).get("/posts/search?q=matemática");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].titulo).toBe("Matemática básica");
  });
});