import prisma from "@/app/lib/prisma";
import { createClient } from "@/app/lib/supabase/server";

import Image from "next/image";
import Link from "next/link";
import CreateChat from "../../components/chat/CreateChat";

export default async function User(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const user = await prisma.user.findFirst({
        where: {
            id: params.id
        },
        include: {
            bands: true,
            profile: {
                include: {
                    influences: true,
                    role: true,
                },
            }
        }
    });

    const supabase = await createClient();

    const { data: { user: currentUser } } = await supabase.auth.getUser();

    const isMe = currentUser?.id === user?.id;

    return (
        <>
            <h1 data-testid='name'>{user?.name}</h1>
            <Link href={`/user/edit/${user?.id}`}>Edit</Link>
            {user?.profile?.image && <Image src={user?.profile?.image} alt={user?.name ?? ''} width={200} height={200} className="rounded-full" />}

            {!isMe && user?.profile?.allowMessages && <CreateChat currentUserId={currentUser?.id ?? ""} userId={user?.id ?? ""} />}

            <h2>Bio</h2>
            <p data-testid='bio'>{user?.profile?.bio}</p>

            <h2>Location</h2>
            <p data-testid='location'>{user?.profile?.location}</p>

            <div data-testid='influences'>
                <h2>Influences</h2>
                {user?.profile?.influences && user.profile.influences.length > 0
                    ? <ul>
                        {user?.profile?.influences?.map(influence => (
                            <li key={influence.id}>{influence.name}</li>
                        ))}
                    </ul>
                    : <p>No influences listed</p>
                }
            </div>

            <div data-testid='roles'>
                {
                    user?.profile?.role && (
                        <>
                            <h2>Role</h2>
                            <p>{user?.profile?.role.map(r => {
                                return r.name;
                            })}</p>
                        </>
                    )
                }
            </div>

            <div data-testid='bands'>
                <h2>Bands</h2>
                <ul>
                    {user?.bands.map(band => (
                        <li key={band.id}>
                            <Link href={`/band/${band.id}`}>{band.name}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}