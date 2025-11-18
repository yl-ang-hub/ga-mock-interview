import type { Request, Response } from "express";
import * as TypesModel from "../models/types";
import * as TypesService from "../services/types";
import { AppError } from "../errors/AppError";

export const getAllShoeTypes = async (
  req: Request,
  res: Response
): Promise<Response<TypesModel.ShoeType[] | void>> => {
  try {
    const types = await TypesModel.getAllShoeTypes();
    return res.json(types);
  } catch (e: any) {
    return res
      .status(500)
      .json({ status: "error", msg: "Internal server error" });
  }
};

export const addOneShoeType = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    await TypesService.createType(req.body.type);

    return res.json({ status: "ok", msg: "Type added to database." });
  } catch (e: any) {
    if (e instanceof AppError) {
      return res.status(e.statusCode).json({ status: "error", msg: e.message });
    }

    return res
      .status(500)
      .json({ status: "error", msg: "Internal server error" });
  }
};

export const updateOneShoeType = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    await TypesService.updateType(Number(req.params.id), req.body.type);

    return res.json({
      status: "ok",
      msg: `Shoe type ID ${req.params.id} is updated to ${req.body.type}`,
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

export const deleteOneShoeType = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    await TypesService.deleteType(Number(req.params.id));

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
