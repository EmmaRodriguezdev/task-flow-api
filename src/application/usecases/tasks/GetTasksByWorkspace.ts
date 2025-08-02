import { Task } from "@/domain/entities/Task";
import { TaskRepository } from "@/domain/repositories/TaskRepository";

export class GetTasksByWorskpace {
    constructor(private taskRespository: TaskRepository) { }

    async execute(workspaceId: number): Promise<Record<string, Task[]>>  {
        return await this.taskRespository.getTasksByWorskpace(workspaceId);
    }
}