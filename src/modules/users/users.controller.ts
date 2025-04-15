import { UserService } from "./users.service";

export class UserController {
    private userService: UserService;
    constructor() {
        this.userService = new UserService();
    }

    async getAll() {
        return await this.userService.getAll();
    }

}