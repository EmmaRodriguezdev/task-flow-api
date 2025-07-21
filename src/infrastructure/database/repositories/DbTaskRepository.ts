import { Task } from "@/domain/entities/Task";
import { TaskRepository } from "@/domain/repositories/TaskRepository";
import { TaskModel } from "../models/tasks.model";
import { TaskSerializer } from "@/infrastructure/web/serializers/TaskSerializer";

export class DbTaskRepository extends TaskRepository {
    override async getTasks(): Promise<Task[]> {
        const tasks = await TaskModel.findAll()
        return TaskSerializer.toDomainList(tasks);
    }
    override async getTasksByWorskpace(workspaceId: number): Promise<Task[]> {
        const tasks = await TaskModel.findAll({
            where: { workspaceId }
        });
        return TaskSerializer.toDomainList(tasks)
    }
    override async getTasksByUser(userId: number): Promise<Task[]> {
        const tasks = await TaskModel.findAll({
            where: { assignedTo: userId }
        })
        return TaskSerializer.toDomainList(tasks)
    }
}