import { Router } from "express";
import middlewares from "../middlewares/index.ts";
import { emailControllers } from "../controllers/index.ts";
import { emailCreateSchema } from "../schemas/email.schemas.ts";

export const emailRouter: Router = Router();

emailRouter.use("/:id", middlewares.verifyEmailExists);

emailRouter.post("", middlewares.validateBody(emailCreateSchema), emailControllers.create);

emailRouter.get("", emailControllers.read);

emailRouter.get("/:id", emailControllers.retrieve);

emailRouter.patch("/:id", emailControllers.update);

emailRouter.delete("/:id", emailControllers.destroy);