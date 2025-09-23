// src/controllers/articletag.controllers.js
import { validationResult } from "express-validator";
import { Article } from "../models/article.model.js";
import { Tag } from "../models/tag.model.js";
import { ArticleTag } from "../models/article_tag.model.js";

export const addTagToArticle = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { article_id, tag_id } = req.body;
    const article = await Article.findByPk(article_id);
    const tag = await Tag.findByPk(tag_id);

    if (!article || !tag) {
      return res.status(404).json({ message: "Artículo o etiqueta no encontrados." });
    }

    await article.addTag(tag);

    return res.status(200).json({ message: "Etiqueta agregada al artículo exitosamente." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor.", error: error.message });
  }
};

export const removeTagFromArticle = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { articleTagId } = req.params;
    const articleTag = await ArticleTag.findByPk(articleTagId);

    if (!articleTag) {
      return res.status(404).json({ message: "Relación de artículo y etiqueta no encontrada." });
    }

    await articleTag.destroy();

    return res.status(200).json({ message: "Etiqueta removida del artículo exitosamente." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor.", error: error.message });
  }
};