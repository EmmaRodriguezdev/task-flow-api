import { TaskStatus } from "@/domain/enums/tasks";
import { TaskRepository } from "@/domain/repositories/TaskRepository";
import { IResponseMessage } from "@/shared/utils/responseMessage";

export class UpdateStatusTask {
    constructor(private taskRepository: TaskRepository) { }

    async execute(id: number, toStatus: TaskStatus): Promise<IResponseMessage>{
        return this.taskRepository.updateTaskStatus(id, toStatus)
    }
}