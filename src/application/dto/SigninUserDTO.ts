import { ValidationError } from "@/shared/errors/ValidationError";
import { HttpStatusCodes } from "@/shared/utils/httpStatusCodes";

export class SigninUserDTO {
  email: string;
  password: string;
  constructor(data: {email: string, password: string}) {
    this.email = data.email;
    this.password = data.password;
  }
  static fromRequest(body: {email: string, password: string}): SigninUserDTO {
    if (!body.email || !body.password) {
      throw new ValidationError(
        "Las credenciales son requeridas",
        HttpStatusCodes.BAD_REQUEST
      );
    }

    return new SigninUserDTO({
        email: body.email,
        password: body.password
    });
  }
}
