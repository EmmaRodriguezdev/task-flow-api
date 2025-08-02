import { User } from "@/domain/entities/User";
import { UserRepository } from "@/domain/repositories/UserRepository";
import { UserModel } from "../models/users.model";
import { UserProfileModel } from "../models/users-profiles.model";

export class DbUserRepository extends UserRepository {
  override async findByEmailWithProfile(email: string): Promise<User> {
    const findUser = await UserModel.findOne({
      where: { email },
      include: {
        model: UserProfileModel,
        as: "profile",
        required: true,
      },
    });
    
    return findUser as User;
  }
  override async findById(id: number): Promise<User> {
    const findUser = await UserModel.findOne({
      where: { id },
      include: {
        model: UserProfileModel,
        as: "profile",
        required: true,
      },
    });
    
    return findUser as User;
  }
}
