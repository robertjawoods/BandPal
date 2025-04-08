import prisma from "@/app/lib/prisma";

export async function GET(req: Request, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;

    if (!params.id) {
        return Response.json("Band ID is required", { status: 400 });
    }

    const band = await prisma.band.findFirst({
        where: {
            id: params.id,
        },
        include: {
            members: true,
            admin: true,
        },
    });

    if (!band) {
        return Response.json("Band not found", { status: 404 });
    }

    return Response.json(band, { status: 200 });
}