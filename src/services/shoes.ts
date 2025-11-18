import {
  DuplicateShoesError,
  ExistingDataInInventoryDatabaseError,
  IDNotFoundError,
  MissingBrandError,
  MissingTypeError,
  NoDetectedChangeError,
} from "../errors/CustomErrors";
import {
  type AddShoesParams,
  type UpdateShoesParams,
} from "../controllers/shoes";
import * as ShoesModel from "../models/shoes";
import * as TypesModel from "../models/types";
import * as BrandsModel from "../models/brands";
import * as InventoryModel from "../models/inventory";

export const addShoes = async (params: AddShoesParams): Promise<void> => {
  const { type, brand, model } = params;

  const shoesExists = await ShoesModel.findByAllParams(type, brand, model);
  if (shoesExists) throw new DuplicateShoesError();

  const typeRecord = await TypesModel.findByName(type);
  if (!typeRecord) throw new MissingTypeError();

  const brandRecord = await BrandsModel.findByName(brand);
  if (!brandRecord) throw new MissingBrandError();

  await ShoesModel.addShoes(typeRecord.type_id, brandRecord.brand_id, model);
};

export const updateShoes = async (
  params: UpdateShoesParams
): Promise<ShoesModel.ShoesType> => {
  const { id, type, brand, model } = params;

  const shoes = await ShoesModel.findById(id);
  if (!shoes) throw new IDNotFoundError();

  if (
    shoes.type?.toLowerCase() === type.toLowerCase() &&
    shoes.brand?.toLowerCase() === brand.toLowerCase() &&
    shoes.model.toLowerCase() === model.toLowerCase()
  )
    throw new NoDetectedChangeError();

  let type_id = shoes.type_id;
  let brand_id = shoes.brand_id;

  if (shoes.type?.toLowerCase() !== type.toLowerCase()) {
    const typeRecord = await TypesModel.findByName(type);
    if (!typeRecord) throw new MissingTypeError();

    type_id = typeRecord.type_id;
  }

  if (shoes.brand?.toLowerCase() !== brand.toLowerCase()) {
    const brandRecord = await BrandsModel.findByName(brand);
    if (!brandRecord) throw new MissingBrandError();

    brand_id = brandRecord.brand_id;
  }

  return await ShoesModel.updateShoes(id, type_id, brand_id, model);
};

export const deleteShoes = async (id: number): Promise<void> => {
  const shoes = await ShoesModel.findById(id);
  if (!shoes) throw new IDNotFoundError();

  const inventory = await InventoryModel.findByShoesId(id);
  if (inventory.length > 0) throw new ExistingDataInInventoryDatabaseError();

  await ShoesModel.deleteShoes(id);
};
