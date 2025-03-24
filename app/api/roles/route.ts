import prisma from "@/app/lib/prisma";

export async function GET(_: Request) {
    const roles = await prisma?.role.findMany();

    return Response.json(roles, { status: 200 })
}