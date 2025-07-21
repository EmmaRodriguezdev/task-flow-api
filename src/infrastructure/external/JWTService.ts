import { JWT } from "@/utils/jwt";

export class JWTService {
    static signin(payload: { id: number, email: string }) {
        return JWT.signin(payload)
    }
}