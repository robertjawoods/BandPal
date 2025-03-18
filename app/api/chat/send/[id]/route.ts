export const dynamic = 'force-dynamic' // defaults to auto
import prisma from "@/app/lib/prisma";

interface SendMessageInput {
    userId: string;
    chatId: string;
    message: string;
}

export async function PUT(request: Request) {
    const { userId, chatId, message } = await request.json() as SendMessageInput;

    const chat = await prisma?.chat.findUnique({ where: { id: chatId }, include: { members: true } })

    const recipient = chat?.members.find(member => member.id !== userId)

    if (!recipient) {
        return Response.json({ error: 'Recipient not found' }, { status: 404 })
    }

    const messageData = await prisma?.message.create({
        data: {
            chatId,
            senderId: userId,
            content: message,
            createdAt: new Date(),
        }, 
    })
    
    return Response.json({ message: messageData })
}