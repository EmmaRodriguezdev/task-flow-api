import { Task } from "./tasks.model";
import { Workspace } from "../../modules/workspaces/models/workspace.model";
import { User } from "../../modules/users/users.model";
import { UserService } from "../users/users.service";

export class TaskService {
  private taskModel = Task;
  private workspaceModel = Workspace;
  private userModel = User;
  private userService = new UserService();
  constructor() {}

  async findAllTasksAssignedToUser(userId: number) {
    await this.userService.getUserById(userId);

    return await this.taskModel.findAll({
      where: { assignedTo: userId },
      include: [
        {
          model: this.userModel,
          as: "creator",
        },
        {
          model: this.userModel,
          as: "assignee",
        },
        {
          model: this.workspaceModel,
          as: "workspace",
        },
      ],
    });
  }
}
