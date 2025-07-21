import { UserModel } from "./users.model";
import { DataTypes, Model } from "sequelize";
import { WorkspaceModel } from "./workspace.model";
import sequelize from "../../../config/database";

export class WorkspacesUsersLinkModel extends Model {
  public id!: number;
  public userId!: number;
  public workspaceId!: number;
  public createdAt!: Date;
}

WorkspacesUsersLinkModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: UserModel,
        key: "id",
      },
    },
    workspaceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: WorkspaceModel,
        key: "id",
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: new Date(),
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: new Date(),
    },
  },
  {
    sequelize,
    modelName: "WorkspacesUsersLink",
    tableName: "workspaces_users_links",
  }
);
