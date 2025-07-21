export class BaseError extends Error {
    statusCode: number;
    constructor(message: string, statusCode: number) {
        super(message)

        Object.setPrototypeOf(this, new.target.prototype)
        this.name = this.constructor.name;
        this.statusCode = statusCode;
        Error.captureStackTrace(this)
    }
}