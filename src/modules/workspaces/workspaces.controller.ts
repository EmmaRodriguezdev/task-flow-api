import { WorkspacesService } from './workspaces.service'

export class WorkspacesController {
    private workspacesService: WorkspacesService;
    constructor() {
        this.workspacesService = new WorkspacesService();
    }

    async getAllByUserId(userId: number) {
        return await this.workspacesService.getAllByUserId(userId);
    }
}