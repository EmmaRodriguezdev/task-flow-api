import { TasksAttributes } from "./tasks.interface";
import { TaskService } from "./tasks.service";

export class TasksController {
  private taskService: TaskService;
  constructor(
  ) {
    this.taskService = new TaskService();
  }

  async findAllTasksAssignedToUser(userId: number) {
    return await this.taskService.findAllTasksAssignedToUser(userId);
  }

  async createTask(taskData: TasksAttributes, email: string) {
    return await this.taskService.createTask(taskData, email);
  }

}
