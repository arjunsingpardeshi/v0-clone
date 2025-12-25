import { inngest } from "./client";
import { gemini, createAgent } from "@inngest/agent-kit";
import Sandbox from "@e2b/code-interpreter"

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "agent/hello" },
  async ({ event, step }) => {
    
    const sandboxId = await step.run("get-sandbox-id", async() =>{
      const sandbox = await Sandbox.create("v0-clone-nextjs-002")
      return sandbox.sandboxId
    })


    const helloAgent = createAgent({
    name:'hello-agent',
    description: 'simple agent to say hello',
    system: 'you are AI assistance , always greet professionally',
    model: gemini({model: 'gemini-2.5-flash'})
    });
    const {output} = await helloAgent.run("greet to the user")

    const sandboxUrl = await step.run("get-sandbox-url", async() =>{
      const sandbox = await Sandbox.connect(sandboxId);
      const host = sandbox.getHost(3000);
      return `http://${host}`
    })

    return{
      message: output[0].content
    }
  },
);