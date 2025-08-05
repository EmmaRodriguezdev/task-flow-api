import { UserModel } from "./users.model";
import { DataTypes, Model } from "sequelize";
import sequelize from "../../../config/database";
import { User } from "@/domain/entities/User";

export class WorkspaceModel extends Model {
  public id!: number;
  public ownerId!: number;
  public name!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
  public users!: User[]
}

WorkspaceModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: UserModel,
        key: "id",
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Workspace",
    tableName: "workspaces",
    timestamps: true,
  }
);
