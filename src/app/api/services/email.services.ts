/* eslint-disable import/no-anonymous-default-export */
import { EmailCreate, IEmail } from "../interfaces";
import { emailRepository } from "../repositories";
import { emailSchema } from "../schemas";
import { DeepPartial } from "typeorm";
import { Email } from "../entities";

const create = async (payload: EmailCreate): Promise<IEmail> => {
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
  foundemail: IEmail | null,
  payload: DeepPartial<IEmail>
): Promise<IEmail> => {
  return emailSchema.parse(
    await emailRepository.save({ ...foundemail, ...payload })
  );
};

const destroy = async (email: Email): Promise<void> => {
  await emailRepository.remove(email);
};

export default { create, read, retrieve, update, destroy };