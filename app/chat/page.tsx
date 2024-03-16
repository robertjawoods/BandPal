'use client'

import { useEffect, useState } from "react";
// import { auth } from "../auth";
import UserSearch from "../components/UserSearch";
import Link from "next/link";
import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";

export default function Chat() {
    const session = useSession();

    // const router = useRouter();

    // if (session.status === 'unauthenticated') {
    //     console.log('redirecting to login')
    //     // redirect to login
    //     router.push('/api/auth/signin');
    // }

    const [chats, setChats] = useState([]);
    const [displayUserSearch, setDisplayUserSearch] = useState(false);

    console.log(session.data?.user);

    useEffect(() => {
        if (!session.data?.user) {
            return;
        }

        async function getChats() {
            const response = await fetch(`api/chat/all/${session?.data?.user?.id}/`, {
                method: 'GET',
            });

            // type this response
            const data = await response.json();

            console.log(data);

            setChats(data);
        }

        getChats();
    }, [session]);

    const createChatCallback = async (item: any) => {
        fetch(`/api/chat/create`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ toUserId: item.objectID, fromUserId: session?.data?.user?.id }),
        });

        setDisplayUserSearch(false);
    }


    return (
        <div>
            <h1>Chat</h1>

            {displayUserSearch ? <UserSearch submitCallback={createChatCallback} /> 
            : <Link href='#' className="rounded bg-blue-400" onClick={() => setDisplayUserSearch(true)}>Start a new chat</Link>}

            {chats.map((chat: any) => {
                return <div key={chat.id}>
                    <Link href={`/chat/${chat.id}`}>
                        {(chat.members as []).filter((m: any) => m.id !== session.data?.user?.id).map((member: any) => {
                            return <div key={member.id}>{member.name}</div>
                        })}
                    </Link>
                </div>
            })}
        
        </div>
    );
}