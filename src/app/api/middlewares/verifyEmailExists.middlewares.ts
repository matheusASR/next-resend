import { NextFunction, Request, Response } from "express";
import { Email } from "../entities/index.ts";
import { emailRepository } from "../repositories/index.ts";
import { AppError } from "../App.error.ts";

export const verifyEmailExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const id: number = Number(req.params.id);

  const foundEmail: Email | null = await emailRepository.findOneBy({ id });
  if (!foundEmail) throw new AppError("Email não encontrado!", 404);

  return next();
};