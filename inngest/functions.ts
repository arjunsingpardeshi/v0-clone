import { inngest } from "./client";
import { gemini, createAgent } from "@inngest/agent-kit";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "agent/hello" },
  async ({ event, step }) => {
    
    
    const helloAgent = createAgent({
    name:'hello-agent',
    description: 'simple agent to say hello',
    system: 'you are AI assistance , always greet professionally',
    model: gemini({model: 'gemini-2.5-flash'})
    });
    const {output} = await helloAgent.run("greet to the user")

    return{
      message: output[0].content
    }
  },
);