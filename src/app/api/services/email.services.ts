/* eslint-disable import/no-anonymous-default-export */
import { EmailCreate, IEmail } from "../interfaces/index.ts";
import { emailRepository } from "../repositories/index.ts";
import { emailSchema } from "../schemas/index.ts";
import { DeepPartial } from "typeorm";
import { Email } from "../entities/index.ts";

const create = async (payload: any): Promise<IEmail> => {
  const emailCreated: any = emailRepository.create(payload);
  await emailRepository.save(emailCreated);

  return emailSchema.parse(emailCreated);
};

const read = async (): Promise<any> => {
  const emails: any = await emailRepository.find();

  if (emails.length === 0) {
    return []
  }

  return emails;
};

const retrieve = async (id: number): Promise<IEmail> => {
  const email: any = await emailRepository.findOne({
    where: { id },
  });
  return emailSchema.parse(email);
};

const update = async (
  foundemail: any,
  payload: DeepPartial<IEmail>
): Promise<any> => {
  return emailSchema.parse(
    await emailRepository.save({ ...foundemail, ...payload })
  );
};

const destroy = async (email: Email): Promise<void> => {
  await emailRepository.remove(email);
};

export default { create, read, retrieve, update, destroy };