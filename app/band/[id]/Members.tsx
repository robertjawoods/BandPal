'use client'

import { User } from "@prisma/client";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { RemoveIcon } from "./RemoveIcon";

export default function Members({ members, bandId }: { members: User[], bandId: string }) {
    // const isAdmin = false;


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
            router.refresh();
        }
    }

    return (
        <div>
            {members.map(m => {
                return <div key={m.id} className="flex justify-center gap-1 items-center">
                    <Link href={`/user/${m.id}`}>
                        {m.name}
                    </Link>
                    <button onClick={() => removeMember(m.id)} className="hover:bg-red-500 rounded-full -scale-75 align-middle">
                        <RemoveIcon />
                    </button>
                </div>
            })}
        </div>
    );
}