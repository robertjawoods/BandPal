'use client'

import { useEffect, useState } from "react";
// import { auth } from "../auth";
//import UserSearch from "../components/UserSearch";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { CreateChat } from "./CreateChat";
import { createClient } from "../lib/supabase/client";
// import { useRouter } from "next/navigation";

export default function Chat() {
    const supabase = createClient();
    const session = supabase.auth.getUser();


    // const router = useRouter();

    // if (session.status === 'unauthenticated') {
    //     console.log('redirecting to login')
    //     // redirect to login
    //     router.push('/api/auth/signin');
    // }

    const [chats, setChats] = useState([]);

    useEffect(() => {      
        async function getChats() {
            const {data, error} = await supabase.auth.getUser();

            const response = await fetch(`api/chat/all/${data?.user?.id}/`, {
                method: 'GET',
            });

            // type this response
            const responseData = await response.json();

            setChats(responseData);
        }

        getChats();
    }, []);



    return (
        <div>
            <h1>Chat</h1>
            
            { data?.user && <CreateChat user={{ id: session.data.user.id ?? '', email: session.data.user.email ?? '' }} />}

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