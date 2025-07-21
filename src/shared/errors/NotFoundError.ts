import { HttpStatusCodes } from "../utils/httpStatusCodes";
import { BaseError } from "./BaseError";

export class NotFoundError extends BaseError {
    constructor(message: string, statusCode: HttpStatusCodes) {
        super(message, statusCode)
    }
}