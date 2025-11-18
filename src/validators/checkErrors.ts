import { validationResult } from "express-validator";
import type { Request, Response, NextFunction } from "express";

const checkErrors = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } else {
    next();
  }
};

export default checkErrors;
