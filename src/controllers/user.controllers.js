import { User } from "../models/user.model.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll(req.body);
    return res.status(200).json(users);
  } catch (error) {
    res.status(500).json({mesagge: "Error interno del servidor.", error});
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      return res.status(200).json(user);
    } else {
      return res.status(404).json({
        message: "No se pudo encontrar el usuario o no existe.",
      });
    }
  } catch (error) {
    res.status(500).json({
      mesagge: "Error interno del servidor.", error
    });
  }
};

export const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    if (user) {
      return res.status(201).json(user);
    } else {
      return res.status(400).json({
        message: "No se pudo crear el usuario.",
      });
    }
  } catch (error) {
    res.status(500).json({
      mesagge: "Error interno del servidor.",
      error
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const [update] = await User.update(req.body, {
      where: { id: req.params.id },
    });
    if (update) {
      const user = await User.findByPk(req.params.id);
      return res.status(200).json({
        mesagge: "Usuario actualizado correctamente.",
        user: user,
      });
    }
  } catch (error) {
    res.status(500).json({
      mesagge: "Error interno del servidor.",
      error
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({
        mesagge: "Usuario no encontrado",
      });
    }
    await User.destroy({ where: { id: req.params.id } });
    return res.status(200).json({
      mesagge: "Usuario eliminado correctamente.",
      user: user,
    });
  } catch (error) {
    res.status(500).json({
      mesagge: "Entered the try catch.",
      error: error.message,
    });
  }
};