export const dynamic = 'force-dynamic' // defaults to auto

import prisma from "@/app/lib/prisma";

interface AddMemberInput {
    userId: string;
    bandId: string;
}

export async function POST(request: Request, props: { params: Promise<AddMemberInput> }) {
    const { userId, bandId } = await props.params;

    try {
        await prisma?.band.update({
            where: {
                id: bandId,
            },
            data: {
                members: {
                    disconnect: {
                        id: userId,
                    }
                },
            },
        })

        return Response.json({}, { status: 200 })
    } catch (error) {
        console.error(`An error occurred while removing member:`, error)

        return Response.json({ error }, { status: 500 })
    }
}