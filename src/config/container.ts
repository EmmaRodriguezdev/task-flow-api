import { TaskRepository } from "@/domain/repositories/TaskRepository";
import { WorkspaceRepository } from "@/domain/repositories/WorkspaceRepository";
import { DbTaskRepository } from "@/infrastructure/database/repositories/DbTaskRepository";
import { DbUserRepository } from "@/infrastructure/database/repositories/DbUserRepository";
import { DbWorkspaceRepository } from "@/infrastructure/database/repositories/DbWorkspaceRepository";
import { CohereAIController } from "@/infrastructure/web/controllers/CohereAIController";
import { TaskController } from "@/infrastructure/web/controllers/TaskController";
import { UserController } from "@/infrastructure/web/controllers/UserController";
import { WorkspaceController } from "@/infrastructure/web/controllers/WorkspaceController";
import { ServiceMap, ServicesDictionary } from "@/utils/containerServices";

export class Container {
    private services: Map<ServicesDictionary, ServiceMap[keyof ServiceMap]>
    constructor() {
        this.services = new Map()
    }

    setupServices() {
        //Infrastructure
        this.services.set(ServicesDictionary.USERREPOSITORY, new DbUserRepository)
        this.services.set(ServicesDictionary.TASKREPOSITORY, new DbTaskRepository)
        this.services.set(ServicesDictionary.WORKSPACEREPOSITORY, new DbWorkspaceRepository)

        //Controllers
        this.services.set(ServicesDictionary.USERCONTROLLER, new UserController(
            this.services.get(ServicesDictionary.USERREPOSITORY) as DbUserRepository
        ))
        this.services.set(ServicesDictionary.TASKCONTROLLER, new TaskController(
            this.services.get(ServicesDictionary.TASKREPOSITORY) as TaskRepository,
            this.services.get(ServicesDictionary.WORKSPACEREPOSITORY) as WorkspaceRepository
        ))
        this.services.set(ServicesDictionary.WORKSPACECONTROLLER, new WorkspaceController(
            this.services.get(ServicesDictionary.WORKSPACEREPOSITORY) as WorkspaceRepository
        ))
        this.services.set(ServicesDictionary.COHEREAICONTROLLER, new CohereAIController())
    }

    get(serviceName: ServicesDictionary) {
        return this.services.get(serviceName)
    }
}