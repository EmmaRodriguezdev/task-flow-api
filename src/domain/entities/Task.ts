import { TaskPriority, TaskStatus } from "../enums/tasks";
import { BaseEntity } from "./BaseEntity";
import { User } from "./User";

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
  assignee!: User | undefined;
  creator!: User | undefined;
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
    updatedAt: Date,
    assignee?: User,
    creator?: User
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
    this.assignee = assignee || undefined;
    this.creator = creator || undefined;
  }
}
