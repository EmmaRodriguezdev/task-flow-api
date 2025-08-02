import { Task } from "@/domain/entities/Task";
import { TaskModel } from "@/infrastructure/database/models/tasks.model";

export class TaskSerializer {
  static toDomain(model: TaskModel): Task {
    return new Task(
      model.id,
      model.title,
      model.description,
      model.status,
      model.workspaceId,
      model.assignedTo,
      model.createdBy,
      model.priority,
      model.updatedBy,
      model.parentId,
      model.createdAt,
      model.updatedAt,
      model.assignee,
      model.creator
    );
  }

  static toDomainList(models: TaskModel[]): Task[] {
    return models.map(TaskSerializer.toDomain);
  }

  static toDomainListGroupedByStatus(models: TaskModel[]): Record<string, Task[]> {
    return models.reduce<Record<string, Task[]>>(
      (acc, model) => {
        acc[model.status]?.push(this.toDomain(model));
        return acc;
      },
      {
        BACKLOG: [],
        TODO: [],
        IN_PROGRESS: [],
        IN_REVIEW: [],
        DONE: [],
      }
    );
  }
}
