import { UserAttributes } from "modules/users/users.interface";
import { AuthService } from "./auth.service";

export class AuthController {
  private readonly authService: AuthService;
  constructor() {
    this.authService = new AuthService();
  }

  async createUser(user: UserAttributes) {
    return await this.authService.createUser(user);
  }
}
