import type { Request, Response } from "express";
import * as ShoesModel from "../models/shoes";
import * as ShoesService from "../services/shoes";
import { AppError } from "../errors/AppError";

export interface AddShoesParams {
  type: string;
  brand: string;
  model: string;
}

export interface UpdateShoesParams {
  id: number;
  type: string;
  brand: string;
  model: string;
}

export const getAllShoes = async (
  req: Request,
  res: Response
): Promise<Response<ShoesModel.ShoesType[] | void>> => {
  try {
    const result = await ShoesModel.getAllShoes();
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

export const addShoes = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const params: AddShoesParams = {
      type: req.body.type,
      brand: req.body.brand,
      model: req.body.model,
    };

    await ShoesService.addShoes(params);

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

export const updateShoes = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const params: UpdateShoesParams = {
      id: Number(req.params.id),
      type: req.body.type,
      brand: req.body.brand,
      model: req.body.model,
    };

    const updated = await ShoesService.updateShoes(params);

    return res.json({
      status: "ok",
      msg: `Updated shoes ID ${updated.id}: ${updated.type}, ${updated.brand}, ${updated.model}`,
    });
  } catch (e: any) {
    if (e instanceof AppError) {
      return res.status(e.statusCode).json({ status: "error", msg: e.message });
    }
    console.log(e.message);
    return res
      .status(500)
      .json({ status: "error", msg: "Internal server error" });
  }
};

export const deleteShoes = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const id: number = Number(req.params.id);
    await ShoesService.deleteShoes(id);

    return res.json({ status: "ok", msg: `Successfully deleted` });
  } catch (e: any) {
    if (e instanceof AppError) {
      return res.status(e.statusCode).json({ status: "error", msg: e.message });
    }

    return res
      .status(500)
      .json({ status: "error", msg: "Internal server error" });
  }
};
