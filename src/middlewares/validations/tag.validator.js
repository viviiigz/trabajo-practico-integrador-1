import {body, param} from 'express-validator'
import { Tag } from  '../../models/tag.model.js'

export const validateTagIdInParams = [
  param('id')
    .isInt({ min: 1 }).withMessage('El ID de la etiqueta debe ser un número entero y positivo.')
    .custom(async (value, { req }) => {
      const tag = await Tag.findByPk(value);
      if (!tag) {
        throw new Error('La etiqueta con el ID especificado no existe.');
      }
    }),
];

export const createTagValidator = [
  body('name')
    .notEmpty().withMessage('El nombre de la etiqueta es obligatorio.')
    .isString().withMessage('El nombre debe ser un texto.')
    .trim()
    .isLength({ min: 2, max: 30 }).withMessage('El nombre debe tener entre 2 y 30 caracteres.')
    .not().contains(' ').withMessage('El nombre no puede contener espacios.'),
  body('name').custom(async (value) => {
    const tag = await Tag.findOne({ where: { name: value } });
    if (tag) {
      throw new Error('El nombre de la etiqueta ya existe.');
    }
  }),
];

export const updateTagValidator= [
    param("id")
        .isInt().withMessage("El ID debe ser un número entero.")
        .custom(async (value) => {
            const tag = await Tag.findByPk(value);
            if (!tag) {
                throw new Error("La etiqueta no existe.");
            }
        }),
    body("name")
        .optional()
        .notEmpty().withMessage("El nombre no puede estar vacío.")
        .isLength({ min: 2, max: 30 }).withMessage("El nombre debe tener entre 2 y 30 caracteres.")
        .custom(async (value, { req }) => {
            const tag = await Tag.findOne({ where: { name: value } });
            if (tag && tag.id !== parseInt(req.params.id)) {
                throw new Error("El nombre de la etiqueta ya existe.");
            }
        }),
];
