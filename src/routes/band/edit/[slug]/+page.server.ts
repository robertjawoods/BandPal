import { prisma } from "$lib/server/db";
import { error, fail, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { slugify } from "$lib";

export const load: PageServerLoad = async ({ locals, params }) => {
    const session = await locals.auth();

    const slug = params.slug;
    if (!slug) {
        throw fail(400, { message: "slug is required" });
    }

    const band = await prisma.band.findFirst({
        where: { slug },
        include: {
            members: { select: { id: true, displayName: true } },
            influences: true,
        }
    });

    if (!band) {
        throw fail(404, { message: "Band not found" });
    }

    if (band.ownerId != session?.profileId) {
        throw fail(403, { message: "You do not have permission to edit this band" });
    }

    return {
        session,
        band
    };
};

export const actions = {
    editBand: async (event) => {
        const session = await event.locals.auth();
        if (!session) {
            return fail(401, { message: "Not authenticated" });
        }

        const formData = await event.request.formData();
        const bandName = formData.get("bandName");
        const bandId = formData.get("id");

        if (!bandName || typeof bandName !== "string") {
            return fail(400, { message: "Invalid band name" });
        }

        if (!bandId || typeof bandId !== "string") {
            return fail(400, { message: "Invalid band ID" });
        }

        const existingBand = await prisma.band.findUnique({
            where: { id: bandId }
        });

        if (!existingBand) {
            return fail(404, { message: "Band not found" });
        }

        if (existingBand.ownerId !== session.profileId) {
            return fail(403, { message: "You do not have permission to edit this band" });
        }

        const description = formData.get("description") as string | null;

        const result = await prisma.band.update({
            where: { id: bandId },
            data: {
                name: bandName,
                description,
                slug: slugify(bandName)
            }
        });

        if (!result) {
            return fail(500, { message: "Failed to update band" });
        }

        throw redirect(303, `/band/${result.slug}`);
    }
};