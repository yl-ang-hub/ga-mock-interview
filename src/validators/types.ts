import { body, param, type ValidationChain } from "express-validator";

export const addShoeTypeInputs: ValidationChain[] = [
  body("type", "type is required").notEmpty(),
  body("type", "type must be between 1 to 50 characters").isLength({
    min: 1,
    max: 50,
  }),
];

export const updateShoeTypeInputs: ValidationChain[] = [
  body("type", "type must be between 1 to 50 characters").isLength({
    min: 1,
    max: 50,
  }),
  param("id", "ID is required").not().isEmpty(),
  param("id", "ID must be an int").isInt(),
];

export const deleteShoeTypeInputs: ValidationChain[] = [
  param("id", "ID is required").not().isEmpty(),
  param("id", "ID must be an int").isInt(),
];
