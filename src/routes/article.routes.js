import { Router } from "express";
import {
  createArticle,
  deleteArticle,
  getArticleById,
  getPublishedArticles,
  getUserArticleById,
  getUserArticles,
  updateArticle,
} from "../controllers/article.controllers.js";
import { authMiddleware } from "../middlewares/auth.js";
import {
  updateArticleValidator,
  createArticleValidator,
  validateArticleIdInParams,
} from "../middlewares/validations/article.validator.js";
import { authAdminMiddleware } from "../middlewares/authAdmin.js";
import { ownerMiddleware } from "../middlewares/authOwner.js";
import { validator } from "../middlewares/validator.js";

export const articleRouter = Router();

articleRouter.post(
  "/articles",
  authMiddleware,
  createArticleValidator,
  validator,
  createArticle
);

articleRouter.get("/articles", authMiddleware, getPublishedArticles);

articleRouter.get("/articles/user", authMiddleware, getUserArticles);

articleRouter.get(
  "/articles/:id",
  authMiddleware,
  validateArticleIdInParams,
  getArticleById
);

articleRouter.get(
  "/articles/user/:id",
  validateArticleIdInParams,
  validator,
  authMiddleware,
  getUserArticleById
);

articleRouter.put(
  "/articles/:id",
  validateArticleIdInParams,
  updateArticleValidator,
  validator,
  authMiddleware,
  ownerMiddleware,
  updateArticle
);

articleRouter.delete(
  "/articles/:id",
  validateArticleIdInParams,
  validator,
  authMiddleware,
  ownerMiddleware,
  deleteArticle
);
