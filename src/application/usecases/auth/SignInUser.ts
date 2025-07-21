import { UserRepository } from "@/domain/repositories/UserRepository";
import { AuthService } from "@/domain/services/AuthService";
import { JWTService } from "@/infrastructure/external/JWTService";
import { NotFoundError } from "@/shared/errors/NotFoundError";
import { UnauthorizedError } from "@/shared/errors/UnauthorizedError";
import { HttpStatusCodes } from "@/shared/utils/httpStatusCodes";

export class SignInUser {
  constructor(private userRepository: UserRepository) {}

  async execute(email: string, password: string) {
    const user = await this.userRepository.findByEmailWithProfile(email);

    if (!user)
      throw new NotFoundError(
        `El usuario con el email: ${email} no existe`,
        HttpStatusCodes.NOT_FOUND_ERROR
      );

    const isPasswordValid = await AuthService.validatePassword(
      password,
      user.profile.password
    );

    if (!isPasswordValid)
      throw new UnauthorizedError(
        "La contraseña es incorrecta",
        HttpStatusCodes.UNAUTHORIZED_ERROR
      );

    const token = JWTService.signin({ id: user.id, email });

    user.profile.password = '';

    return {
      access_token: token,
      user
    };
  }
}
