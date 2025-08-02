import { Workspace } from "../entities/Workspace";

export abstract class WorkspaceRepository {
    abstract getWorkspacesByUser(userId: number): Promise<Workspace[] | null>;
    abstract getWorkspaceById(id: number): Promise<Workspace | null>;
}