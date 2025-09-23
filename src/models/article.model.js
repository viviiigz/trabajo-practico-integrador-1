import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { User } from "./user.model.js";

export const Article = sequelize.define(
  "Article",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    excerpt: {
      type: DataTypes.TEXT,
    },
    status: {
      type: DataTypes.ENUM,
      values: ["published", "archived"],
      defaultValue: "published",
    },
      user_id: { 
      type: DataTypes.INTEGER,
      allowNull: false,
    },
}, 
  {  createdAt: "created_at",
    updatedAt: "updated_at",
    paranoid: true, 
    deletedAt: 'deleted_at',
  }
  
);

Article.belongsTo(User, { foreignKey: "user_id", as: "author" });
User.hasMany(Article, { foreignKey: "user_id", as: "articles", onDelete: "CASCADE" });
