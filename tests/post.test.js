const request = require("supertest");
const app = require("../src/server");

describe("Testes básicos de Posts", () => {
  it("Deve retornar 200 na rota GET /posts", async () => {
    const res = await request(app).get("/posts");
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });
});
