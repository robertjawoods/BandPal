"use server"

import { redirect } from "next/navigation";
import prisma from "@/app/lib/prisma";
import { User } from "@supabase/supabase-js";

export async function sendMessage(formData: FormData, user: User | null) {
    if (!user) {
        redirect('/')
    }

    const message = formData.get('message')?.toString();

    if (!message) {
        throw new Error('Message is required');
    }

    const chatId = formData.get('chatId')?.toString();

    if (!chatId) {
        throw new Error('Chat ID is required');
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