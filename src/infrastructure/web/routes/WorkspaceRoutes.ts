import { Container } from "@/config/container";
import { Router } from "express";
import { WorkspaceController } from "../controllers/WorkspaceController";
import { ServicesDictionary } from "@/utils/containerServices";
import { asyncHandler } from "@/utils/asyncHandler";

export class WorkspaceRouter {
  container: Container;
  router: Router;
  workspaceController: WorkspaceController;
  constructor(container: Container) {
    this.container = container;
    this.router = Router();
    this.workspaceController = this.container.get(
      ServicesDictionary.WORKSPACECONTROLLER
    ) as WorkspaceController;

    this.setupRoutes()
  }

  setupRoutes() {
    this.router.get(
      "/user/:userId",
      asyncHandler(
        this.workspaceController.getWorkspacesByUser.bind(
          this.workspaceController
        )
      )
    );
  }

  getRouter() {
    return this.router
  }
}
