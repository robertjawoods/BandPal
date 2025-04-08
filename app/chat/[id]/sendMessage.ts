"use server"

import prisma from "@/app/lib/prisma";
import { zfd } from "zod-form-data";
import { z } from "zod";
import { actionClient } from "@/app/lib/safe-action";
import { getUser } from "@/app/lib/supabase/server";

const schema = zfd.formData({
    message: z.string().nonempty(),
    chatId: z.string().nonempty(),
});

type SendMessageInput = z.infer<typeof schema>;

export async function sendMessage({ parsedInput: { chatId, message } }: { parsedInput: SendMessageInput }) {
    const { user } = await getUser();

    if (!user) {
        throw new Error('User not found');
    }

    const chat = await prisma.chat.findFirst({
        where: {
            id: chatId,
            members: {
                some: {
                    id: user.id
                }
            }
        }
    });

    if (!chat) {
        throw new Error('Chat not found');
    }

    await prisma.message.create({
        data: {
            content: message,
            chatId,
            senderId: user.id,
        }
    });
}

export const sendMessageAction = actionClient.
    schema(schema).
    action(sendMessage);