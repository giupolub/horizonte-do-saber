const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    titulo: { type: String, required: true },
    conteudo: { type: String, required: true },
    autor: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
