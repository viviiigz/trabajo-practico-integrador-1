import { validationResult } from "express-validator";
import { Article } from "../models/article.model.js";
import { User } from "../models/user.model.js";
import { Tag } from "../models/tag.model.js";


export const createArticle = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user_id = req.user.id; 

      const newArticle = await Article.create({
        title: req.body.title,
        content: req.body.content,
        excerpt: req.body.excerpt,
        status:req.body.status,
        user_id, 
      });
      res.status(201).json({ 
        message: "Artículo creado con éxito.",
        article: newArticle
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al crear el artículo" });
    }
};


export const getPublishedArticles = async (req, res) => {
  try {
    const articles = await Article.findAll({
      where: {
        status: "published" 
      },
      include: [
        { model: User, as: "author", attributes: ["username", "email"] },
        { model: Tag, as: "tags" },
      ],
    });
    return res.status(200).json(articles);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error.", error: error.message });
  }
};

export const getArticleById = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { id } = req.params;
    const article = await Article.findByPk(id, {
      include: [
        { model: User, as: "author", attributes: ["username", "email"] },
        { model: Tag, as: "tags" },
      ],
    });
    if (!article) {
      return res.status(404).json({ message: "Artículo no encontrado." });
    }
    return res.status(200).json(article);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor.", error: error.message });
  }
};

export const getUserArticles = async (req, res) => {
  try {
    const articles = await Article.findAll({
      where: { user_id: req.user.id },
      include: [
        { model: User, as: "author", attributes: ["username", "email"] },
        { model: Tag, as: "tags" },
      ],
    });
    return res.status(200).json(articles);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor.", error: error.message });
  }
};

export const getUserArticleById = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { id } = req.params;
    const article = await Article.findOne({
      where: { id: id, user_id: req.user.id },
      include: [
        { model: User, as: "author", attributes: ["username", "email"] },
        { model: Tag, as: "tags" },
      ],
    });
    if (!article) {
      return res.status(404).json({ message: "Artículo no encontrado para este usuario." });
    }
    return res.status(200).json(article);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor.", error: error.message });
  }
};

export const updateArticle = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { id } = req.params;
    const { title, content, excerpt, status } = req.body;
    
    const article = await Article.findOne({ where: { id: id, user_id: req.user.id } });
    if (!article) {
      return res.status(404).json({ message: "Artículo no encontrado o no autorizado para actualizar." });
    }
    
    article.title = title || article.title;
    article.content = content || article.content;
    article.excerpt = excerpt || article.excerpt;
    article.status = status || article.status;
    
    await article.save();
    
    return res.status(200).json({ message: "Artículo actualizado correctamente.", article });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor.", error: error.message });
  }
};

export const deleteArticle = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { id } = req.params;
    
    const article = await Article.findOne({ where: { id: id, user_id: req.user.id } });
    if (!article) {
      return res.status(404).json({ message: "Artículo no encontrado o no autorizado para eliminar." });
    }
    
    await article.update({ deleted_at: new Date() }); 
    
    return res.status(200).json({ message: "Artículo eliminado lógicamente." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor.", error: error.message });
  }
};