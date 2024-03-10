'use client'

import { User } from "@prisma/client";
import Link from "next/link";
import { useRouter } from 'next/navigation';

export default function Members({ members, bandId }: { members: User[], bandId: string }) {
    const router = useRouter();

    const removeMember = async (userId: string) => {
        const response = await fetch(`/api/band/${bandId}/remove-member`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId }),
        });

        if (response.ok) {

            // nasty hack to force a re-render
            router.refresh();
        }
    }

    return (
        <div>
            {members.map(m => {
                return <div key={m.id}>
                    <Link href={`/user/${m.id}`}>{m.name}</Link>
                    <button onClick={e => removeMember(m.id)}>Remove</button>
                </div>
            })}
        </div>
    );
}