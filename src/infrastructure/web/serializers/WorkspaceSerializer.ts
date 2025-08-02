import { Workspace } from "@/domain/entities/Workspace";
import { WorkspaceModel } from "@/infrastructure/database/models/workspace.model";

export class WorkspaceSerializer {
  static toDomain(model: WorkspaceModel | null): Workspace | null {
    if (!model) return null;
    return new Workspace(
      model.id,
      model.ownerId,
      model.name,
      model.createdAt,
      model.updatedAt,
      model.users
    );
  }
  static toDomainList(models: WorkspaceModel[] | null): Workspace[] {
    if (!models) return [];
    return models
      .map(WorkspaceSerializer.toDomain)
      .filter((ws): ws is Workspace => ws !== null);
  }
}
