import { User } from "../entities/User";

export abstract class UserRepository {
    abstract findByEmailWithProfile(email: string): Promise<User>;
}