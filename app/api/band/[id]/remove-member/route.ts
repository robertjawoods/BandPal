export const dynamic = 'force-dynamic' // defaults to auto

interface AddMemberInput {
    userId: string;
}


export async function POST(request: Request, { params }: { params: { id: string } }) {
    const input = await request.json() as AddMemberInput;

    console.log(input, params.id)

    try {
        await prisma?.band.update({
            where: {
                id: params.id,
            },
            data: {
                members: {
                    disconnect: {
                        id: input.userId,
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