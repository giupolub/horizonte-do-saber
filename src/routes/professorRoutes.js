const express = require("express");
const Professor = require("../models/Professor");

const router = express.Router();

// Criar professor
router.post("/", async (req, res) => {

  
  try {
    const { nome, email, telefone } = req.body;

    const existeTelefone = await Professor.findOne({ telefone });
    if (existeTelefone) {
      return res.status(400).json({ error: "Telefone já cadastrado." });
    }

    const existeEmail = await Professor.findOne({ email });
    if (existeEmail) {
      return res.status(400).json({ error: "Email já cadastrado." });
    }
    
    const professor = await Professor.create(req.body);
    res.status(201).json(professor);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
    error: Object.values(error.errors)[0].message,
    });
  }
  if (error.code === 11000) {
    if (error.keyPattern.email) {
      return res.status(400).json({ error: "Email já cadastrado." });
    }
    if (error.keyPattern.telefone) {
      return res.status(400).json({ error: "Telefone já cadastrado." });
    }
  }
  res.status(500).json({ error: "Erro ao criar professor." });
}
});

// Listar professores
router.get("/", async (req, res) => {
  try {
    const professores = await Professor.find().sort({ createdAt: -1 });
    res.json(professores);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar professores." });
  }
});

// Buscar professor por palavra chave
router.get("/search", async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) return res.status(400).json({ error: "Parâmetro 'q' obrigatório." });

    const professores = await Professor.find({
      $or: [
        { nome: { $regex: q, $options: "i" } },
        { sobrenome: { $regex: q, $options: "i" } },
        { disciplina: { $regex: q, $options: "i" } },
      ],
    }).sort({ createdAt: -1 });

    res.json(professores);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar professores." });
  }
});

// Buscar professor por id
router.get("/:id", async (req, res) => {
  try {
    const professor = await Professor.findById(req.params.id);
    if (!professor) {
      return res.status(404).json({ error: "Professor não encontrado." });
    }
    res.json(professor);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar professor." });
  }
});

// Atualizar professor
router.put("/:id", async (req, res) => {
  try {
    const professor = await Professor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!professor) {
      return res.status(404).json({ error: "Professor não encontrado." });
    }

    res.json(professor);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar professor." });
  }
});

// Remover professor
router.delete("/:id", async (req, res) => {
  try {
    const professor = await Professor.findByIdAndDelete(req.params.id);

    if (!professor) {
      return res.status(404).json({ error: "Professor não encontrado." });
    }

    res.json({ message: "Professor removido com sucesso." });
  } catch (error) {
    res.status(500).json({ error: "Erro ao remover professor." });
  }
});

module.exports = router;