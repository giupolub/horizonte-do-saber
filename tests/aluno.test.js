process.env.NODE_ENV = "test";

const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../src/server");
const Aluno = require("../src/models/Aluno");

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
  await Aluno.deleteMany({});
});

describe("Testes de endpoints de Alunos", () => {
  it("GET /alunos deve retornar vazio inicialmente", async () => {
    const res = await request(app).get("/alunos");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(0);
  });

  it("POST /alunos deve criar aluno com matrícula", async () => {
    const res = await request(app).post("/alunos").send({
      nome: "Lucas",
      sobrenome: "Silva",
      email: "lucas@email.com",
      telefone: "(11) 9 9999-8888"
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.matricula).toBeDefined();
    expect(res.body.matricula.length).toBeGreaterThan(10);
  });

  it("Não deve permitir email duplicado", async () => {
    await request(app).post("/alunos").send({
      nome: "Ana",
      sobrenome: "Souza",
      email: "ana@email.com",
      telefone: "11999998888"
    });

    const res = await request(app).post("/alunos").send({
      nome: "Outra",
      sobrenome: "Pessoa",
      email: "ana@email.com",
      telefone: "11999997777"
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("Email já cadastrado.");
  });
});