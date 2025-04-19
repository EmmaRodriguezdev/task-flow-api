import { JwtPayload } from "jsonwebtoken";
import { User } from "../../modules/users/users.model";

declare global {
  namespace Express {
    export interface Request {
      user?: string | JwtPayload;
    }
  }
}