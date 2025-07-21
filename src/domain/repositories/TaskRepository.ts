import { Task } from "../entities/Task";

export abstract class TaskRepository {
    abstract getTasks(): Promise<Task[]>;
    abstract getTasksByWorskpace(workspaceId: number): Promise<Task[]>;
    abstract getTasksByUser(userId: number): Promise<Task[]>
}