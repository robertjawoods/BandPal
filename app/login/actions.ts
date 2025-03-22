'use server'

import { revalidatePath } from 'next/cache'
import { redirect, RedirectType } from 'next/navigation'
import { createClient } from '@/app/lib/supabase/server'
import { AuthError } from '@supabase/supabase-js';

export const getURL = async () => {
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL ??
    process?.env?.NEXT_PUBLIC_VERCEL_URL ??
    'http://localhost:3000/'

  url = url.startsWith('http') ? url : `https://${url}`

  url = url.endsWith('/') ? url : `${url}/`
  return url
}

const parseAuthError = (error: AuthError): string => {
  console.error(error)

  switch (error.message) {
    case 'INVALID_PASSWORD':
      return 'Invalid password'
    case 'USER_NOT_FOUND':
      return 'User not found'
    default:
      return 'An error occurred'
  }
}
export async function login(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    console.error(error)
    redirect(`/error?message=${parseAuthError(error)}`, RedirectType.push)
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  console.log(data)

  const { error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      emailRedirectTo: await getURL(),
    },
  })

  if (error) {
    redirect(`/error?message=${parseAuthError(error)}`, RedirectType.push)
  }
  revalidatePath('/', 'layout')
  redirect('/')
}

export async function google() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.signInWithOAuth({ provider: 'google' });

  console.log(data)

  if (data.url)
    redirect(data.url)

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}