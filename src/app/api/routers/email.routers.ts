import { Router } from "express";
import middlewares from "../middlewares";
import { emailControllers } from "../controllers";

export const emailRouter: Router = Router();

emailRouter.use("/:id", middlewares.verifyEmailExists);

emailRouter.post("", emailControllers.create);

emailRouter.get("", emailControllers.read);

emailRouter.get("/:id", emailControllers.retrieve);

emailRouter.patch("/:id", emailControllers.update);

emailRouter.delete("/:id", emailControllers.destroy);