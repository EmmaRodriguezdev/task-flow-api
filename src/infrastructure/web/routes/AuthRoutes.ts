import { Container } from "@/config/container";
import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { ServicesDictionary } from "@/utils/containerServices";
import { asyncHandler } from "@/utils/asyncHandler";

export class AuthRouter {
  container: Container;
  router: Router;
  userController: UserController;
  constructor(container: Container) {
    this.container = container;
    this.router = Router();
    this.userController = this.container.get(
      ServicesDictionary.USERCONTROLLER
    ) as UserController;

    this.setupRoutes();
  }

  setupRoutes() {
    this.router.post(
      "/signin",
      asyncHandler(this.userController.signin.bind(this.userController))
    );
  }

  getRouter() {
    return this.router;
  }
}
