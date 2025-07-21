import { GenerateTaskDTO } from "@/application/dto/GenerateTaskDTO";
import { CohereAIService } from "@/infrastructure/external/CohereAIService";
import { HttpStatusCodes } from "@/shared/utils/httpStatusCodes";
import { NextFunction, Request, Response } from "express";

export class CohereAIController {
    async generateTask(req: Request, res: Response, next: NextFunction) {
        try {
            const dto = GenerateTaskDTO.fromRequest(req.body)
            const cohereAiService = new CohereAIService();
            console.log(dto.context)
            const generate = await cohereAiService.generateTask(dto.context)
            res.status(HttpStatusCodes.OK).json(generate)
        } catch(error) {
            next(error)
        }
    }
}