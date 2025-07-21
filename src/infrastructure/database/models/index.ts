import { UserModel } from "./users.model";
import { UserProfileModel } from "./users-profiles.model";
import { WorkspaceModel } from "./workspace.model";
import { WorkspacesUsersLinkModel } from "./workspaces-users.model";
import { TaskModel } from './tasks.model';

UserModel.hasOne(UserProfileModel, { foreignKey: 'userId', as: 'profile' });
UserProfileModel.belongsTo(UserModel, { foreignKey: 'userId', as: 'user' });

UserModel.belongsToMany(WorkspaceModel, {
    through: WorkspacesUsersLinkModel,
    foreignKey: 'userId',
    otherKey: 'workspaceId',
    as: 'workspaces'
});

WorkspaceModel.belongsToMany(UserModel, {
    through: WorkspacesUsersLinkModel,
    foreignKey: 'workspaceId',
    otherKey: 'userId',
    as: 'users'
})

TaskModel.belongsTo(UserModel, { foreignKey: 'createdBy', as: 'creator' })
TaskModel.belongsTo(UserModel, { foreignKey: 'assignedTo', as: 'assignee' })
TaskModel.belongsTo(WorkspaceModel, { foreignKey: 'workspaceId', as: 'workspace' })

UserModel.hasMany(TaskModel, { foreignKey: 'createdBy', as: 'createdTasks' })
UserModel.hasMany(TaskModel, { foreignKey: 'assignedTo', as: 'assignedTasks' })

WorkspaceModel.hasMany(TaskModel, { foreignKey: 'workspaceId', as: 'tasks' })