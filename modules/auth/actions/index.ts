"use server"

import db from "@/lib/db"
import { currentUser } from "@clerk/nextjs/server"

export async function onBoardUser(){
    //console.log("db url =====", process.env.DATABASE_URL)
    try {
        const user = await currentUser()

        if(!user){
            return {
                success: false,
                error: "User not found"
            }
        }

        const {id, firstName, lastName, emailAddresses, imageUrl} = user;
        const newUser = await db.user.upsert({
            where: {
                clerkId: id
            },
            update: {
                name: 
                    (firstName && lastName) ? (`${firstName} ${lastName}`) : (firstName || lastName || null),
                image: imageUrl || null,
                email: emailAddresses[0]?.emailAddress || ""
            },
            create: {
                clerkId: id,
                name: 
                    (firstName && lastName) ? (`${firstName} ${lastName}`) : (firstName || lastName || null),
                image: imageUrl || null,
                email: emailAddresses[0]?.emailAddress || ""
                
            }
        });

        return {
            success: true,
            user: newUser,
            message: "User onBoarded successfully"
        }
    } catch (error) {
        console.log("Error onBoarding user", error)
        if(error instanceof Error){
            return {
                success: false,
                error: error.message
            }
        }
        return {
            success: false,
            error: "Failed to onboard user"
        }
    }
}

export async function getCurrentUser(){

    try {
        
        const user = await currentUser();
        if(!user){
            return null;
        }
        const dbUser = await db.user.findUnique({
            where: {
                clerkId: user.id
            },
            select: {
                id: true,
                email: true,
                name: true,
                image: true,
                clerkId: true
            }
        })
        return dbUser
    } catch (error) {
        console.error('error in fetching current user', error)
        return null
    }
}