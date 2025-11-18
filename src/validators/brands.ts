import { body, param, type ValidationChain } from "express-validator";

export const addBrandInputs: ValidationChain[] = [
  body("brand", "brand is required").notEmpty(),
  body("brand", "brand must be between 1 to 50 characters").isLength({
    min: 1,
    max: 50,
  }),
];

export const updateBrandInputs: ValidationChain[] = [
  body("brand", "brand must be between 1 to 50 characters").isLength({
    min: 1,
    max: 50,
  }),
  param("id", "ID is required").not().isEmpty(),
  param("id", "ID must be an int").isInt(),
];

export const deleteBrandInputs: ValidationChain[] = [
  param("id", "ID is required").not().isEmpty(),
  param("id", "ID must be an int").isInt(),
];
