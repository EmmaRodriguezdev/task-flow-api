import { COHEREAIAPYKEY } from "@/shared/constants";
import { CohereClientV2 } from "cohere-ai";
import { ChatResponse } from "cohere-ai/api";

export class CohereAIService {
  cohereClient: CohereClientV2;
  constructor() {
    this.cohereClient = new CohereClientV2({ token: COHEREAIAPYKEY });
  }

  async generateTask(context: string): Promise<ChatResponse> {
    return await this.cohereClient.chat({
      model: "command-a-03-2025",
      messages: [
        {
          role: "assistant",
          content: `Crea una tarea con el contexto: ${context}, IMPORTANTE: La respuesta debe ser un string con el contenido en formato HTML, esto para insertarlo en un WYSIWYG`,
        },
      ],
    });
  }
}
