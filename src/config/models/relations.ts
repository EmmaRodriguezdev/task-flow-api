import { User } from "../../modules/users/users.model";
import { UserProfiles } from "../../modules/users/users-profiles.model";

User.hasOne(UserProfiles, { foreignKey: 'userId', as: 'profile' });
UserProfiles.belongsTo(User, { foreignKey: 'userId', as: 'user' });
