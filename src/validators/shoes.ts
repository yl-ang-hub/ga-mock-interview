import { body, param, type ValidationChain } from "express-validator";

export const addShoesInputs: ValidationChain[] = [
  body("type", "type is required").notEmpty(),
  body("type", "type must be between 1 to 50 characters").isLength({
    min: 1,
    max: 50,
  }),
  body("brand", "brand is required").notEmpty(),
  body("brand", "brand must be between 1 to 50 characters").isLength({
    min: 1,
    max: 50,
  }),
  body("model", "model is required").notEmpty(),
  body("model", "model must be between 1 to 50 characters").isLength({
    min: 1,
    max: 50,
  }),
];

export const updateShoesInputs: ValidationChain[] = [
  param("id", "id is required").notEmpty(),
  param("id", "id must be an integer").isInt(),
  body("type", "type is required").notEmpty(),
  body("type", "type must be between 1 to 50 characters").isLength({
    min: 1,
    max: 50,
  }),
  body("brand", "brand is required").notEmpty(),
  body("brand", "brand must be between 1 to 50 characters").isLength({
    min: 1,
    max: 50,
  }),
  body("model", "model is required").notEmpty(),
  body("model", "model must be between 1 to 50 characters").isLength({
    min: 1,
    max: 50,
  }),
];

export const deleteShoesInputs: ValidationChain[] = [
  param("id", "id is required").notEmpty(),
  param("id", "id must be an integer").isInt(),
];
