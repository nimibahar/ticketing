import { Request, Response, NextFunction } from "express";
import { NotAutorizedError } from "../errors/not-authorized-error";

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    throw new NotAutorizedError();
  }

  next();
};
