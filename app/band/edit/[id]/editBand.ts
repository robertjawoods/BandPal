"use server"

import { Band } from "@prisma/client";
import { redirect } from "next/navigation";
import prisma from "@/app/lib/prisma";
import { zfd } from "zod-form-data";
import { z } from "zod";
import { actionClient } from "@/app/lib/safe-action";

const schema = zfd.formData({
    id: z.string(),
    name: z.string().nonempty(),
    bio: z.string().optional(),
    lookingForMembers: z.boolean({ coerce: true }),
    genre: z.string().optional()
});

type EditBandInput = z.infer<typeof schema>;

export const editBandAction = actionClient
    .schema(schema)
    .action(editBand);

async function editBand({ parsedInput: { id, name, bio, lookingForMembers, genre } }: { parsedInput: EditBandInput }) {
    let band: Band | null = null;
    try {

        band = await prisma.band.update({
            where: {
                id: id
            },
            data: {
                name,
                bio,
                lookingForMembers,
                genre
            }
        });

        if (!band) {
            throw new Error("Band not created");
        }

        console.log(band);

    } catch (e) {
        console.log(e)
    }

    if (band)
        redirect(`/band/${band.id}`);
}