"use server"

import { inngest } from "@/inngest/client"
import db from "@/lib/db"
import { MessageRole, MessageType } from "@/lib/generated/prisma/client"
import { consumeCredits } from "@/lib/usage"
import { getCurrentUser } from "@/modules/auth/actions"
import { generateSlug } from "random-word-slugs"

export async function createProject(value: string) {

    try {
        const user = await getCurrentUser();

        if (!user) {
            throw new Error("Unauthorized");
        }


        try {

            await consumeCredits();
        } catch (error) {
            if (error instanceof Error) {
                throw new Error("Somthing went wrong", {
                    cause: { code: "BAD_REQUEST" }
                })
            }
            else {
                throw new Error("To many request", {
                    cause: { code: "TOO_MANY_REQUESTS" }
                })
            }
        }

        const newProject = await db.project.create({
            data: {
                name: generateSlug(2, { format: "kebab" }),
                userId: user.id,
                messages: {
                    create: {
                        content: value,
                        role: MessageRole.USER,
                        type: MessageType.RESULT
                    }
                }
            }
        });


        await inngest.send({
            name: "code-agent/run",
            data: {
                value: value,
                projectId: newProject.id
            }
        })
        return newProject;

    } catch (error) {
        if (error instanceof Error) {
            return error.message
        }
        return error
    }
}

export async function getProjects() {
    try {
        const user = await getCurrentUser();

        if (!user) {
            throw new Error("Unauthorize")
        }

        const projects = await db.project.findMany({
            where: {
                userId: user.id
            },
            orderBy: {
                createdAt: "desc"
            }
        });
        return projects
    } catch (error) {
        if (error instanceof Error) {
            return error.message
        }
        return error
    }
}

export async function getProjectById(projectId: string) {
    try {

        const user = await getCurrentUser();

        if (!user) {
            throw new Error("Unauthorize")
        }
        const project = await db.project.findUnique({
            where: {
                id: projectId,
                userId: user.id
            }
        });

        if (!project) throw new Error("Project not found");

        return project;

    } catch (error) {
        if (error instanceof Error) {
            return error.message
        }
        return error

    }

}

