import { ITaskCreationAttributes } from "@/domain/interfaces/task.interface";
import { TaskRepository } from "@/domain/repositories/TaskRepository";
import { WorkspaceRepository } from "@/domain/repositories/WorkspaceRepository";
import { NotFoundError } from "@/shared/errors/NotFoundError";
import { HttpStatusCodes } from "@/shared/utils/httpStatusCodes";
import { IResponseMessage } from "@/shared/utils/responseMessage";

export class CreateTask {
  constructor(
    private taskRepository: TaskRepository,
    private workspaceRepository: WorkspaceRepository
  ) {}

  async execute(data: ITaskCreationAttributes): Promise<IResponseMessage> {
    const { workspaceId, assignedTo, createdBy } = data;

    const workspace = await this.workspaceRepository.getWorkspaceById(
      workspaceId
    );

    if (!workspace) {
      throw new NotFoundError(
        `El workspace con el ID: ${workspaceId} no existe`,
        HttpStatusCodes.NOT_FOUND_ERROR
      );
    }

    const creatorWorkspaces =
      await this.workspaceRepository.getWorkspacesByUser(createdBy);

    const creatorBelongsWorkspace = creatorWorkspaces?.find(
      (ws) => ws.id === workspace.id
    );

    if (!creatorBelongsWorkspace) {
      throw new NotFoundError(
        `El usuario con el ID: ${createdBy} no pertenece al worskpace`,
        HttpStatusCodes.NOT_FOUND_ERROR
      );
    }
    if (assignedTo) {
      const assignedWorkspaces =
        await this.workspaceRepository.getWorkspacesByUser(assignedTo);

      const assigneedBelongsWorkspace = assignedWorkspaces?.find(
        (ws) => ws.id === workspace.id
      );

      if (!assigneedBelongsWorkspace) {
        throw new NotFoundError(
          `El usuario con el ID: ${createdBy} no pertenece al worskpace`,
          HttpStatusCodes.NOT_FOUND_ERROR
        );
      }
    }

    return await this.taskRepository.createTask(data);
  }
}
