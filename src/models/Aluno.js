const mongoose = require("mongoose");

const alunoSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: true,
      maxlength: 30,
      trim: true,
    },
    sobrenome: {
      type: String,
      required: true,
      maxlength: 70,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      maxlength: 100,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Email inválido"],
    },
    telefone: {
      type: String,
      required: true,
      unique: true,
      set: (value) => value.replace(/\D/g, ""),
      match: [/^\d{11}$/, "Telefone deve conter exatamente 11 números"],
    },
    matricula: {
      type: String,
      required: true,
      unique: true,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Aluno", alunoSchema);