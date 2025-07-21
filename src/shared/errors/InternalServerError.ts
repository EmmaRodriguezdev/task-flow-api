import { HttpStatusCodes } from "../utils/httpStatusCodes";
import { BaseError } from "./BaseError";

export class InternalServerError extends BaseError {
    constructor(message = 'Internal Server Error', statusCode = HttpStatusCodes.INTERNAL_SERVER_ERROR) {
        super(message, statusCode)
    }
}