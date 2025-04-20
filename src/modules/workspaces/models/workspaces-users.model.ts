import { User } from "../../users/users.model";
import { DataTypes, Model } from "sequelize";
import { Workspace } from "./workspace.model";
import sequelize from '../../../config/database'

export class WorkspacesUsersLink extends Model {
    public id!: number;
    public userId!: number;
    public workspaceId!: number;
}

WorkspacesUsersLink.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: "id"
        }
    },
    workspaceId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Workspace,
            key: "id"
        }
    }
},{
    sequelize,
    modelName: 'WorkspacesUsersLink',
    tableName: 'workspaces_users_links',
})