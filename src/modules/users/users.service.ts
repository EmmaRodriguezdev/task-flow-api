import { User } from "./users.model";
import { UserProfiles } from "./users-profiles.model";

export class UserService {
    private userProfileModel = UserProfiles;
    constructor() {}

    async getAll() {
        return await User.findAll({
            include: [
                { model: this.userProfileModel, as: 'profile' }
            ]
        });
    }
}