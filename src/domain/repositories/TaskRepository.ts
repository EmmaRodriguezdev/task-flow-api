import { IResponseMessage } from "@/shared/utils/responseMessage";
import { Task } from "../entities/Task";
import { TaskStatus } from "../enums/tasks";
import { ITaskCreationAttributes } from "../interfaces/task.interface";

export abstract class TaskRepository {
    abstract getTasks(): Promise<Task[]>;
    abstract getTasksByWorskpace(workspaceId: number): Promise<Record<string, Task[]>> ;
    abstract getTasksByUser(userId: number): Promise<Task[]>
    abstract updateTaskStatus(id: number, toStatus: TaskStatus): Promise<IResponseMessage>
    abstract createTask(data: ITaskCreationAttributes): Promise<IResponseMessage>;
}