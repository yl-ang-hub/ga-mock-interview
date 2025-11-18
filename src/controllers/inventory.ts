import type { Request, Response } from "express";
import * as InventoryModel from "../models/inventory";
import * as InventoryService from "../services/inventory";
import { AppError } from "../errors/AppError";

export interface InventoryParams {
  shoes_id: number;
  colour: string;
  size: number;
  quantity: number;
}

export interface DeleteInventoryParams {
  shoes_id: number;
  colour: string;
  size: number;
}

export const getAllInventory = async (
  req: Request,
  res: Response
): Promise<Response<InventoryModel.InventoryType[] | void>> => {
  try {
    const result = await InventoryModel.getAllInventory();

    return res.json(result);
  } catch (e: any) {
    if (e instanceof AppError) {
      return res.status(e.statusCode).json({ status: "error", msg: e.message });
    }

    return res
      .status(500)
      .json({ status: "error", msg: "Internal server error" });
  }
};

export const addInventory = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const params: InventoryParams = {
      shoes_id: Number(req.body.shoes_id),
      colour: req.body.colour,
      size: Number(req.body.size),
      quantity: Number(req.body.quantity),
    };

    await InventoryService.addInventory(params);

    return res.json({ status: "ok", msg: "Successfully added" });
  } catch (e: any) {
    if (e instanceof AppError) {
      return res.status(e.statusCode).json({ status: "error", msg: e.message });
    }

    return res
      .status(500)
      .json({ status: "error", msg: "Internal server error" });
  }
};

export const updateQuantity = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const params: InventoryParams = {
      shoes_id: Number(req.body.shoes_id),
      colour: req.body.colour,
      size: Number(req.body.size),
      quantity: Number(req.body.quantity),
    };

    const updated = await InventoryService.updateQuantity(params);

    return res.json({
      status: "ok",
      msg: `Quantity for shoes ID ${updated.shoes_id} (${updated.colour}) of size ${updated.size} has been updated to ${updated.quantity}`,
    });
  } catch (e: any) {
    if (e instanceof AppError) {
      return res.status(e.statusCode).json({ status: "error", msg: e.message });
    }

    return res
      .status(500)
      .json({ status: "error", msg: "Internal server error", trace: e.stack });
  }
};

export const deleteInventory = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const params: DeleteInventoryParams = {
      shoes_id: Number(req.params.shoes_id),
      colour: String(req.query.colour),
      size: Number(req.query.size),
    };
    await InventoryService.deleteInventory(params);

    return res.json({ status: "ok", msg: "Successfully deleted" });
  } catch (e: any) {
    if (e instanceof AppError) {
      return res.status(e.statusCode).json({ status: "error", msg: e.message });
    }

    return res
      .status(500)
      .json({ status: "error", msg: "Internal server error", trace: e.stack });
  }
};
