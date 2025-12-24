
"use server"
import { inngest } from "@/inngest/client"

export async function invoke() {
    await inngest.send({
        name:"agent/hello"
    })
}