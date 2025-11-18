import express, { type Router } from "express";
import {
  addInventory,
  deleteInventory,
  getAllInventory,
  updateQuantity,
} from "../controllers/inventory";
import {
  deleteInventoryInputs,
  inventoryInputs,
} from "../validators/inventory";
import checkErrors from "../validators/checkErrors";

const router: Router = express.Router();

router.get("/", getAllInventory);
router.put("/", inventoryInputs, checkErrors, addInventory);
router.patch("/", inventoryInputs, checkErrors, updateQuantity);
router.delete(
  "/:shoes_id",
  deleteInventoryInputs,
  checkErrors,
  deleteInventory
);

export default router;
