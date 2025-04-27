import { OpenaiService } from "./openai.service";

export class OpenaiController {
    private openaiService: OpenaiService;
    constructor() {
        this.openaiService = new OpenaiService();
    }

    async generateDescription(context: string) {
        return await this.openaiService.generateDescription(context);
    }

    async generateSubTaskTitle(context: string) {
        return await this.openaiService.generateSubTaskTitle(context);
    }

}