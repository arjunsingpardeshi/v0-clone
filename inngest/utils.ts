import { AgentResult } from "@inngest/agent-kit";

type TextPart = {
  type?: "text";
  text: string;
};

export function lastAssistantTextMessageContent(
  result: AgentResult
): string | undefined {
  const lastAssistantTextMessageIndex = result.output.findLastIndex(
    (message) => message.role === "assistant" && "content" in message
  );

  if (lastAssistantTextMessageIndex === -1) return undefined;

  const message = result.output[lastAssistantTextMessageIndex];

  if (!("content" in message)) return undefined;

  const { content } = message;

  if (typeof content === "string") {
    return content;
  }

  if (Array.isArray(content)) {
    return content
      .filter((c): c is TextPart => typeof c === "object" && "text" in c)
      .map((c) => c.text)
      .join("");
  }

  return undefined;
}
