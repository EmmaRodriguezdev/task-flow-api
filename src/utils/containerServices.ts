import { TaskRepository } from "@/domain/repositories/TaskRepository";
import { UserRepository } from "@/domain/repositories/UserRepository";
import { WorkspaceRepository } from "@/domain/repositories/WorkspaceRepository";
import { CohereAIController } from "@/infrastructure/web/controllers/CohereAIController";
import { TaskController } from "@/infrastructure/web/controllers/TaskController";
import { UserController } from "@/infrastructure/web/controllers/UserController";
import { WorkspaceController } from "@/infrastructure/web/controllers/WorkspaceController";

export enum ServicesDictionary {
    USERREPOSITORY = 'userRepository',
    USERCONTROLLER = 'userController',
    TASKREPOSITORY = 'taskRepository',
    TASKCONTROLLER = 'taskController',
    WORKSPACEREPOSITORY = 'workspaceRepository',
    WORKSPACECONTROLLER = 'workspaceController',
    COHEREAICONTROLLER = 'cohereAIController'
}

export interface ServiceMap {
    [ServicesDictionary.USERREPOSITORY]: UserRepository;
    [ServicesDictionary.USERCONTROLLER]: UserController;
    [ServicesDictionary.TASKREPOSITORY]: TaskRepository;
    [ServicesDictionary.TASKCONTROLLER]: TaskController;
    [ServicesDictionary.WORKSPACEREPOSITORY]: WorkspaceRepository;
    [ServicesDictionary.WORKSPACECONTROLLER]: WorkspaceController;
    [ServicesDictionary.COHEREAICONTROLLER]: CohereAIController;
}