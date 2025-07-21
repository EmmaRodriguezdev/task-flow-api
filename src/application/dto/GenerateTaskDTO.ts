import { ValidationError } from "@/shared/errors/ValidationError";
import { HttpStatusCodes } from "@/shared/utils/httpStatusCodes";

export class GenerateTaskDTO {
    context: string;
    constructor(data: { context: string }) {
        this.context = data.context
    }
    static fromRequest(body: { context: string }): GenerateTaskDTO {
        if(!body.context) {
            throw new ValidationError(
                'El contexto es requerido',
                HttpStatusCodes.BAD_REQUEST
            )
        }

        return new GenerateTaskDTO({
            context: body.context
        })
    }
}