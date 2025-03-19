'use client'

import { useUser } from "@/app/lib/hooks/useUser";
import { use } from "react";
import { sendMessage } from "./sendMessage";
import { useChat } from "@/app/lib/hooks/useChat";

export default function ViewChat(props: { params: Promise<{ id: string }> }) {
    const params = use(props.params);

    const { user, error, loading } = useUser();

    const { chat } = useChat(params.id);

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        console.log(error);

        return <div>Error</div>
    }

    if (!chat) {
        return <div>Chat not found</div>
    }

    return (
        <div>
            <h1>Chat</h1>
            <h2>Members</h2>
            <ul>
                {chat.members.map(member => (
                    <li key={member.id}>
                        {member.name ?? member.email}
                    </li>
                ))}
            </ul>
            <h2>Messages</h2>
            <ul>
                {chat.messages?.map(message => (
                    <li key={message.id}>
                        {message.sender.name ?? message.sender.email}: {message.content}
                    </li>
                ))}
            </ul>

            <form action={data => sendMessage(data, user)}>
                <label htmlFor="message">Message</label>
                <input type="text" name="message" placeholder="Enter your message" />
                <input type="hidden" name="chatId" value={chat.id} />
                <input type="hidden" name="userId" value={user?.id} />
                <button>Send</button>
            </form>
        </div>
    );

}