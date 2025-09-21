//exporto para despues importar en app.js
import { Router } from "express";
import { authRouter } from "./auth.routes.js";
import { userRouter } from "./user.routes.js";


export const routes = Router();

routes.use(authRouter)
routes.use(userRouter);
