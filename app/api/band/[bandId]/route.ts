import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export async function GET(
    req: Request,
    props: { params: Promise<{ bandId: string }> }
) {
    const { bandId } = await props.params;

    console.log(bandId);

    if (!bandId) {
        return NextResponse.json({ error: "Band ID is required" }, { status: 400 });
    }

    const band = await prisma.band.findUnique({
        where: { id: bandId },
        include: {
            members: true,
            admin: true,
        },
    });

    if (!band) {
        return NextResponse.json({ error: "Band not found" }, { status: 404 });
    }

    return NextResponse.json(band);
}

export async function DELETE(req: Request, props: { params: Promise<{ bandId: string }> }) {
    const { bandId } = await props.params;

    if (!bandId) {
        return Response.json("Band ID is required", { status: 400 });
    }

    await prisma.band.delete({
        where: {
            id: bandId,
        },
    });

    return Response.json("Band deleted", { status: 200 });
}