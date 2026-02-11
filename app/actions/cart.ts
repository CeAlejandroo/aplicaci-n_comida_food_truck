'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function getCart() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return []

  const { data: cartItems } = await supabase
    .from('carrito')
    .select(`
      *,
      producto:productos(*)
    `)
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  return cartItems || []
}

export async function addToCart(productoId: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Debes iniciar sesión para agregar al carrito' }
  }

  // Verificar si ya existe en el carrito
  const { data: existingItem } = await supabase
    .from('carrito')
    .select('*')
    .eq('user_id', user.id)
    .eq('producto_id', productoId)
    .single()

  if (existingItem) {
    // Incrementar cantidad
    const { error } = await supabase
      .from('carrito')
      .update({ cantidad: existingItem.cantidad + 1 })
      .eq('id', existingItem.id)

    if (error) return { error: error.message }
  } else {
    // Agregar nuevo item
    const { error } = await supabase
      .from('carrito')
      .insert({
        user_id: user.id,
        producto_id: productoId,
        cantidad: 1,
      })

    if (error) return { error: error.message }
  }

  revalidatePath('/carrito')
  return { success: true }
}

export async function updateCartQuantity(itemId: string, cantidad: number) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'No autenticado' }
  }

  if (cantidad <= 0) {
    return removeFromCart(itemId)
  }

  const { error } = await supabase
    .from('carrito')
    .update({ cantidad })
    .eq('id', itemId)
    .eq('user_id', user.id)

  if (error) return { error: error.message }

  revalidatePath('/carrito')
  return { success: true }
}

export async function removeFromCart(itemId: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'No autenticado' }
  }

  const { error } = await supabase
    .from('carrito')
    .delete()
    .eq('id', itemId)
    .eq('user_id', user.id)

  if (error) return { error: error.message }

  revalidatePath('/carrito')
  return { success: true }
}

export async function clearCart() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'No autenticado' }
  }

  const { error } = await supabase
    .from('carrito')
    .delete()
    .eq('user_id', user.id)

  if (error) return { error: error.message }

  revalidatePath('/carrito')
  return { success: true }
}
