import { DataTypes } from "sequelize";
import { sequelize } from '../config/database.js';

export const User = sequelize.define(
  "User",
  {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
    type: DataTypes.ENUM("user", "admin"),
    defaultValue: "user",
    },
     
  },
  {
    createdAt: "created_at",
    updatedAt: "update_at",
    paranoid: true,
    deletedAt: "delete_at", //eliminacion  logica
  }
);