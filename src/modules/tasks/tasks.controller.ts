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
}
