import { Workspace } from "./models/workspace.model";
import { User } from "../users/users.model";
import { UserService } from "../users/users.service";

export class WorkspacesService {
  private workspaceModel = Workspace;
  private usersModel = User;
  private userService = new UserService();
  constructor() {}

  async getAllByUserId(userId: number) {
    await this.userService.getUserById(userId);

    return await this.usersModel.findByPk(userId, {
      include: [
        {
          model: this.workspaceModel,
          as: "workspaces",
          through: { attributes: [] },
        },
      ],
    });
  }

  async findOneById(id: number) {
    return await this.workspaceModel.findByPk(id);
  }
}
