import { Task } from "./tasks.model";
import { Workspace } from "../../modules/workspaces/models/workspace.model";
import { User } from "../../modules/users/users.model";
import { UserService } from "../users/users.service";
import { SuccessMessage, TasksAttributes } from "./tasks.interface";
import {  WorkspacesService} from '../workspaces/workspaces.service'
import { TaskStatus } from "./enum";

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

  async getTasksOrderByWorkspace(workspaceId: number) {
    const tasks = await this.taskModel.findAll({
      where: { workspaceId },
      include: [
        {
          model: this.userModel,
          as: "creator",
        },
        {
          model: this.userModel,
          as: "assignee",
        },
      ],
    });

    const statusArray = Object.values(TaskStatus).map(status => ({
      [status.toLowerCase()]: tasks.filter(task => task.status === status)
    })).reduce((acc, curr) => {
      acc[Object.keys(curr)[0]] = curr[Object.keys(curr)[0]];
      return acc;
    }, {});
    return statusArray;   
  }

  async changeTaskStatus(taskId: number, status: TaskStatus): Promise<SuccessMessage> {
    if (!Object.values(TaskStatus).includes(status)) {
      throw new Error("Invalid status value");
    }
  
    const task = await this.findOneById(taskId);
    if (!task) {
      throw new Error("Task not found");
    }
  
    await this.taskModel.update(
      { status },
      { where: { id: taskId } }
    );
  
    return {
      message: "Task status changed successfully",
      status: 200
    };
  }
  
}
