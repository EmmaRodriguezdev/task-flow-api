import { Router } from "express";
import { UserController } from "./users.controller";

export class UsersRoutes {
    public router: Router;
    private userController: UserController;
    constructor() {
        this.router = Router();
        this.userController = new UserController();
        this.setupRouter();
    }

    private setupRouter() {
        this.router.get('/users', async (_req, res) => {
            res.send(await this.userController.getAll());
        })
    }
    

}

export default new UsersRoutes().router;