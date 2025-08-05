import { JwtPayload } from "jsonwebtoken";
import { UserModel } from "../../infrastructure/database/models/users.model";
import { AuthToken } from "./auth";

declare global {
  namespace Express {
    export interface Request {
      user?: AuthToken;
    }
  }
}
export {}