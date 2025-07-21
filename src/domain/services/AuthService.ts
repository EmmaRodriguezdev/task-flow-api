import * as bcrypt from 'bcrypt'

export class AuthService {
    static async validatePassword(plain: string, hashed: string): Promise<boolean> {
        return bcrypt.compare(plain, hashed)
    }
}