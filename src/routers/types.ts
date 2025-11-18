import express from "express";
import type { Router } from "express";
import {
  getAllShoeTypes,
  addOneShoeType,
  updateOneShoeType,
  deleteOneShoeType,
} from "../controllers/types";
import {
  addShoeTypeInputs,
  deleteShoeTypeInputs,
  updateShoeTypeInputs,
} from "../validators/types";
import checkErrors from "../validators/checkErrors";

const router: Router = express.Router();

router.get("/", getAllShoeTypes);
router.put("/", addShoeTypeInputs, checkErrors, addOneShoeType);
router.patch("/:id", updateShoeTypeInputs, checkErrors, updateOneShoeType);
router.delete("/:id", deleteShoeTypeInputs, checkErrors, deleteOneShoeType);

export default router;
