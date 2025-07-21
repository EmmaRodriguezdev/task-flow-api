import { JwtPayload } from "jsonwebtoken";
import { UserModel } from "../../infrastructure/database/models/users.model";

declare global {
  namespace Express {
    export interface Request {
      user?: string | JwtPayload;
    }
  }
}