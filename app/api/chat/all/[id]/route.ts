export const dynamic = 'force-dynamic' // defaults to auto

import prisma from "@/app/lib/prisma"

export async function GET(request: Request, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    if (!params.id) {
        return Response.error()
    }

    console.log('id', params.id);

    const chats = await prisma?.chat.findMany({
        where: {
            members: {
                some: {
                    id: params.id,
                },
            },
        },
        include: {
            members: true,
            messages: {
                orderBy: {
                    createdAt: 'desc',
                },
                take: 1,
            }
        },
    });

    console.log(chats);

    return Response.json(chats, { status: 200 })
}   