const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const postRoutes = require("./routes/postRoutes");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Conectado ao MongoDB."))
  .catch((err) => console.error("Erro ao conectar ao MongoDB:", err));


app.get("/", (req, res) => res.send("Servidor rodando."));
app.use("/posts", postRoutes);

module.exports = app;
