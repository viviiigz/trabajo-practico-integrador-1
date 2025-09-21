import { body, param} from "express-validator"
import { User } from "../../models/user.model.js"

export const createUserValidator = [
  body("username")
    .notEmpty()
    .withMessage("El nombre de usuario es obligatorio.")
    .isString()
    .withMessage("El nombre de usuario debe ser una cadena de texto.")
    .isLength({ min: 3, max: 20 })
    .withMessage("El nombre de usuario debe tener entre 3 y 20 caracteres.")
    .trim()
    .custom(async (value) => {
      const user = await User.findOne({ where: { username: value } });
      if (user) {
        throw new Error("El nombre de usuario ya está en uso.");
      }
      return true;
    }),
  body("email")
    .notEmpty()
    .withMessage("El correo electrónico es obligatorio.")
    .isEmail()
    .withMessage("Su correo electrónico no es válido.")
    .normalizeEmail()
    .custom(async (value) => {
      const user = await User.findOne({ where: { email: value } });
      if (user) {
        throw new Error("El correo electrónico ya está registrado.");
      }
      return true;
    }),
  body("password")
    .notEmpty()
    .withMessage("La contraseña es obligatoria.")
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener al menos 8 caracteres."),
  body("role")
    .optional()
    .notEmpty()
    .withMessage("El rol no puede estar vacío.")
    .isIn(["user", "admin"])
    .withMessage(
      "El rol especificado no es válido. Debe ser 'user' o 'admin'."
    ),
];

export const updateUserValidator = [
  param("id")
    .isInt({ gt: 0 })
    .withMessage("El id del usuario debe ser un entero positivo.")
    .custom(async (value) => {
      const user = await User.findByPk(value);
      if (!user) {
        throw new Error("Usuario inexistente");
      }
      return true;
    }),
  body("username")
    .optional()
    .isString()
    .withMessage("El nombre de usuario debe ser una cadena de texto.")
    .isLength({ min: 3, max: 20 })
    .withMessage("El nombre de usuario debe tener entre 3 y 20 caracteres.")
    .trim()
    .custom(async (value, { req }) => {
      const user = await User.findOne({ where: { username: value } });
      if (user && user.id !== parseInt(req.params.id)) {
        throw new Error(
          "El nombre de usuario ya está en uso."
        );
      }
      return true;
    }),
  body("email")
    .optional()
    .isEmail()
    .withMessage("Su correo electrónico no es válido.")
    .normalizeEmail()
    .custom(async (value, { req }) => {
      const user = await User.findOne({ where: { email: value } });
      if (user && user.id !== parseInt(req.params.id)) {
        throw new Error(
          "El correo electrónico ya está en uso."
        )
      }
      return true;
    }),

  body("password")
    .optional()
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener al menos 8 caracteres."),
  body("role")
    .optional()
    .notEmpty()
    .withMessage("El rol no puede estar vacío.")
    .isIn(["user", "admin"])
    .withMessage("El rol especificado no es válido."),
];