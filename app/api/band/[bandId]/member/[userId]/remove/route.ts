export const dynamic = 'force-dynamic' // defaults to auto

import prisma from "@/app/lib/prisma";

interface AddMemberInput {
    userId: string;
    bandId: string;
}

/**
 * Removes a member from a band.
 *
 * This function handles a POST request that disconnects a user from a band's member list.
 * It awaits the provided parameters to extract the user and band identifiers, then updates the
 * corresponding band record in the database. A successful update returns an empty JSON response
 * with a status of 200, whereas any error encountered results in a JSON response with an error detail
 * and a status of 500.
 *
 * @param props.params - A promise resolving to an object containing:
 *   - userId: The ID of the user to remove.
 *   - bandId: The ID of the band from which the user is removed.
 *
 * @returns A JSON response indicating the result of the operation.
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