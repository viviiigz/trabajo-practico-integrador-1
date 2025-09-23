import { Router } from "express";
import {
  validateArticleTagId,
  addTagToArticleValidator,
  removeTagFromArticleValidator,
} from "../middlewares/validations/article_tag.validator.js";
import {
  addTagToArticle,
  removeTagFromArticle,
} from "../controllers/article_tag.controllers.js";
import { authAdminMiddleware } from "../middlewares/authAdmin.js";
import { validator } from "../middlewares/validator.js";
import { ownerMiddleware } from "../middlewares/authOwner.js";
import { authMiddleware } from "../middlewares/auth.js";
export const articleTagRouter = Router();

articleTagRouter.post(
  "/articles-tags",
  addTagToArticleValidator,
  validator,
  authMiddleware,
  ownerMiddleware,
  addTagToArticle
);
articleTagRouter.delete(
  "/articles-tags/:articleTagId",
  validateArticleTagId,
  removeTagFromArticleValidator,
  validator,
  authMiddleware,
  ownerMiddleware,
  removeTagFromArticle
);
