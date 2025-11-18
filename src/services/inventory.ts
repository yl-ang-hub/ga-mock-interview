import type {
  DeleteInventoryParams,
  InventoryParams,
} from "../controllers/inventory";
import {
  DuplicateInventoryError,
  IDNotFoundError,
  InventoryNotFoundError,
  NoDetectedChangeError,
} from "../errors/CustomErrors";
import * as InventoryModel from "../models/inventory";
import * as ShoesModel from "../models/shoes";

export const addInventory = async (params: InventoryParams): Promise<void> => {
  const { shoes_id, colour, size, quantity } = params;

  const shoesIdExists = await ShoesModel.findById(shoes_id);
  if (!shoesIdExists) throw new IDNotFoundError();

  const duplicate = await InventoryModel.findByAllParams(
    shoes_id,
    colour,
    size
  );
  if (duplicate) throw new DuplicateInventoryError();

  await InventoryModel.addItem(shoes_id, colour, size, quantity);
};

export const updateQuantity = async (
  params: InventoryParams
): Promise<InventoryModel.InventoryType> => {
  const { shoes_id, colour, size, quantity } = params;

  const currentInventory = await InventoryModel.findByAllParams(
    shoes_id,
    colour,
    size
  );
  if (!currentInventory) throw new InventoryNotFoundError();
  if (currentInventory.quantity === quantity) throw new NoDetectedChangeError();

  return await InventoryModel.updateQuantity(shoes_id, colour, size, quantity);
};

export const deleteInventory = async (
  params: DeleteInventoryParams
): Promise<void> => {
  const { shoes_id, colour, size } = params;

  const inventoryExists = await InventoryModel.findByAllParams(
    shoes_id,
    colour,
    size
  );
  if (!inventoryExists) throw new InventoryNotFoundError();

  await InventoryModel.deleteItem(shoes_id, colour, size);
};
