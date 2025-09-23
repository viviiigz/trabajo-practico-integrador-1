import { Router } from "express";
import {
  createTag,
  getAllTags,
  getTagById,
  updateTag,
  deleteTag,
} from "../controllers/tag.controllers.js";
import {
  validateTagIdInParams,
  createTagValidator,
  updateTagValidator,
} from "../middlewares/validations/tag.validator.js";
import { validator } from "../middlewares/validator.js";
import { authMiddleware } from "../middlewares/auth.js";
import { authAdminMiddleware } from "../middlewares/authAdmin.js";

export const tagRouter = Router();

//rutas autenticadas
tagRouter.post(
  "/tags",
  createTagValidator,
  validator,
  authMiddleware,
  authAdminMiddleware,
  createTag
);

tagRouter.get("/tags", authMiddleware, getAllTags);

tagRouter.get(
  "/tags/:id",
  validateTagIdInParams,
  validator,
  authMiddleware,
  authAdminMiddleware,
  getTagById
);

tagRouter.put(
  "/tags/:id",
  validateTagIdInParams,
  updateTagValidator,
  authMiddleware,
  authAdminMiddleware,
  updateTag
);

tagRouter.delete(
  "/tags/:id",
  validateTagIdInParams,
  validator,
  authMiddleware,
  authAdminMiddleware,
  deleteTag
);
