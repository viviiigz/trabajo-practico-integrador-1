import jwt from "jsonwebtoken";
import { Profile } from "../models/profile.model.js";
import { User } from "../models/user.model.js";
import { hashPassword, comparePasswords } from "../helpers/bcrypt.helper.js";
import { generateToken } from "../helpers/jwt.helper.js";

export const register = async (req, res) => {
  const {
    username,
    email,
    password,
    first_name,
    last_name,
    biography,
    avatar_url,
    birth_date,
  } = req.body;
  try {
    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      username: username,
      email: email,
      password: hashedPassword,
    });

    await Profile.create({
      first_name: first_name,
      last_name: last_name,
      biography: biography,
      avatar_url: avatar_url,
      birth_date: birth_date,
      user_id: user.id,
    });

    res.status(201).json({
      msg: "Usuario registrado correctamente",
      instrucciones:
        "Puedes completar tu perfil con información adicional (biografía, avatar, etc.) en la ruta /api/auth/profile",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
      msg: "Error interno del servidor",
    });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({
      where: {
        username: username,
      },
      include: [
        {
          model: Profile,
          as: "profile",
        },
      ],
    });
    if (!user) {
      return res.status(404).json({
        msg: "El usuario o la contraseña no coinciden",
      });
    }

    const isMatch = await comparePasswords(password, user.password);
    if (!isMatch) {
      return res.status(404).json({
        msg: "El usuario o la contraseña no coinciden",
      });
    }

    const token = generateToken(user);

    //token como cookie
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60,
    });

    return res.status(200).json({
      msg: "Logueado correctamente",
    });
  } catch (error) {
    res.status(500).json({
      msg: "Error interno del servidor",
      error,
    });
  }
};

export const logout = async (req, res) => {
  res.clearCookie("token"); // elimina cookie del navegador
  return res.json({ message: "Logout existoso" });
};

export const profile = async (req, res) => {
  try {
    //id del ususario del token
    const userId = req.user.id;
//buscamos al usuario y a su perfil en la db
    const userWithProfile = await User.findByPk(userId, {
      include: [
        {
          model: Profile,
          as: "profile",
        },
      ],
      attributes: { exclude: ["password"] }, //no queremos la contraseña
    });
//si no estan entonces error
    if (!userWithProfile || !userWithProfile.profile) {
      return res.status(404).json({ msg: "Perfil no encontrado." });
    }

    return res.status(200).json({
      username: userWithProfile.username,
      email: userWithProfile.email,
      role: userWithProfile.role,
      first_name: userWithProfile.profile.first_name,
      last_name: userWithProfile.profile.last_name,
      biography: userWithProfile.profile.biography,
      avatar_url: userWithProfile.profile.avatar_url,
      birth_date: userWithProfile.profile.birth_date,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Error interno del servidor", error
    });
  }
};


export const updateProfileAuthenticate = async (req, res) => {
  try {
    const userId = req.user.id;
    const updateData = req.body;

    const profile = await Profile.findOne({ where: { user_id: userId } });

    if (!profile) {
      return res.status(404).json({ msg: "Perfil no encontrado." });
    }

    await profile.update(updateData);

    return res.status(200).json({
      message: "Perfil actualizado correctamente.",
      profile: profile,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Error interno del servidor.", error
    });
  }
};
