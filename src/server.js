const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const postRoutes = require("./routes/postRoutes");
const professorRoutes = require("./routes/professorRoutes");
const alunoRoutes = require("./routes/alunoRoutes");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV !== "test") {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("Conectado ao MongoDB."))
    .catch((err) => console.error("Erro ao conectar ao MongoDB:", err));
}

app.get("/", (req, res) => res.send("Servidor rodando."));
app.use("/posts", postRoutes);
app.use("/professores", professorRoutes);
app.use("/alunos", alunoRoutes);

module.exports = app;
