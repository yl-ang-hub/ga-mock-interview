import * as BrandsModel from "../models/brands";
import * as ShoesModel from "../models/shoes";
import * as InventoryModel from "../models/inventory";
import {
  DuplicateBrandError,
  ExistingDataInShoesDatabaseError,
  IDNotFoundError,
} from "../errors/CustomErrors";

export const createBrand = async (name: string): Promise<void> => {
  const brandExists = await BrandsModel.findByName(name);
  if (brandExists) throw new DuplicateBrandError();

  return BrandsModel.addOneBrand(name);
};

export const updateBrand = async (id: number, name: string): Promise<void> => {
  const idExists = await BrandsModel.findById(id);
  if (!idExists) throw new IDNotFoundError();

  const brandExists = await BrandsModel.findByName(name);
  if (brandExists) throw new DuplicateBrandError();

  return BrandsModel.updateOneBrand(name, id);
};

export const deleteBrand = async (id: number): Promise<void> => {
  const idExists = await BrandsModel.findById(id);
  if (!idExists) throw new IDNotFoundError();

  const shoes = await ShoesModel.findByBrandId(id);
  if (shoes.length > 0) throw new ExistingDataInShoesDatabaseError();

  return BrandsModel.deleteOneBrand(id);
};
