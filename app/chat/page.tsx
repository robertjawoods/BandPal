'use client'

import { useEffect, useState } from "react";
// import { auth } from "../auth";
import UserSearch from "../components/UserSearch";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { CreateChat } from "./CreateChat";
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

            setChats(data);
        }

        getChats();
    }, [session]);



    return (
        <div>
            <h1>Chat</h1>
            
            {session.data?.user && <CreateChat user={{ id: session.data.user.id ?? '', email: session.data.user.email ?? '' }} />}

            {chats.map((chat: any) => {
                return <div key={chat.id}>
                    <Link href={`/chat/${chat.id}`}>
                        {(chat.members as []).map((member: any) => {
                            return <div key={member.id}>{member.name}</div>
                        })}
                    </Link>
                </div>
            })}
        </div>
    );
}