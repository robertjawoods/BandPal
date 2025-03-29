'use server'

import { SupabaseClient } from '@supabase/supabase-js';
import { getURL } from '@/app/login/actions';
import { Prisma } from '@prisma/client';
import { redirect } from 'next/navigation';
import { zfd } from 'zod-form-data';
import { z } from 'zod';
import { actionClient } from '@/app/lib/safe-action';
import { createClient } from '@/app/lib/supabase/server';

const schema = zfd.formData({
  userId: z.string(),
  name: z.string().nonempty(),
  bio: z.string().optional(),
  location: z.string().optional(),
  roleIds: z.preprocess(val => {
    if (typeof val === "string") {
      try {
        return JSON.parse(val);
      } catch {
        return [];
      }
    }
    return val;
  }, z.array(z.string())),
  allowMessages: z.boolean({ coerce: true }).optional(),
  lookingForBand: z.boolean({ coerce: true }).optional(),
  isPublic: z.boolean({ coerce: true }).optional(),
  image: zfd.file(z.instanceof(File).optional())
});

type EditInput = z.infer<typeof schema>;

async function updateUser(
  { parsedInput: { name, bio, location, roleIds, image, allowMessages, isPublic, lookingForBand, userId } }: { parsedInput: EditInput }
) {
   const supabase = await createClient();

  const { error } = await supabase.auth.getSession();
  
  if (error) {
    console.error("Error getting user", error.message);
    throw new Error("Failed to get user.");
  }

  let publicUrl = await uploadImage(image, userId, supabase);

  const data: Prisma.UserUpdateInput = {
    name,
    profile: {
      update: {
        bio,
        location,
        role: {
          set: roleIds?.map(role => ({ id: role }))
        },
        allowMessages,
        lookingForBand,
        isPublic,
        image: (publicUrl && { set: publicUrl }) || undefined,
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

export const updateAction = actionClient
  .schema(schema)
  .action(updateUser);

async function uploadImage(image: File | undefined, userId: string, supabase: SupabaseClient) {
  let publicImageUrl = "";
  if (image && image.size > 0) {
    const fileExt = image.name.split('.').pop();
    const fileName = `${userId}-${Date.now()}.${fileExt}`;

    console.log("Uploading image", fileName);

    const { data: uploadData, error: uploadError } = await supabase
      .storage
      .from('avatars') // bucket name
      .upload(fileName, image, {
        cacheControl: '3600',
        upsert: true,
        contentType: image.type,
      });

    console.log(uploadError);

    if (uploadError) {
      console.error("Error uploading image:", uploadError.message);
      throw new Error("Image upload failed.");
    }

    const { data } = supabase
      .storage
      .from('avatars')
      .getPublicUrl(uploadData.path);

    publicImageUrl = data.publicUrl;
  }
  return publicImageUrl;
}
