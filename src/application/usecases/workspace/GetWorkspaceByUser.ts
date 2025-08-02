import { Workspace } from "@/domain/entities/Workspace";
import { WorkspaceRepository } from "@/domain/repositories/WorkspaceRepository";

export class GetWorkspacesByUser {
    constructor(private workspaceRepository: WorkspaceRepository) { }

    async execute(userId: number): Promise<Workspace[] | null> {
        return await this.workspaceRepository.getWorkspacesByUser(userId)
    }
}