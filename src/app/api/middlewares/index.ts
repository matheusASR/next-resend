/* eslint-disable import/no-anonymous-default-export */
import { handleError } from "./handleError.middlewares.ts";
import { verifyEmailExists } from "./verifyEmailExists.middlewares.ts";

export default {
    handleError,
    verifyEmailExists
}