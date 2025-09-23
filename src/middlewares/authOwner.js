import { Article } from '../models/article.model.js';

export const ownerMiddleware = async (req, res, next) => {
  try {
    if (req.user.role === 'admin') {
      return next();
    }
    const article = await Article.findByPk(req.params.id);

    if (!article) {
      return res.status(404).json({
        message: 'Artículo no encontrado.',
      });
    }

    // compara lso ids
    if (article.user_id !== req.user.id) {
      return res.status(403).json({
        message: 'Acceso denegado. No eres el autor de este artículo.',
      });
    }

    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Error interno del servidor.', error
    });
  }
};