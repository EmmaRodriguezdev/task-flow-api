import { HttpStatusCodes } from "../utils/httpStatusCodes";
import { BaseError } from "./BaseError";

export class ValidationError extends BaseError {
    constructor(message = 'Missing data', stausCode = HttpStatusCodes.BAD_REQUEST) {
        super(message, stausCode)
    }
}