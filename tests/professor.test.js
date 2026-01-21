process.env.NODE_ENV = "test";

const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../src/server");
const Professor = require("../src/models/Professor");

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
  await Professor.deleteMany({});
});

describe("Testes de endpoints de Professores", () => {
  it("POST /professores deve criar professor", async () => {
    const res = await request(app).post("/professores").send({
      nome: "João",
      sobrenome: "Pereira",
      disciplina: "Matemática",
      email: "joao@escola.com",
      telefone: "11988887777"
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.disciplina).toBe("Matemática");
  });

  it("Não deve permitir telefone duplicado", async () => {
    await request(app).post("/professores").send({
      nome: "Maria",
      sobrenome: "Lima",
      disciplina: "Português",
      email: "maria@escola.com",
      telefone: "11911112222"
    });

    const res = await request(app).post("/professores").send({
      nome: "Outra",
      sobrenome: "Pessoa",
      disciplina: "História",
      email: "outra@escola.com",
      telefone: "11911112222"
    });

    expect(res.statusCode).toBe(400);
  });
});