import Link from "next/link";
import { CreateChat } from "./CreateChat";
import { getUser } from "../lib/supabase/server";
import prisma from "@/app/lib/prisma";

export default async function Chat() {
    const { user, error } = await getUser();

    if (error) {
        console.log(error);

        return <div>Error</div>
    }

    const chats = await prisma?.chat.findMany({
        where: {
            members: {
                some: {
                    id: user!.id
                }
            }
        },
        include: {
            members: true
        }
    });


    return (
        <div>
            <h1>Chat</h1>

            {user && <CreateChat user={{ id: user.id ?? '', email: user.email ?? '' }} />}

            {chats?.map((chat: any) => {
                return <div key={chat.id}>
                    <Link href={`/chat/${chat.id}`}>
                        {(chat.members).filter((e: any) => e.email !== user?.email).map((member: any) => {
                            return <div key={member.id}>{member.name ?? member.email}</div>
                        })}
                    </Link>
                </div>
            })}
        </div>
    );
}