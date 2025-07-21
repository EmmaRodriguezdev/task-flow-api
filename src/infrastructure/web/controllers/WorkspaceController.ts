import { GetWorkspacesByUser } from "@/application/usecases/workspace/GetWorkspaceByUser";
import { WorkspaceRepository } from "@/domain/repositories/WorkspaceRepository";
import { HttpStatusCodes } from "@/shared/utils/httpStatusCodes";
import { NextFunction, Request, Response } from "express";

export class WorkspaceController {
    constructor(private workspaceRepository: WorkspaceRepository) { }

    async getWorkspacesByUser(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.params['userId'] as string;
            const getWorkspacesByUserUseCase = new GetWorkspacesByUser(this.workspaceRepository);
            const workspaces = await getWorkspacesByUserUseCase.execute(parseInt(userId))
            res.status(HttpStatusCodes.OK).json(workspaces)
        } catch(error) {
            next(error)
        }
    }
}