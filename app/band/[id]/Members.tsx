'use client'

import { User } from "@prisma/client";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { RemoveIcon } from "./RemoveIcon";

/**
 * Renders a list of band members with optional removal functionality.
 *
 * Maps through the provided band members and displays each as a link to their profile. If the current user is the band owner, a remove button is shown, which sends a POST request to remove the member and refreshes the page upon success.
 *
 * @param members - An array of user objects representing the band members.
 * @param bandId - The band identifier used in API requests.
 * @param isOwner - A flag indicating whether the current user has permission to remove members.
 *
 * @remarks
 * The removal process calls the API endpoint `/api/band/${bandId}/member/remove/${userId}` and leverages Next.js’s router refresh method to update the UI after a successful member removal.
 */
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