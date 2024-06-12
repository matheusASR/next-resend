import { z } from "zod";
import {
    emailSchema, emailCreateSchema
} from "../schemas/index.ts";
import { Repository } from "typeorm";
import { Email } from "../entities/index.ts";

type IEmail = z.infer<typeof emailSchema>;
type EmailCreate = z.infer<typeof emailCreateSchema>

type EmailRepo = Repository<Email>;

export type { IEmail, EmailCreate, EmailRepo };