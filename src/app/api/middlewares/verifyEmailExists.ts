import { NextFunction, Request, Response } from "express";
import { Email } from "../entities";
import { emailRepository } from "../repositories";
import { AppError } from "../App.error";

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