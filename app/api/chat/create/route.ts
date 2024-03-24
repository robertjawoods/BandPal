export const dynamic = 'force-dynamic' // defaults to auto
import prisma from "@/app/lib/prisma";

interface CreateChatInput {
    fromUserId: string;
    toUserId: string;
}


export async function PUT(request: Request) {
    const { fromUserId, toUserId } = await request.json() as CreateChatInput;

    console.log('create chat', fromUserId, toUserId)

    const user1 = await prisma?.user.findUnique({ where: { id: fromUserId } })
    const user2 = await prisma?.user.findMany()

    console.log('user1', user1)
    console.log('user2', user2)
    
    try {
        const chat = await prisma?.chat.create({
            data: {
                members: {
                    connect: [
                        { id: fromUserId },
                        { id: toUserId },
                    ],
                },
            },
        })

        return Response.json(chat, { status: 200 })
    } catch (error) {
        console.error(`An error occurred while creating chat:`, error)

        return Response.json({ error }, { status: 500 })
    }
}