import { param, body, query, type ValidationChain } from "express-validator";

export const inventoryInputs: ValidationChain[] = [
  body("shoes_id", "shoes_id is required").notEmpty(),
  body("shoes_id", "shoes_id must be an integer").isInt(),
  body("colour", "colour is required").notEmpty(),
  body("colour", "colour must be between 1 to 50 characters").isLength({
    min: 1,
    max: 50,
  }),
  body("size", "size is required").notEmpty(),
  body("size", "size must be between 0.1 - 99.9").isFloat({
    min: 0.1,
    max: 99.9,
  }),
  body(
    "size",
    "size must between 0.1 - 99.9 with max of 1 decimal place"
  ).matches(/^\d{1,2}(\.\d)?$/),
  body("quantity", "quantity is required").notEmpty(),
  body("quantity", "quantity must be an integer").isInt(),
];

export const deleteInventoryInputs: ValidationChain[] = [
  param("shoes_id", "shoes_id is required").notEmpty(),
  param("shoes_id", "shoes_id must be an integer").isInt(),
  query("colour", "colour is required").notEmpty(),
  query("colour", "colour must be between 1 to 50 characters").isLength({
    min: 1,
    max: 50,
  }),
  query("size", "size is required").notEmpty(),
  query("size", "size must be between 0.1 - 99.9").isFloat({
    min: 0.1,
    max: 99.9,
  }),
  query(
    "size",
    "size must between 0.1 - 99.9 with max of 1 decimal place"
  ).matches(/^\d{1,2}(\.\d)?$/),
];
