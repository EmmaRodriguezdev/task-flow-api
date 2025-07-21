import { HttpStatusCodes } from "../utils/httpStatusCodes";
import { BaseError } from "./BaseError";

export class ConflictError extends BaseError {
    constructor(message = 'Conflict value', statusCode = HttpStatusCodes.CONFLICT_ERROR) {
        super(message, statusCode)
    }
}