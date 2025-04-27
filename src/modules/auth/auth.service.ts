import { User } from "../../modules/users/users.model";
import { AuthUser } from "./auth.interface";
import * as bcrypt from "bcrypt";
import { UserProfiles } from "../../modules/users/users-profiles.model";
import { JWT } from "../../utils/jwt";
import { UserAttributes } from "modules/users/users.interface";
import { UserService } from "../users/users.service";

export class AuthService {
  private userService = new UserService();
  private userModel = User;
  constructor() {}

  async signin(user: AuthUser) {
    const { email, password } = user;
    const findUser = await User.findOne({
      where: { email },
      include: { model: UserProfiles, as: "profile", required: true },
    });

    if (!findUser) throw new Error("User not found");

    const isPasswordValid = await bcrypt.compare(
      password,
      findUser.profile.password
    );

    if (isPasswordValid) throw new Error("Invalid credentials");

    const token = JWT.signin({ id: findUser.id, email: user.email });

    findUser.profile.password = "";

    return {
      access_token: token,
      user: findUser,
    };
  }

  async createUser(user: UserAttributes) {
    const existsUser = await this.userService.userAlreadyExists(user.email);
    console.log(existsUser);
    if (existsUser) throw new Error("User already exists");

    return await this.userModel.create(
      {
        ...user,
        profile: {
          password: user.password,
        },
      },
      {
        include: ["profile"],
      }
    );
  }
}
