import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env['JWT_SECRET'] as string;

export class JWT {
    static signin(payload: object): string {
        return jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });
    }

    static verify(token: string) {
        try {
            return jwt.verify(token, JWT_SECRET);
        } catch(err) {
            return null;
        }
    }
}