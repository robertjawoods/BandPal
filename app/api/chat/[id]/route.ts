export const dynamic = 'force-dynamic' // defaults to auto
import prisma from "@/app/lib/prisma";

export async function GET(_: Request, props: { params: Promise<{ id: string }> }) {
    const id = (await props.params).id;

    const chat = await prisma?.chat.findUnique({
        where: { id: id }, include: {
            members: true, messages: {
                orderBy: { createdAt: 'asc' },
                include: { sender: true }
            }
        }
    })

    return Response.json({ chat })
}