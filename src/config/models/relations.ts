import { User } from "../../modules/users/users.model";
import { UserProfiles } from "../../modules/users/users-profiles.model";
import { Workspace } from "../../modules/workspaces/models/workspace.model";
import { WorkspacesUsersLink } from "../../modules/workspaces/models/workspaces-users.model";
import { Task } from '../../modules/tasks/tasks.model';

User.hasOne(UserProfiles, { foreignKey: 'userId', as: 'profile' });
UserProfiles.belongsTo(User, { foreignKey: 'userId', as: 'user' });

User.belongsToMany(Workspace, {
    through: WorkspacesUsersLink,
    foreignKey: 'userId',
    otherKey: 'workspaceId',
    as: 'workspaces'
});

Workspace.belongsToMany(User, {
    through: WorkspacesUsersLink,
    foreignKey: 'workspaceId',
    otherKey: 'userId',
    as: 'users'
})

Task.belongsTo(User, { foreignKey: 'createdBy', as: 'creator' })
Task.belongsTo(User, { foreignKey: 'assignedTo', as: 'assignee' })
Task.belongsTo(Workspace, { foreignKey: 'workspaceId', as: 'workspace' })

User.hasMany(Task, { foreignKey: 'createdBy', as: 'createdTasks' })
User.hasMany(Task, { foreignKey: 'assignedTo', as: 'assignedTasks' })

Workspace.hasMany(Task, { foreignKey: 'workspaceId', as: 'tasks' })