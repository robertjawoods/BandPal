export const dynamic = 'force-dynamic' // defaults to auto

import prisma from "@/app/lib/prisma"

/**
 * Retrieves chat records for a specified user.
 *
 * This asynchronous function awaits the resolution of route parameters to extract a user ID. It queries the database
 * for chat entries where the user is a member, including related members and the latest message for each chat. If
 * the user ID is missing, it returns an error response.
 *
 * @param request - The incoming HTTP request.
 * @param props - An object containing a promise that resolves to the route parameters, including the user ID.
 *
 * @returns A JSON response with the matched chat records and a 200 status code, or an error response if the ID is absent.
 */
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