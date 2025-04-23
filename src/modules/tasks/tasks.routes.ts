import { Router } from "express";
import { TasksController } from "./tasks.controller";

export class TasksRoutes {
  public router: Router;
  private tasksController: TasksController;
  constructor() {
    this.router = Router();
    this.tasksController = new TasksController();
    this.setupRoutes();
  }

  setupRoutes() {
    this.router.get("/:assignedToUserId", async (req, res) => {
      try {
        const { assignedToUserId } = req.params;
        const tasks = await this.tasksController.findAllTasksAssignedToUser(
          Number(assignedToUserId)
        );
        res.send(tasks);
      } catch (err) {
        res
          .status(401)
          .send({ message: "Occured an error while fetching tasks" });
      }
    });
  }
}
export default new TasksRoutes().router;
