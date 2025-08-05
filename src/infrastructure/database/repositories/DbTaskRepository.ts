import { Task } from "@/domain/entities/Task";
import { TaskRepository } from "@/domain/repositories/TaskRepository";
import { TaskModel } from "../models/tasks.model";
import { TaskSerializer } from "@/infrastructure/web/serializers/TaskSerializer";
import { TaskStatus } from "@/domain/enums/tasks";
import { IResponseMessage } from "@/shared/utils/responseMessage";
import { UserModel } from "../models/users.model";
import { ITaskCreationAttributes } from "@/domain/interfaces/task.interface";
import { HttpStatusCodes } from "@/shared/utils/httpStatusCodes";

export class DbTaskRepository extends TaskRepository {
  override async getTasks(): Promise<Task[]> {
    const tasks = await TaskModel.findAll();
    return TaskSerializer.toDomainList(tasks);
  }
  override async getTasksByWorskpace(
    workspaceId: number
  ): Promise<Record<string, Task[]>> {
    const tasks = await TaskModel.findAll({
      where: { workspaceId },
      include: [
        {
          model: UserModel,
          as: "assignee",
        },
        {
          model: UserModel,
          as: "creator",
        },
      ],
    });
    return TaskSerializer.toDomainListGroupedByStatus(tasks);
  }
  override async getTasksByUser(userId: number): Promise<Task[]> {
    const tasks = await TaskModel.findAll({
      where: { assignedTo: userId },
    });
    return TaskSerializer.toDomainList(tasks);
  }
  override async updateTaskStatus(
    id: number,
    toStatus: TaskStatus
  ): Promise<IResponseMessage> {
    const update = await TaskModel.update(
      { status: TaskStatus[toStatus] },
      {
        where: { id },
      }
    );

    return {
      message:
        update[0] === 0
          ? "Ocurrio un error al actualizar el estatus"
          : "Estatus actualizado correctamente",
      code:
        update[0] === 0
          ? HttpStatusCodes.INTERNAL_SERVER_ERROR
          : HttpStatusCodes.OK,
    };
  }

  override async createTask(
    data: ITaskCreationAttributes
  ): Promise<IResponseMessage> {
    const createdTask = await TaskModel.create(data);

    return {
      message: createdTask
        ? "Tarea Creada correctamente"
        : "Error al crear tarea",
      code: createdTask
        ? HttpStatusCodes.OK
        : HttpStatusCodes.INTERNAL_SERVER_ERROR,
    };
  }
}
