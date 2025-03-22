'use server'

import { getURL } from '@/app/login/actions';
import { Prisma } from '@prisma/client';
import { redirect } from 'next/navigation';

export async function updateUser(formData: FormData) {
    const userId = formData.get("userId") as string;
    const roles = formData.getAll("roleIds[]") as string[];
  
    const data: Prisma.UserUpdateInput = {
      name: formData.get("name") as string,
      profile: {
        update: {
          bio: formData.get("bio") as string,
          location: formData.get("location") as string,
          role: {
            set: roles.map(role => ({ id: role }))
          },
          allowMessages: formData.get("allowMessages") === "on",
          lookingForBand: formData.get("lookingForBand") === "on",
          isPublic: formData.get("isPublic") === "on",
          // TODO: fix file input, use supabase storage to upload image
          // image: (formData.get("image") as File)?.name || undefined,
        }
      },
    };
  
    const response = await fetch(`${await getURL()}/api/user/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
  
    if (!response.ok) {
      console.error("Network response was not ok", response.statusText);
      const errorData = await response.json();
      throw new Error(`Failed to update user: ${errorData.message || response.statusText}`);
    }
  
    redirect(`/user/${userId}`);
  }
  