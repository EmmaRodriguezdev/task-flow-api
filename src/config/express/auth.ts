import { JwtPayload } from "jsonwebtoken";

export interface AuthToken extends JwtPayload {
    id: string;
    email?: string
}