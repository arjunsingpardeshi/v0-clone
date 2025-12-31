"use server"

import { MessageRole, MessageType } from "@/lib/generated/prisma/enums";

import db from "@/lib/db";
import { inngest } from "@/inngest/client";
import { getCurrentUser } from "@/modules/auth/actions";
import { consumeCredits } from "@/lib/usage";

export async function createMessage(value: string, projectId: string) {
    try {
        const user = await getCurrentUser();
        if (!user) throw new Error("Unauthorized")

        const project = await db.project.findUnique({
            where: {
                id: projectId,
                userId: user.id
            }
        })
        if (!project) throw new Error("Project not found")

        try {

            await consumeCredits();
        } catch (error) {
            if (error instanceof Error) {
                throw new Error("Somthing went wrong",{
                    cause: {code: "BAD_REQUEST"}
                })
            }
            else {
                throw new Error("To many request",{
                    cause: {code: "TOO_MANY_REQUESTS"}
                })
            }
        }

        const newMessage = await db.message.create({
            data: {
                projectId: projectId,
                content: value,
                role: MessageRole.USER,
                type: MessageType.RESULT
            }
        })

        await inngest.send({
            name: "code-agent/run",
            data: {
                value: value,
                projectId: projectId
            }
        })
        return newMessage
    } catch (error) {
        if (error instanceof Error) {
            return error.message || "Error in creating message"
        }
        return error
    }
}

export async function getMessages(projectId: string) {

    try {

        const user = await getCurrentUser();
        if (!user) throw new Error("Unauthorized")

        const project = await db.project.findUnique({

            where: {
                id: projectId,
                userId: user.id
            }
        })

        if (!project) throw new Error("Project not foud")


        const messages = await db.message.findMany({
            where: {
                projectId
            },
            orderBy: {
                updatedAt: "asc"
            },
            include: {
                fragments: true
            }
        })

        return messages;

    } catch (error) {
        if (error instanceof Error) {
            return error.message || "Error in creating message"
        }
        return error
    }
}