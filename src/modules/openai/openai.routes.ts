import { Router } from "express";
import { OpenaiController } from "./openai.controller";

export class OpenaiRoutes {
    public router: Router;
    private openaiController: OpenaiController;
    constructor() { 
        this.router = Router();
        this.openaiController = new OpenaiController();
        this.setupRouter();
     }

     private setupRouter() {
        this.router.post('/generate-description', async (req, res) => {
            try {
                const { context } = req.body;
                const description = await this.openaiController.generateDescription(context);
                res.send(description);
            } catch (err) {
                res.status(500).send(err);
            }
        })
        this.router.post('/generate-subtask-title', async (req, res) => {
            try {
                const { context } = req.body;
                const subtaskTitle = await this.openaiController.generateSubTaskTitle(context);
                res.send(subtaskTitle);
            } catch (err) {
                res.status(500).send(err);
            }
        })
     }

}

export default new OpenaiRoutes().router;