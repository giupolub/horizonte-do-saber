const Counter = require("../models/Counter");

async function gerarMatricula(nome, session) {
  const prefixo = nome.substring(0, 3).toUpperCase();
  const ano = new Date().getFullYear();

  const contador = await Counter.findOneAndUpdate(
    { _id: "aluno" },
    { $inc: { seq: 1 } },
    { new: true, upsert: true, session }
  );

  const numero = String(contador.seq).padStart(6, "0");

  return `${prefixo}${ano}${numero}`;
}

module.exports = gerarMatricula;