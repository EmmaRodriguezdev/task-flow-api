import { User } from "./users.model";

export class UserService {
    constructor() {}

    async getAll() {
        return await User.findAll();
    }
}