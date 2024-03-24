import Link from "next/link";
import UserSearch from "../components/UserSearch";
import { useState } from "react";

interface CreateChatProps {
    user: {
        id: string,
        email: string
    },

}

export function CreateChat({ user }: CreateChatProps) {
    const [displayUserSearch, setDisplayUserSearch] = useState(false);

    const createChatCallback = async (item: any) => {
        console.log('chat', item.objectID, item.email, user?.id, user?.email)

        fetch(`/api/chat/create`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ toUserId: item.objectID, fromUserId: user?.id }),
        });

        setDisplayUserSearch(false);
    }

    return (
        <>
            {
                displayUserSearch ? <UserSearch submitCallback={createChatCallback} />
                    : <Link href='#' className="rounded bg-blue-400" onClick={() => setDisplayUserSearch(true)}>Start a new chat</Link>
            }
        </>
    )      

}