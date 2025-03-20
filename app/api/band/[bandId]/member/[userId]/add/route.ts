export const dynamic = 'force-dynamic' // defaults to auto
import prisma from "@/app/lib/prisma";

interface AddMemberInput {
    userId: string;
    bandId: string;
}

/**
 * Handles a POST request to add a member to a band.
 *
 * This function awaits input parameters containing a user identifier and a band identifier to connect the user as a member of the band using a Prisma client.
 * It returns a JSON response with an empty object and status 200 on success, or a JSON response with error details and status 500 on failure.
 *
 * @param request - The incoming HTTP request.
 * @param props - An object with a promise that resolves to input data containing a `userId` and a `bandId` for the member addition.
 * @returns A JSON response with status 200 on success or status 500 containing error details on failure.
 */
export async function POST(request: Request, props: { params: Promise<AddMemberInput> }) {
    const { userId, bandId } = await props.params;

    try {
        await prisma?.band.update({
            where: {
                id: bandId,
            },
            data: {
                members: {
                    connect: {
                        id: userId
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