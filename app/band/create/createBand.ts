"use server"

import { Band } from "@prisma/client";
import { redirect } from "next/navigation";
import prisma from "@/app/lib/prisma";
import { User } from "@supabase/supabase-js";

export async function createBand(formData: FormData, user: User | null) {
    if (!user) {
        redirect('/')
    }

    let band: Band | null = null;
    try {
        console.log(user);

        if (!user) {
            throw new Error('User not found');
        }

        band = await prisma.band.create({
            data: {
                name: formData.get('name')?.toString()!,
                userId: user.id,
                members: {
                    connect: {
                        id: user.id
                    }
                },
            }
        });

        if (!band) {
            throw new Error("Band not created");
        }

        await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                bands: {
                    connect: {
                        id: band.id
                    }
                },
                administrator: {
                    connect: {
                        id: band.id
                    }
                }
            },
            include: {
                bands: true,
                administrator: true
            }
        });

        console.log(band);
        console.log(user)


    } catch (e) {
        console.log(e)
    }

    if (band)
        redirect(`/band/${band.id}`);
};