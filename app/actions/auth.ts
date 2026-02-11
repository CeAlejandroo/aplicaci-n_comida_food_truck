'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function signUp(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const nombre = formData.get('nombre') as string
  const telefono = formData.get('telefono') as string
  const direccion = formData.get('direccion') as string

  console.log('[v0] Attempting sign up with email:', email)

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || 'http://localhost:3000/menu',
      data: {
        nombre,
        telefono,
        direccion,
      },
    },
  })

  if (error) {
    console.log('[v0] Sign up error:', error.message)
    return redirect('/registro?error=' + encodeURIComponent(error.message))
  }

  console.log('[v0] Sign up successful, user:', data.user?.email)
  revalidatePath('/', 'layout')
  redirect('/menu')
}

export async function signIn(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  console.log('[v0] Attempting sign in with email:', email)

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    console.log('[v0] Sign in error:', error.message)
    return redirect('/login?error=' + encodeURIComponent(error.message))
  }

  console.log('[v0] Sign in successful, user:', data.user?.email)
  revalidatePath('/', 'layout')
  redirect('/menu')
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/login')
}

export async function getUser() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

export async function getProfile() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) return null

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  return profile
}

export async function updateProfile(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'No autenticado' }
  }

  const nombre = formData.get('nombre') as string
  const telefono = formData.get('telefono') as string
  const direccion = formData.get('direccion') as string

  const { error } = await supabase
    .from('profiles')
    .update({
      nombre,
      telefono,
      direccion,
      updated_at: new Date().toISOString(),
    })
    .eq('id', user.id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/cuenta')
  redirect('/cuenta')
}
