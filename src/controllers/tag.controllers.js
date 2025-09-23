import { validationResult } from "express-validator";
import { Tag } from '../models/tag.model.js'
import { Article } from '../models/article.model.js';

export const createTag = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const newTag = await Tag.create({ name: req.body.name });
        res.status(201).json({ message: "Etiqueta creada con éxito.", tag: newTag });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error interno del servidor." });
        
    }
};

export const getAllTags = async (req, res) => {
    try {
        const tags = await Tag.findAll({
            include: [{ model: Article, as: "articles" }],
        });
        res.status(200).json(tags);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error interno del servidor." });
    }
};

export const getTagById = async (req, res) => {
    try {
        const tag = await Tag.findByPk(req.params.id, {
            include: [{ model: Article, as: "articles" }],
        });
        if (!tag) {
            return res.status(404).json({ message: "Etiqueta no encontrada." });
        }
        res.status(200).json(tag);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error interno del servidor." });
    }
};

export const updateTag = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
    }
    try {
        const tag = await Tag.findByPk(req.params.id);
        if (!tag) {
            return res.status(404).json({ message: "Etiqueta no encontrada." });
        }
        await tag.update(req.body);
        res.status(200).json({ message: "Etiqueta actualizada con éxito." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error interno del servidor." });
    }
};

export const deleteTag = async (req, res) => {
    try {
        const tag = await Tag.findByPk(req.params.id);
        if (!tag) {
            return res.status(404).json({ message: "Etiqueta no encontrada." });
        }
        await tag.destroy();
        res.status(200).json({ message: "Etiqueta eliminada con éxito." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error interno del servidor." });
    }
};