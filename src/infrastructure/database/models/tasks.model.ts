import { DataTypes, Model } from "sequelize";
import { TaskPriority, TaskStatus } from "../../../domain/enums/tasks"
import sequelize from '../../../config/database'
import { WorkspaceModel } from "./workspace.model";
import { UserModel } from "./users.model";

export class TaskModel extends Model {
    public id!: number;
    public title!: string;
    public description!: string;
    public status!: TaskStatus;
    public priority!: TaskPriority;
    public workspaceId!: number;
    public parentId!: number;
    public assignedTo!: number;
    public createdBy!: number;
    public updatedBy!: number;
    public createdAt!: Date;
    public updatedAt!: Date;
}

TaskModel.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    status: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: Object.values(TaskStatus),
        defaultValue: TaskStatus.BACKLOG
    },
    priority: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: Object.values(TaskPriority),
        defaultValue: TaskPriority.MEDIUM
    },
    workspaceId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: WorkspaceModel,
            key: 'id'
        }
    },
    parentId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
        references: {
            model: TaskModel,
            key: 'id'
        }
    },
    assignedTo: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: UserModel,
            key: 'id'
        }
    },
    createdBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: UserModel,
            key: 'id'
        }
    },
    updatedBy: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: UserModel,
            key: 'id'
        }
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date()
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    sequelize,
    modelName: 'Task',
    tableName: 'tasks',
    timestamps: true,
    hooks: {
        beforeCreate: (task) => {
            task.createdAt = new Date();
        },
        beforeUpdate: (task) => {
            task.updatedAt = new Date();
        }
    }
})