import prisma from "@/app/lib/prisma";
import { createClient } from "@/app/lib/supabase/server";

import Image from "next/image";
import Link from "next/link";
import CreateChat from "./CreateChat";

export default async function User(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const user = await prisma.user.findFirst({
        where: {
            id: params.id
        },
        include: {
            bands: true,
        }
    });

    const supabase = await createClient();

    const { data: { user: currentUser } } = await supabase.auth.getUser();

   // const isMe = currentUser?.id === user?.id;

    return (
        <>
            <h1>{user?.name}</h1>
            <Link href={`/user/edit/${user?.id}`}>Edit</Link>
            {user?.image && <Image src={user?.image} alt={user?.name ?? ''} width={200} height={200} className="rounded-full" />}

            <CreateChat currentUserId={currentUser?.id ?? ""} userId={user?.id ?? ""} />

            <h2>Bands</h2>
            <ul>
                {user?.bands.map(band => (
                    <li key={band.id}>
                        <Link href={`/band/${band.id}`}>{band.name}</Link>
                    </li>
                ))}
            </ul>
        </>
    );
}