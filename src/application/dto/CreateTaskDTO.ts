import { TaskPriority, TaskStatus } from "@/domain/enums/tasks";
import { ValidationError } from "@/shared/errors/ValidationError";
import { HttpStatusCodes } from "@/shared/utils/httpStatusCodes";

export class CreateTaskDTO {
  title: string;
  status: TaskStatus;
  workspaceId: number;
  priority: TaskPriority;
  createdBy: number;
  constructor(data: {
    title: string;
    description?: string;
    status: TaskStatus;
    workspaceId: number;
    assigneedTo?: number;
    parentId?: number;
    priority: TaskPriority;
    createdBy: number;
  }) {
    (this.title = data.title),
      (this.status = data.status),
      (this.workspaceId = data.workspaceId),
      (this.priority = data.priority),
      (this.createdBy = data.createdBy);
  }
  static fromRequest(body: {
    title: string;
    status: TaskStatus;
    workspaceId: number;
    priority: TaskPriority;
    createdBy: number;
  }): CreateTaskDTO {
    const entries = body as Record<string, unknown>;

    for (const field in entries) {
      if (!entries[field]) {
        throw new ValidationError(
          `El campo ${field} es requerido`,
          HttpStatusCodes.BAD_REQUEST
        );
      }
    }

    return new CreateTaskDTO({
      title: body.title,
      status: body.status,
      workspaceId: body.workspaceId,
      priority: body.priority,
      createdBy: body.createdBy,
    });
  }
}
