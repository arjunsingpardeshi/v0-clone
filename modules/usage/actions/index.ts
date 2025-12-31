
"use server"

import { auth } from "@clerk/nextjs/server"

import { DURATION, FREE_POINTS, PRO_POINTS, getUsageStatus } from "@/lib/usage"

export async function status() {
    try {
        const { userId, has } = await auth()

        if (!userId) {
            throw new Error("Unauthorize")
        }

        const hasProAccess = has({ plan: "pro" })

        const maxPoints = hasProAccess ? PRO_POINTS : FREE_POINTS

        const result = await getUsageStatus()
        if (!result) {
            return {
                remainingPoints: maxPoints,
                msBeforeNext: DURATION * 1000,
                consumedPoints: 0,
                isFirstRequest: true,
                maxPoints
            };
        }


        const remainingPoints = result.remainingPoints ?? (maxPoints - (result.consumedPoints || 0))

        return {
            remainingPoints,
            msBeforeNext: result.msBeforeNext || DURATION * 1000,
            consumedPoints: result.consumedPoints || 0,
            isFirstRequest: false,
            maxPoints
        };
    } catch (error) {
        console.error("error in status action", error)
        if (error instanceof Error) {
            return {
                success: false,
                error:error.message}
        }
    }
}