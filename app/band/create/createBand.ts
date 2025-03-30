"use server"

import { Band } from "@prisma/client";
import { redirect } from "next/navigation";
import prisma from "@/app/lib/prisma";
import { actionClient } from "@/app/lib/safe-action";
import { zfd } from "zod-form-data";
import { z } from "zod";

const schema = zfd.formData({
    name: z.string().nonempty(),
    userId: z.string(),
});

type CreateBandInput = z.infer<typeof schema>;

export const createBandAction = actionClient
    .schema(schema)
    .action(createBand);

export async function createBand({ parsedInput: { name, userId } }: { parsedInput: CreateBandInput }) {
    if (!userId) {
        redirect('/')
    }

    let band: Band | null = null;
    try {
        console.log(userId);

        if (!userId) {
            throw new Error('User not found');
        }

        band = await prisma.band.create({
            data: {
                name: name,
                admin: {
                    connect: {
                        id: userId
                    }
                },
                members: {
                    connect: {
                        id: userId
                    }
                },
            }
        });

        if (!band) {
            throw new Error("Band not created");
        }

    } catch (e) {
        console.log(e)
    }

    if (band)
        redirect(`/band/${band.id}`);
}

