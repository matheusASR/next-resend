/* eslint-disable import/no-anonymous-default-export */
import { IEmail } from "../interfaces/index.ts";
import { emailRepository } from "../repositories/index.ts";
import { emailSchema } from "../schemas/index.ts";
import { DeepPartial } from "typeorm";
import { Email } from "../entities/index.ts";
import { Resend } from "resend";
import 'dotenv/config';

const create = async (payload: any): Promise<IEmail> => {
  const receivers = payload.receivers
  const emails_receivers = receivers.map((receiver: any) => receiver.email);

  const resend = new Resend(process.env.RESEND_API_KEY)

  if (payload.sender.length === 0) {
    payload.sender = "rstcom@rstcom.com.br"
  }

  const { data, error } = await resend.emails.send({
    from: `Acme <onboarding@resend.dev>`,
    to: emails_receivers,
    subject: payload.subject,
    html: "<strong>it works!</strong>",
  });

  if (error) {
    console.log(error);
  }
  console.log(data)
  
  const emailCreated = emailRepository.create(payload);
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