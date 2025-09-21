import { Profile } from "../models/profile.model.js";
import { User } from "../models/user.model.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      include: [
        {
          model: Profile,
          as: "profile"
        },
      ],
      attributes: { exclude: ["password"]},
    });
    return res.status(200).json(users);
  } catch (error) {
    res.status(500).json({mesagge: "Error interno del servidor.", error});
  }
};

export const getUserById = async (req, res) => {
  try {
    const {id} = req.params;

    const user = await User.findByPk(id, {
      include:[
        {
          model: Profile,
          as: "profile"
        }
      ],
      attributes: { exclude: ["password"]}
    });

    if (!user) {
      return res.status(404).json({
        message: "No se pudo encontrar el usuario o no existe.",
      });
    }
    return res.status(200).json(user);
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
    const {id} = req.params;
    const updateData = req.body 

    const user = await User.findByPk(id, {
      attributes: { exclude: ["password"] },
    });
    if (!user) {
      return res.status(404).json({
        message: "Usuario no encontrado.",
      });
    }
    await user.update(updateData);

    return res.status(200).json({
        mesagge: "Usuario actualizado correctamente.",
        user: user,
      });
    
  } catch (error) {
    return res.status(500).json({
      mesagge: "Error interno del servidor.",
      error
    });
  }; 
};
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({
        mesagge: "Usuario no encontrado",
      });
    }
    await user.destroy();

    return res.status(200).json({
      mesagge: "Usuario eliminado correctamente.",
      user: user,
    });
  } catch (error) {
    res.status(500).json({   
      mesagge: "Error interno del servidor", 
      error
    });
  }
};