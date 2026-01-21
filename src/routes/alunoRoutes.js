const express = require("express");
const Aluno = require("../models/Aluno");
const gerarMatricula = require("../utils/gerarMatricula");
const mongoose = require("mongoose");
const Counter = require("../models/Counter");

const router = express.Router();

// Criar aluno
router.post("/", async (req, res) => {
  try {
    const matricula = await gerarMatricula(req.body.nome);

    const aluno = new Aluno({
      ...req.body,
      matricula,
    });

    await aluno.save();
    res.status(201).json(aluno);
  } catch (error) {
    if (error.code === 11000) {
      if (error.keyPattern.email)
        return res.status(400).json({ error: "Email já cadastrado." });

      if (error.keyPattern.telefone)
        return res.status(400).json({ error: "Telefone já cadastrado." });
    }
    res.status(500).json({ error: "Erro ao criar aluno." });
  }
});

// Listar alunos
router.get("/", async (req, res) => {
  try {
    const alunos = await Aluno.find().sort({ createdAt: -1 });
    res.json(alunos);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar alunos." });
  }
});

// Buscar aluno por palavra chave
router.get("/search", async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) return res.status(400).json({ error: "Parâmetro 'q' obrigatório." });

    const alunos = await Aluno.find({
      $or: [
        { nome: { $regex: q, $options: "i" } },
        { sobrenome: { $regex: q, $options: "i" } },
        { matricula: { $regex: q, $options: "i" } },
      ],
    }).sort({ createdAt: -1 });

    res.json(alunos);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar alunos." });
  }
});

// Buscar aluno por id
router.get("/:id", async (req, res) => {
  try {
    const aluno = await Aluno.findById(req.params.id);
    if (!aluno) {
      return res.status(404).json({ error: "Aluno não encontrado." });
    }
    res.json(aluno);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar aluno." });
  }
});

// Atualizar aluno
router.put("/:id", async (req, res) => {
  try {
    const aluno = await Aluno.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!aluno) {
      return res.status(404).json({ error: "Aluno não encontrado." });
    }

    res.json(aluno);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar aluno." });
  }
});

// Remover aluno
router.delete("/:id", async (req, res) => {
  try {
    const aluno = await Aluno.findByIdAndDelete(req.params.id);

    if (!aluno) {
      return res.status(404).json({ error: "Aluno não encontrado." });
    }

    res.json({ message: "Aluno removido com sucesso." });
  } catch (error) {
    res.status(500).json({ error: "Erro ao remover aluno." });
  }
});

module.exports = router;