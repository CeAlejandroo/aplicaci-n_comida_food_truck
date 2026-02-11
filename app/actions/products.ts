'use server'

import { createClient } from '@/lib/supabase/server'

export async function getProducts(categoriaId?: string) {
  const supabase = await createClient()

  let query = supabase
    .from('productos')
    .select(`
      *,
      categoria:categorias(*)
    `)
    .eq('disponible', true)
    .order('nombre')

  if (categoriaId) {
    query = query.eq('categoria_id', categoriaId)
  }

  const { data: products } = await query

  return products || []
}

export async function getProduct(id: string) {
  const supabase = await createClient()

  const { data: product } = await supabase
    .from('productos')
    .select(`
      *,
      categoria:categorias(*)
    `)
    .eq('id', id)
    .single()

  return product
}

export async function getCategories() {
  const supabase = await createClient()

  const { data: categories } = await supabase
    .from('categorias')
    .select('*')
    .order('nombre')

  return categories || []
}
