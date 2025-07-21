import { BaseEntity } from "./BaseEntity";

export class Workspace extends BaseEntity {
  ownerId: number;
  name: string;
  constructor(
    id: number,
    ownerId: number,
    name: string,
    createdAt: Date,
    updatedAt: Date
  ) {
    super(id, createdAt, updatedAt);
    this.ownerId = ownerId;
    this.name = name;
  }
}
