'use client'

import { useState, useTransition } from "react"
import { ProductCard } from "@/components/product-card"
import { CategoryButton } from "@/components/category-button"
import { addToCart } from "@/app/actions/cart"
import { useRouter } from "next/navigation"

type Category = {
  id: string
  nombre: string
}

type Product = {
  id: string
  nombre: string
  precio: number
  descripcion: string
  categoria_id: string
}

export function MenuClient({ 
  categories, 
  products,
  isMobile 
}: { 
  categories: Category[]
  products: Product[]
  isMobile: boolean
}) {
  const [activeCategory, setActiveCategory] = useState(categories[0]?.id || '')
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const filteredProducts = activeCategory 
    ? products.filter(p => p.categoria_id === activeCategory)
    : products

  const handleAddToCart = async (productoId: string) => {
    startTransition(async () => {
      const result = await addToCart(productoId)
      if (result?.error) {
        alert(result.error)
      } else {
        router.refresh()
      }
    })
  }

  return (
    <>
      <div className={isMobile ? "p-4" : ""}>
        <div className={`flex gap-${isMobile ? '2' : '3'} overflow-x-auto ${isMobile ? 'pb-4 -mx-4 px-4' : 'pb-2 mb-8'} scrollbar-hide`}>
          {categories.map((cat) => (
            <CategoryButton
              key={cat.id}
              label={cat.nombre}
              isActive={activeCategory === cat.id}
              onClick={() => setActiveCategory(cat.id)}
            />
          ))}
        </div>

        <div className={`grid ${isMobile ? 'grid-cols-2' : 'grid-cols-2 lg:grid-cols-4'} gap-${isMobile ? '4' : '6'}`}>
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              name={product.nombre}
              price={product.precio}
              description={product.descripcion}
              onAdd={() => handleAddToCart(product.id)}
              disabled={isPending}
            />
          ))}
        </div>
      </div>
    </>
  )
}
