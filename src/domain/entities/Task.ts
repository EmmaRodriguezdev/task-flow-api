import { TaskPriority, TaskStatus } from "../enums/tasks";
import { BaseEntity } from "./BaseEntity";

export class Task extends BaseEntity {
  title: string;
  description: string;
  status: TaskStatus;
  workspaceId: number;
  assignedTo: number;
  parentId: number;
  priority: TaskPriority;
  createdBy: number;
  updateBy: number;
  constructor(
    id: number,
    title: string,
    description: string,
    status: TaskStatus,
    workspaceId: number,
    assignedTo: number,
    parentId: number,
    priority: TaskPriority,
    createdBy: number,
    updateBy: number,
    createdAt: Date,
    updatedAt: Date
  ) {
    super(id, createdAt, updatedAt);
    this.title = title;
    this.description = description;
    this.status = status;
    this.workspaceId = workspaceId;
    this.assignedTo = assignedTo;
    this.parentId = parentId;
    this.priority = priority;
    this.createdBy = createdBy;
    this.updateBy = updateBy;
  }
}
