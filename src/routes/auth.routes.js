import { Router } from "express";
import {
  login,
  logout,
  profile,
  register,
  updateProfileAuthenticate,
} from "../controllers/auth.controllers.js";
import { authMiddleware } from "../middlewares/auth.js";
import { createUserValidator } from "../middlewares/validations/user.validator.js";
import { validator } from "../middlewares/validator.js";
import {
  createProfileValidator,
  updateProfileValidator,
} from "../middlewares/validations/profile.validator.js";

export const authRouter = Router();

// rutas autentic7adas
authRouter.post("/auth/logout",authMiddleware, logout);
authRouter.get("/auth/profile", authMiddleware, profile);
authRouter.put(
  "/auth/profile",
  updateProfileValidator,
  validator,
  authMiddleware,
  updateProfileAuthenticate
);

// rutas publicas
authRouter.post(
  "/auth/register",
  createProfileValidator,
  createUserValidator,
  validator,
  register
);
authRouter.post("/auth/login", login);