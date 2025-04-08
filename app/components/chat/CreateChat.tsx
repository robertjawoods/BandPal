"use client"

import { getURL } from "@/app/login/actions";
import { redirect } from "next/navigation";

export default function CreateChat({ userId, currentUserId }: { userId: string, currentUserId: string }) {
    return (
        <div>
            <button onClick={async () => {
                const response = await fetch(`${await getURL()}/api/chat/create`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        fromUserId: currentUserId,
                        toUserId: userId
                    }),
                });

                console.log('response', response);

                const responseData = await response.json();

                redirect(`/chat/${responseData.id}`);
            }}>Message</button>

        </div>
    );
}