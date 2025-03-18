"use server"

import { Band } from "@prisma/client";
import { redirect } from "next/navigation";
import prisma from "@/app/lib/prisma";

export async function editBand(formData: FormData) {

    let band: Band | null = null;
    try {
        const id = formData.get('id')?.toString();
        const name = formData.get('name')?.toString();
        const bio = formData.get('bio')?.toString();
        const lookingForMembers = formData.get('lookingForMembers')?.toString();
        const genre = formData.get('genre')?.toString();

        band = await prisma.band.update({
            where: {
                id: id
            },
            data: {
                name,
                bio,
                lookingForMembers: lookingForMembers === 'on',
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