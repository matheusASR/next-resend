import { z } from "zod";

const receiverSchema = z.object({
  name: z.string(),
  email: z.string().email(),
});

// Schema para a entidade completa
const emailSchema = z.object({
  id: z.number().positive(),
  campaign_name: z.string().max(100).optional(),
  type: z.string().max(50).optional(),
  sender: z.string().max(100).optional(),
  subject: z.string().max(150).optional(),
  body: z.string().optional(),
  date_day: z.string().max(2).optional(),
  date_month: z.string().max(2).optional(),
  date_year: z.string().max(2).optional(),
  time_hour: z.string().max(2).optional(),
  time_minute: z.string().max(2).optional(),
  receivers: z.array(receiverSchema).optional(),
});

// Schema para criação, omitindo o campo "id"
const emailCreateSchema = emailSchema.omit({ id: true });

export {
  emailSchema,
  emailCreateSchema,
};
