import { Workspace } from "@/domain/entities/Workspace";
import { WorkspaceRepository } from "@/domain/repositories/WorkspaceRepository";
import { WorkspaceModel } from "../models/workspace.model";
import { WorkspaceSerializer } from "@/infrastructure/web/serializers/WorkspaceSerializer";
import { UserModel } from "../models/users.model";

export class DbWorkspaceRepository extends WorkspaceRepository {
  override async getWorkspacesByUser(userId: number): Promise<Workspace[]> {
    const workspaces = await WorkspaceModel.findAll({
      include: [
        {
          model: UserModel,
          as: "users",
          where: { id: userId },
          through: { attributes: [] }
        },
      ],
    });
    return WorkspaceSerializer.toDomainList(workspaces);
  }
}
