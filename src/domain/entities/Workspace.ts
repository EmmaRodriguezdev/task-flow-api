import { BaseEntity } from "./BaseEntity";
import { User } from "./User";

export class Workspace extends BaseEntity {
  ownerId: number;
  name: string;
  users: User[]
  constructor(
    id: number,
    ownerId: number,
    name: string,
    createdAt: Date,
    updatedAt: Date,
    users: User[]
  ) {
    super(id, createdAt, updatedAt);
    this.ownerId = ownerId;
    this.name = name;
    this.users = users
  }
}
