import { Task } from "@/domain/entities/Task";
import { TaskRepository } from "@/domain/repositories/TaskRepository";

export class GetTasksByUser {
    constructor(private taskRepository: TaskRepository) { }

    async execute(userId: number): Promise<Task[]> {
        return await this.taskRepository.getTasksByUser(userId);
    }
}