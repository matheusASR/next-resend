/* eslint-disable import/no-anonymous-default-export */
import { Request, Response } from "express";
import { emailServices } from "../services";
import { EmailCreate, IEmail } from "../interfaces";
import { DeepPartial } from "typeorm";
import { emailRepository } from "../repositories";

const create = async (req: Request, res: Response): Promise<Response> => {
  const payload: EmailCreate = req.body
  const email: IEmail = await emailServices.create(payload);
  return res.status(201).json(email);
};

const read = async (req: Request, res: Response): Promise<Response> => {
  const emails: IEmail[] = await emailServices.read();
  return res.status(200).json(emails);
};

const retrieve = async (req: Request, res: Response): Promise<Response> => {
  const id: number = Number(req.params.id);
  const email: IEmail = await emailServices.retrieve(id);
  return res.status(200).json(email);
};

const update = async (req: Request, res: Response): Promise<Response> => {
  const id: number = Number(req.params.id);
  const payload: DeepPartial<IEmail> = req.body;
  const foundEmail: any = await emailRepository.findOne({ where: { id } });
  const emailUpdated: IEmail = await emailServices.update(foundEmail, payload);

  return res.status(200).json(emailUpdated);
};

const destroy = async (req: Request, res: Response): Promise<Response> => {
  const id: number = Number(req.params.id);
  const foundEmail: any = await emailRepository.findOne({ where: { id } });
  await emailServices.destroy(foundEmail);
  return res.status(204).json();
};


export default { create, read, retrieve, update, destroy };