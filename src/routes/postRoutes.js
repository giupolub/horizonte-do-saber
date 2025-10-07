const express = require("express");
const Post = require("../models/Post");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { titulo, conteudo, autor } = req.body;
    const novoPost = new Post({ titulo, conteudo, autor });
    await novoPost.save();
    res.status(201).json(novoPost);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar postagem." });
  }
});

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar postagens." });
  }
});

router.get("/search", async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) return res.status(400).json({ error: "Parâmetro 'q' obrigatório." });

    const posts = await Post.find({
      $or: [
        { titulo: { $regex: q, $options: "i" } },
        { conteudo: { $regex: q, $options: "i" } },
      ],
    }).sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar postagens." });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post não encontrado." });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar postagem." });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { titulo, conteudo, autor } = req.body;
    const postAtualizado = await Post.findByIdAndUpdate(
      req.params.id,
      { titulo, conteudo, autor },
      { new: true }
    );
    if (!postAtualizado)
      return res.status(404).json({ error: "Post não encontrado." });
    res.json(postAtualizado);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar postagem." });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const postRemovido = await Post.findByIdAndDelete(req.params.id);
    if (!postRemovido)
      return res.status(404).json({ error: "Post não encontrado." });
    res.json({ message: "Post removido com sucesso." });
  } catch (error) {
    res.status(500).json({ error: "Erro ao excluir postagem." });
  }
});

module.exports = router;
