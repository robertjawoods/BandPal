'use client'

import { User } from "@prisma/client";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { RemoveIcon } from "./RemoveIcon";

export default function Members({ members, bandId, isOwner }: { members: User[], bandId: string, isOwner: boolean }) {
    const router = useRouter();

    const removeMember = async (userId: string) => {
        const response = await fetch(`/api/band/${bandId}/member/remove/${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (response.ok) {
            router.refresh();
        }
    }

    const removeButton = (m: User) => 
    (
        <button type="button" title="remove member" onClick={() => removeMember(m.id)} className="hover:bg-red-500 rounded-full -scale-75 align-middle">
            <RemoveIcon />
        </button>
    );

    return (
        <div>
            {members.map(m => {
                return <div key={m.id} className="flex justify-center gap-1 items-center">
                    <Link href={`/user/${m.id}`}>
                        {m.name ?? m.email}
                    </Link>
                    {isOwner ? removeButton(m) : <></>}
                </div>
            })}
        </div>
    );
}