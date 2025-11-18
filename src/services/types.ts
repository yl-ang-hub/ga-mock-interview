import * as TypesModel from "../models/types";
import * as ShoesModel from "../models/shoes";
import {
  DuplicateTypeError,
  IDNotFoundError,
  ExistingDataInShoesDatabaseError,
} from "../errors/CustomErrors";

export const createType = async (type: string): Promise<void> => {
  const typeExists = await TypesModel.findByName(type);
  if (typeExists) throw new DuplicateTypeError();

  return TypesModel.addOneShoeType(type);
};

export const updateType = async (id: number, type: string): Promise<void> => {
  const idExists = await TypesModel.findById(id);
  if (!idExists) throw new IDNotFoundError();

  const typeExists = await TypesModel.findByName(type);
  if (typeExists) throw new DuplicateTypeError();

  return TypesModel.updateOneShoeType(type, id);
};

export const deleteType = async (id: number): Promise<void> => {
  const idExists = await TypesModel.findById(id);
  if (!idExists) throw new IDNotFoundError();

  const shoes = await ShoesModel.findByBrandId(id);
  if (shoes.length > 0) throw new ExistingDataInShoesDatabaseError();

  return TypesModel.deleteOneShoeType(id);
};
