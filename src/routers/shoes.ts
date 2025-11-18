import express from "express";
import type { Router } from "express";
import {
  addShoes,
  deleteShoes,
  getAllShoes,
  updateShoes,
} from "../controllers/shoes";
import {
  addShoesInputs,
  deleteShoesInputs,
  updateShoesInputs,
} from "../validators/shoes";
import checkErrors from "../validators/checkErrors";

const router: Router = express.Router();

router.get("/", getAllShoes);
router.put("/", addShoesInputs, checkErrors, addShoes);
router.patch("/:id", updateShoesInputs, checkErrors, updateShoes);
router.delete("/:id", deleteShoesInputs, checkErrors, deleteShoes);

export default router;
