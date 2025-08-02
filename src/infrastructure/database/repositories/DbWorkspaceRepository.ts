import { Workspace } from "@/domain/entities/Workspace";
import { WorkspaceRepository } from "@/domain/repositories/WorkspaceRepository";
import { WorkspaceModel } from "../models/workspace.model";
import { WorkspaceSerializer } from "@/infrastructure/web/serializers/WorkspaceSerializer";
import { UserModel } from "../models/users.model";

export class DbWorkspaceRepository extends WorkspaceRepository {
  override async getWorkspacesByUser(userId: number): Promise<Workspace[] | null> {
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
  override async getWorkspaceById(id: number): Promise<Workspace | null> {
      const workspace = await WorkspaceModel.findByPk(id)

      return WorkspaceSerializer.toDomain(workspace)
  }
}
