export const dynamic = 'force-dynamic' // defaults to auto
import prisma from "@/app/lib/prisma";

interface AddMemberInput {
    userId: string;
}


export async function POST(request: Request, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const input = await request.json() as AddMemberInput;

    console.log(input, params.id)

    try {
        await prisma?.band.update({
            where: {
                id: params.id,
            },
            data: {
                members: {
                    connect: {
                        id: input.userId,
                    },
                },
            },
        })

        return Response.json({}, { status: 200 })
    } catch (error) {
        console.error(`An error occurred while adding member:`, error)

        return Response.json({ error }, { status: 500 })
    }
}