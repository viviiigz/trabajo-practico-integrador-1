import { DataTypes } from "sequelize";
import { sequelize } from '../config/database.js';
import { User } from "./user.model.js";

export const Profile = sequelize.define(
  "Profile",
  {
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    biography: {
      type: DataTypes.TEXT,
    },
    avatar_url: {
      type: DataTypes.STRING,
    },
    birth_date: {
      type: DataTypes.DATE,
    },
  },
  {
    createdAt: "created_at",
    updatedAt: "update_at",
  }
);

Profile.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
  onDelete: "CASCADE",
});

User.addHook("afterDestroy", async (user) => {
  const profile = await Profile.findOne({
    where: { user_id: user.dataValues.id },
  });
  if (profile) {
    await profile.destroy();
  }
});
User.hasOne(Profile, { foreignKey: "user_id", as: "profile" });