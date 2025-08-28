import { prisma } from '$lib/server/db';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { slugify } from '$lib';
import type { Band } from '@prisma/client';

export const load: PageServerLoad = async ({ locals, params }) => {
    const session = await locals.auth();

    const slug = params.slug;
    if (!slug) {
        throw fail(400, { message: 'slug is required' });
    }

    const band = await prisma.band.findFirst({
        where: { slug },
        include: {
            members: { select: { id: true, displayName: true } },
            influences: true
        }
    });

    if (!band) {
        throw fail(404, { message: 'Band not found' });
    }

    if (band.ownerId != session?.profileId) {
        throw fail(403, { message: 'You do not have permission to edit this band' });
    }

    return {
        session,
        band
    };
};

function validateBandForm(formData: FormData) {
    const bandName = formData.get('bandName');
    const bandId = formData.get('id');
    const influenceIds = formData.getAll('influences[]').filter(Boolean) as string[];
    const description = formData.get('description') as string | null;
    if (typeof bandName !== 'string' || !bandName.trim()) {
        return { error: fail(400, { message: 'Invalid band name' }) };
    }
    if (typeof bandId !== 'string' || !bandId.trim()) {
        return { error: fail(400, { message: 'Invalid band ID' }) };
    }
    return { bandName, bandId, influenceIds, description };
}

async function authorizeBandEdit(bandId: string, session: any) {
    const band = await prisma.band.findUnique({ where: { id: bandId } });
    if (!band) return { error: fail(404, { message: 'Band not found' }) };
    if (band.ownerId !== session.profileId) {
        return { error: fail(403, { message: 'You do not have permission to edit this band' }) };
    }
    return { band };
}

async function updateBand(
    bandId: string,
    bandName: string,
    description: string | null,
    influenceIds: string[]
) {
    return prisma.band.update({
        where: { id: bandId },
        include: { influences: true },
        data: {
            name: bandName,
            description,
            slug: slugify(bandName),
            influences: { set: influenceIds.map((id) => ({ id })) }
        }
    });
}

export const actions = {
    editBand: async (event) => {
        const session = await event.locals.auth();
        if (!session) return fail(401, { message: 'Not authenticated' });

        const formData = await event.request.formData();
        const validated = validateBandForm(formData);
        if (validated.error) return validated.error;
        const { bandName, bandId, influenceIds, description } = validated;

        const authz = await authorizeBandEdit(bandId, session);
        if (authz.error) return authz.error;

        let updated: Band | undefined;
        try {
            updated = await updateBand(bandId, bandName, description, influenceIds);
        } catch (err) {
            return fail(500, { message: 'Failed to update band' });
        }
        if (updated) {
            throw redirect(303, `/band/${updated.slug}`);
        } else {
            return fail(500, { message: 'Failed to update band' });
        }
    }
} satisfies Actions;
