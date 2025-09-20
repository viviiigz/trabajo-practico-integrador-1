import express from "express";
import "dotenv/config" 

import sequelize from "./src/config/database.js";

const app = express();
app.use(express.json());


const PORT = process.env.PORT

sequelize.sync({force:true}).then(() =>  {
  console.log("Base de datos sincronizada");
  app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
  });
});