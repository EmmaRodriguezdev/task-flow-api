enum FinishReason {
  COMPLETE = "COMPLETE",
  STOP_SEQUENCE = "STOP_SEQUENCE",
  MAX_TOKENS = "MAX_TOKENS",
  TOOL_CALL = "TOOL_CALL",
  ERROR = "ERROR",
}

enum Role {
  ASSISTANCE = "assistant",
  SYSTEM = "system",
  TOOL = "tool",
  USER = "user",
}

export interface ICohereAIMessageResponse {
  role: Role;
  text: string;
}

export interface ICohereAIResponse {
  id: string,
  finish_reason: FinishReason,
  message: ICohereAIMessageResponse[],
  usage: {
    billed_units: {
      input_tokens: number;
      output_tokens: number;
    },
    tokens: {
      input_tokens: number;
      output_tokens: number;
    },
  },
}
