import { Router } from "express";
import { TasksController } from "./tasks.controller";
import { TasksAttributes } from "./tasks.interface";
import { ValidationFieldsMiddleware } from '../../middlewares/validation-fields.middleware'
import { TaskStatus } from "./enum";
import { authenticateToken } from "../../middlewares/auth.middleware";

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

    this.router.get('/workspace/:workspaceId', authenticateToken, async (req, res) => {
      try {
        const { workspaceId } = req.params;
        const tasks = await this.tasksController.getTasksOrderByWorkspace(
          Number(workspaceId)
        );
        res.send(tasks);
      } catch (err) {
        res
          .status(404)
          .send({ message: err });
      }
    })

    this.router.put('/:taskId/changeStatus', async (req, res) => {
      try {
        const { taskId } = req.params;
        const { status } = req.body;
        const task = await this.tasksController.changeTaskStatus(Number(taskId), status as TaskStatus);
        res.status(200).send(task);
      } catch (err) {
        res.status(500).send({ message: "Occured an error while changing task status", error: err });
      }
    })

  }
}
export default new TasksRoutes().router;
