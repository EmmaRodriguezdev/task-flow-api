import { Task } from "./tasks.model";
import { Workspace } from "../../modules/workspaces/models/workspace.model";
import { User } from "../../modules/users/users.model";
import { UserService } from "../users/users.service";
import { TasksAttributes } from "./tasks.interface";
import {  WorkspacesService} from '../workspaces/workspaces.service'

export class TaskService {
  private taskModel = Task;
  private workspaceModel = Workspace;
  private userModel = User;
  constructor(
    private userService = new UserService(),
    private workspacesService = new WorkspacesService()
  ) {}

  async findOneById(id: number) {
    return await this.taskModel.findByPk(id);
  }

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

  async createTask(taskData: TasksAttributes, email: string) {
    const user = await this.userService.getUserByEmail(email);
    if (!user) {
      throw new Error("User not found");
    }

    const workspace = await this.workspacesService.findOneById(taskData.workspaceId);
    if (!workspace) {
      throw new Error("Workspace not found");
    }

    if (taskData.parentId) {
      const parentTask = await this.findOneById(taskData.parentId);
      if (!parentTask) {
        throw new Error("Parent task not found");
      }
    }

    return await this.taskModel.create({
      ...taskData,
      createdBy: user.id,
      assignedTo: taskData.assignedTo || null,
      parentId: taskData.parentId || null,
    });
  }
}
