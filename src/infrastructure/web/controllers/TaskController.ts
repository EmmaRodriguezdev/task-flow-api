import { CreateTaskDTO } from "@/application/dto/CreateTaskDTO";
import { UpdateStatusTaskDTO } from "@/application/dto/UpdateStatusTaskDTO";
import { CreateTask } from "@/application/usecases/tasks/CreateTask";
import { GetTasks } from "@/application/usecases/tasks/GetTasks";
import { GetTasksByUser } from "@/application/usecases/tasks/GetTasksByUser";
import { GetTasksByWorskpace } from "@/application/usecases/tasks/GetTasksByWorkspace";
import { ITaskCreationAttributes } from "@/domain/interfaces/task.interface";
import { TaskRepository } from "@/domain/repositories/TaskRepository";
import { WorkspaceRepository } from "@/domain/repositories/WorkspaceRepository";
import { HttpStatusCodes } from "@/shared/utils/httpStatusCodes";
import { NextFunction, Request, Response } from "express";

export class TaskController {
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly workspaceRepository: WorkspaceRepository
  ) {}

  async getTasks(_req: Request, res: Response, next: NextFunction) {
    try {
      const getTasksUseCase = new GetTasks(this.taskRepository);
      const tasks = await getTasksUseCase.execute();
      res.status(HttpStatusCodes.OK).json(tasks);
    } catch (error) {
      next(error);
    }
  }

  async getTasksByWorkspace(req: Request, res: Response, next: NextFunction) {
    try {
      const workspaceId = req.params["workspaceId"] as string;
      const getTasksByWorkspaceUseCase = new GetTasksByWorskpace(
        this.taskRepository
      );
      const tasks = await getTasksByWorkspaceUseCase.execute(
        parseInt(workspaceId)
      );
      res.status(HttpStatusCodes.OK).json(tasks);
    } catch (error) {
      next(error);
    }
  }

  async getTasksByUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params["userId"] as string;
      const getTasksByUserUseCase = new GetTasksByUser(this.taskRepository);
      const tasks = await getTasksByUserUseCase.execute(parseInt(userId));
      res.status(HttpStatusCodes.OK).json(tasks);
    } catch (error) {
      next(error);
    }
  }

  async updateTaskStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = UpdateStatusTaskDTO.fromRequest(req.body);
      const id = req.params["id"] as string;
      const updatedTask = await this.taskRepository.updateTaskStatus(
        parseInt(id),
        dto.toStatus
      );
      res.status(HttpStatusCodes.OK).json(updatedTask);
    } catch (error) {
      next(error);
    }
  }

  async createTask(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, status, workspaceId, priority } = req.body;
      const createdBy = req.user?.id as string;
      console.log("createdBy", createdBy);
      CreateTaskDTO.fromRequest({
        title,
        status,
        workspaceId,
        priority,
        createdBy: parseInt(createdBy),
      });
      const createTaskUseCase = new CreateTask(
        this.taskRepository,
        this.workspaceRepository
      );
      const createdTask = await createTaskUseCase.execute({
        ...req.body,
        createdBy: parseInt(createdBy),
      } as ITaskCreationAttributes);
      res.status(HttpStatusCodes.OK).json(createdTask);
    } catch (error) {
      next(error);
    }
  }
}
