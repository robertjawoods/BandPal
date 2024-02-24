
import { auth } from "@/app/auth";
import prisma from "@/app/lib/prisma";
import { Band, Prisma } from "@prisma/client";

// import { object, string } from 'yup';

// let bandSchema = object({
//     name: string().required(),
// });

import { redirect } from 'next/navigation'

export default async function () {
    const session = await auth();

    const submit = async (formaData: FormData) => {
        "use server"
        if (!session || !session.user) {
            redirect('/')
        }

        const rawData: Prisma.BandCreateArgs = {
            data: {
                name: formaData.get('name')?.toString()!,
                userId: session.user.id!
            }
        }
        let band: Band | null = null;
        try {
            band = await prisma.band.create(rawData);

            console.log(band);


        } catch (e) {
            console.log(e)
        }

        if (band)
            redirect(`/band/${band.id}`);
    };

    return <>
        <form action={submit}>
            <label htmlFor="name">Band Name:</label>
            <input type="text" name="name" />
            <input type="submit" value="Create" />
        </form>
    </>
}