import { z } from "zod";

// Schema para a entidade completa
const emailSchema = z.object({
  id: z.number().positive(),
  campaignName: z.string().max(100).optional(),
  type: z.string().max(50).optional(),
  sender: z.string().max(100).optional(),
  subject: z.string().max(150).optional(),
  body: z.string().optional(),
  dateDay: z.number().min(1).max(31).optional(),
  dateMonth: z.number().min(1).max(12).optional(),
  dateYear: z.number().positive().optional(),
  timeHour: z.number().min(0).max(23).optional(),
  timeMinute: z.number().min(0).max(59).optional(),
  receivers: z.array(z.string()).optional(),
});

// Schema para criação, omitindo o campo "id"
const emailCreateSchema = emailSchema.omit({ id: true });

export {
  emailSchema,
  emailCreateSchema,
};
