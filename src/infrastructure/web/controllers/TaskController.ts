import { GetTasks } from "@/application/usecases/tasks/GetTasks";
import { GetTasksByUser } from "@/application/usecases/tasks/GetTasksByUser";
import { GetTasksByWorskpace } from "@/application/usecases/tasks/GetTasksByWorkspace";
import { TaskRepository } from "@/domain/repositories/TaskRepository";
import { HttpStatusCodes } from "@/shared/utils/httpStatusCodes";
import { NextFunction, Request, Response } from "express";

export class TaskController {
  constructor(private readonly taskRepository: TaskRepository) {}

  async getTasks(_req: Request, res: Response, next: NextFunction) {
    try {
      const getTasksUseCase = new GetTasks(this.taskRepository)
      const tasks = await getTasksUseCase.execute();
      res.status(HttpStatusCodes.OK).json(tasks);
    } catch (error) {
      next(error);
    }
  }

  async getTasksByWorkspace(req: Request, res: Response, next: NextFunction) {
    try {
      const workspaceId = (req.params['workspaceId'] as string);
      const getTasksByWorkspaceUseCase = new GetTasksByWorskpace(this.taskRepository);
      const tasks = await getTasksByWorkspaceUseCase.execute(parseInt(workspaceId));
      res.status(HttpStatusCodes.OK).json(tasks);
    } catch(error) {
      next(error)
    }
  }

  async getTasksByUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params['userId'] as string;
      const getTasksByUserUseCase = new GetTasksByUser(this.taskRepository);
      const tasks = await getTasksByUserUseCase.execute(parseInt(userId));
      res.status(HttpStatusCodes.OK).json(tasks)
    } catch(error) {
      next(error)
    }
  }
}
