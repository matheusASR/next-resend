/* eslint-disable import/no-anonymous-default-export */
import { handleError } from "./handleError.middlewares.ts";
import { verifyEmailExists } from "./verifyEmailExists.middlewares.ts";
import { validateBody } from "./validateBody.middlewares.ts";

export default {
    handleError,
    verifyEmailExists,
    validateBody
}