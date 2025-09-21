import express from "express";
import "dotenv/config" 
import { routes } from "./src/routes/index.js";
import sequelize from "./src/config/database.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(cookieParser())


const PORT = process.env.PORT

//rutas
app.use("/api", routes)

sequelize.sync().then(() =>  {
  console.log("Base de datos sincronizada");
  app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
  });
});