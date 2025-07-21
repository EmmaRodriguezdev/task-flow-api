import { Container } from "@/config/container";
import { Router } from "express";
import { TaskController } from "../controllers/TaskController";
import { ServicesDictionary } from "@/utils/containerServices";
import { asyncHandler } from "@/utils/asyncHandler";

export class TaskRouter {
  container: Container;
  router: Router;
  taskController: TaskController;
  constructor(container: Container) {
    this.container = container;
    this.router = Router();
    this.taskController = this.container.get(
      ServicesDictionary.TASKCONTROLLER
    ) as TaskController;

    this.setupRoutes()
  }

  setupRoutes() {
    this.router.get(
      "/",
      asyncHandler(this.taskController.getTasks.bind(this.taskController))
    );
    this.router.get(
      "/workspace/:workspaceId",
      asyncHandler(this.taskController.getTasksByWorkspace.bind(this.taskController))
    )
    this.router.get(
      "/user/:userId",
      asyncHandler(this.taskController.getTasksByUser.bind(this.taskController))
    )
  }

  getRouter() {
    return this.router;
  }
}
