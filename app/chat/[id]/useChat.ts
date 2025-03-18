import { useState, useEffect } from "react";
import { createClient } from "@/app/lib/supabase/client";
import { Message, type Chat } from "@prisma/client";

type ChatWithMessages = Chat & {
  members: Array<{ id: string; name?: string | null; email: string }>;
  messages: Array<Message & { sender: { id: string; name?: string | null; email: string } }>;
};

export function useChat(chatId: string) {
  const [chat, setChat] = useState<ChatWithMessages | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const supabase = createClient();

  // Fetch chat data
  useEffect(() => {
    async function getChat() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/chat/${chatId}/`, {
          method: 'GET',
        });
        if (!response.ok) {
          throw new Error("Failed to fetch chat data");
        }
        const responseData = await response.json();
        setChat(responseData.chat);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    getChat();
  }, [chatId]);

  // Subscribe to realtime chat updates
  useEffect(() => {
    const subscription = supabase.channel(`chat:${chatId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "Message",
          filter: `chatId=eq.${chatId}`,
        },
        (payload: any) => {
          setChat((prevChat) => {
            if (!prevChat) return prevChat;
            // Find the sender among chat members
            const sender = prevChat.members.find(member => member.id === payload.new.senderId);
            // Create a new message with sender data, adding a safeguard if sender is not found
            const newMessage = {
              ...payload.new as Message,
              sender: sender || { id: payload.new.senderId, name: "Unknown", email: "" },
            };
            return {
              ...prevChat,
              messages: [...prevChat.messages, newMessage],
            };
          });
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [chatId, supabase]);

  return { chat, loading, error };
}