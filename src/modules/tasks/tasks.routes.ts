import { Router } from "express";
import { TasksController } from "./tasks.controller";
import { TasksAttributes } from "./tasks.interface";
import { ValidationFieldsMiddleware } from '../../middlewares/validation-fields.middleware'

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

    this.router.post('/', async (req, res) => {
      const command = new ValidationFieldsMiddleware(req.body, ['title', 'workspaceId'], ['description', 'assignedTo', 'parentId'])
      try {
        //const { email } = req.user as { email: string }
        command.validate()
        const data = req.body as TasksAttributes;
        const task = await this.tasksController.createTask(data, 'admin@admin.com')
        res.status(201).send(task)
      } catch(err) {
        res.status(500).send({ message: "Occured an error while creating task", error: err });
      }
    })

  }
}
export default new TasksRoutes().router;
