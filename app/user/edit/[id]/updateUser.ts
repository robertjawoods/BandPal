'use server'

import { getURL } from '@/app/login/actions';
import { Prisma } from '@prisma/client';
import { redirect } from 'next/navigation';

export async function updateUser(formData: FormData) {
    const userId = formData.get('userId') as string;

    const data: Prisma.UserUpdateInput = {

        name: formData.get('name') as string,
        profile: {
            update: {
                bio: formData.get('bio') as string,
                location: formData.get('location') as string,
                role: formData.get('role') as string,
                allowMessages: formData.get('allowMessages') as string === 'on',
                lookingForBand: formData.get('lookingForBand') as string === 'on',
                isPublic: formData.get('isPublic') as string === 'on',
                // fix file input, use supabase storage to upload image
                //image: (formData.get('image') as File)?.name || undefined,
            }
        },

    };

    const response = await fetch(`${await getURL()}/api/user/${userId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        console.error('Network response was not ok', response.statusText);
    }

    redirect(`/user/${userId}`);
}