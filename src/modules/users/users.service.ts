import { User } from "./users.model";
import { UserProfiles } from "./users-profiles.model";

export class UserService {
  private userProfileModel = UserProfiles;
  constructor() {}

  async getAll() {
    return await User.findAll({
      include: [{ model: this.userProfileModel, as: "profile" }],
    });
  }

  async userAlreadyExists(email: string) {
    return await User.findOne({ where: { email } })
  }

  async getUserByEmail(email: string) {
    const user = await User.findOne({
      where: { email },
      include: { model: UserProfiles, as: "profile", required: true },
    });

    if (!user) throw new Error("User not found");
    
    user.profile.password = '';

    return user;
  }

  async getUserById(userId: number) {
    const user = await User.findByPk(userId);
    
    if (!user) throw new Error('User not found');

    return user;
  }
}
