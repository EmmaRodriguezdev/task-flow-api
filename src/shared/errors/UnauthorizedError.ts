import { BaseError } from "./BaseError";
import { HttpStatusCodes } from "../utils/httpStatusCodes";

export class UnauthorizedError extends BaseError {
    constructor(message: string, statusCode: HttpStatusCodes) {
        super(message, statusCode)
    }
}