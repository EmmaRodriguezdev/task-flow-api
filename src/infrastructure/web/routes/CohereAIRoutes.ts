import { Container } from "@/config/container";
import { Router } from "express";
import { CohereAIController } from "../controllers/CohereAIController";
import { ServicesDictionary } from "@/utils/containerServices";
import { asyncHandler } from "@/utils/asyncHandler";

export class CohereAIRouter {
    container: Container;
    router: Router;
    cohereAIController: CohereAIController;
    constructor(container: Container) {
        this.container = container;
        this.router = Router();
        this.cohereAIController = this.container.get(
            ServicesDictionary.COHEREAICONTROLLER
        ) as CohereAIController
        this.setupRoutes()
    }

    setupRoutes() {
        this.router.post(
            '/generate-task',
            asyncHandler(this.cohereAIController.generateTask.bind(this.cohereAIController))
        )
    }

    getRouter() {
        return this.router;
    }

}