import { Router } from "express";
import { WorkspacesController } from "./workspaces.controller";

export class WorkspacesRoutes {
  public router: Router;
  private workspacesController: WorkspacesController;
  constructor() {
    this.router = Router();
    this.workspacesController = new WorkspacesController();
    this.setupRouter();
  }

  private setupRouter() {
    this.router.get("/:userId", async (req, res) => {
      try {
        const { userId } = req.params;
        res.send(
          await this.workspacesController.getAllByUserId(parseInt(userId))
        );
      } catch (err) {
        res.status(404).send({
          message: "User not found",
          error: err,
        });
      }
    });
  }
}

export default new WorkspacesRoutes().router;
