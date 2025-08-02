import { Optional } from "sequelize";
import { User } from "../entities/User";
import { TaskPriority, TaskStatus } from "../enums/tasks";

export interface ITaskAttributes {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  workspaceId: number;
  assignedTo: number;
  parentId: number;
  priority: TaskPriority;
  createdBy: number;
  updateBy: number;
  assignee?: User | undefined;
  creator?: User | undefined;
  createdAt: string;
  updatedAt?: string;
}

export interface ITaskCreationAttributes
  extends Optional<ITaskAttributes, "id"> {}
