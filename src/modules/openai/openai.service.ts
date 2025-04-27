import OpenAI from 'openai'

export class OpenaiService {
    private client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
    constructor() { }

    async generateDescription(context: string) {
        const response = await this.client.responses.create({
            model: 'gpt-3.5-turbo',
            input: `Generate a short description of a task with the following context: ${context}`,
        })
        return response
    }

    async generateSubTaskTitle(context: string) {
        const response =  await this.client.responses.create({
            model: 'gpt-3.5-turbo',
            input: `Generate a short subtask title of a task with the following task title: ${context}`,
        })
        return response
    }

}