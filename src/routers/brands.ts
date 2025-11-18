import express from "express";
import type { Router } from "express";
import {
  getAllBrands,
  addOneBrand,
  updateOneBrand,
  deleteOneBrand,
} from "../controllers/brands";
import {
  addBrandInputs,
  updateBrandInputs,
  deleteBrandInputs,
} from "../validators/brands";
import checkErrors from "../validators/checkErrors";

const router: Router = express.Router();

router.get("/", getAllBrands);
router.put("/", addBrandInputs, checkErrors, addOneBrand);
router.patch("/:id", updateBrandInputs, checkErrors, updateOneBrand);
router.delete("/:id", deleteBrandInputs, checkErrors, deleteOneBrand);

export default router;
