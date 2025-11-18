import type { Request, Response } from "express";
import * as BrandsModel from "../models/brands";
import * as BrandsService from "../services/brands";
import { AppError } from "../errors/AppError";

export const getAllBrands = async (
  req: Request,
  res: Response
): Promise<Response<BrandsModel.BrandType[] | void>> => {
  try {
    const brands = await BrandsModel.getAllBrands();
    return res.json(brands);
  } catch (e: any) {
    console.error(e.message);
    return res
      .status(500)
      .json({ status: "error", msg: "Internal server error" });
  }
};

export const addOneBrand = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    await BrandsService.createBrand(req.body.brand);

    return res.json({ status: "ok", msg: "Brand added to database." });
  } catch (e: any) {
    if (e instanceof AppError) {
      return res.status(e.statusCode).json({ status: "error", msg: e.message });
    }

    return res
      .status(500)
      .json({ status: "error", msg: "Internal server error" });
  }
};

export const updateOneBrand = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    await BrandsService.updateBrand(Number(req.params.id), req.body.brand);

    return res.json({
      status: "ok",
      msg: `Brand ID ${req.params.id} is updated to ${req.body.brand}`,
    });
  } catch (e: any) {
    if (e instanceof AppError) {
      return res.status(e.statusCode).json({ status: "error", msg: e.message });
    }

    return res
      .status(500)
      .json({ status: "error", msg: "Internal server error" });
  }
};

export const deleteOneBrand = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    await BrandsService.deleteBrand(Number(req.params.id));

    return res.json({
      status: "ok",
      msg: `Successfully deleted ${req.params.id}`,
    });
  } catch (e: any) {
    if (e instanceof AppError) {
      return res.status(e.statusCode).json({ status: "error", msg: e.message });
    }

    return res
      .status(500)
      .json({ status: "error", msg: "Internal server error" });
  }
};
