import { Workspace } from "@/domain/entities/Workspace";
import { WorkspaceModel } from "@/infrastructure/database/models/workspace.model";

export class WorkspaceSerializer {
    static toDomain(model: WorkspaceModel): Workspace {
        return new Workspace(
            model.id,
            model.ownerId,
            model.name,
            model.createdAt,
            model.updatedAt,
        )
    }
    static toDomainList(models: WorkspaceModel[]): Workspace[] {
        return models.map(WorkspaceSerializer.toDomain)
    }
}