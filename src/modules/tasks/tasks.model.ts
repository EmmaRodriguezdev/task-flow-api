import { DataTypes, Model } from "sequelize";
import { TaskStatus } from "./enum";
import sequelize from '../../config/database'
import { Workspace } from "../../modules/workspaces/models/workspace.model";
import { User } from "../../modules/users/users.model";

export class Task extends Model {
    public id!: number;
    public title!: string;
    public description!: string;
    public status!: TaskStatus;
    public workspaceId!: number;
    public assignedTo!: number;
    public createdBy!: number;
    public updatedBy!: number;
    public createdAt!: Date;
    public updatedAt!: Date;
}

Task.init({
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
    workspaceId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Workspace,
            key: 'id'
        }
    },
    parentId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
        references: {
            model: Task,
            key: 'id'
        }
    },
    assignedTo: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: User,
            key: 'id'
        }
    },
    createdBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    updatedBy: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: User,
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