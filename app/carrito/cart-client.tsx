'use client'

import { useTransition } from "react"
import { Minus, Plus, Trash2, Package } from "lucide-react"
import { updateCartQuantity, removeFromCart } from "@/app/actions/cart"
import { useRouter } from "next/navigation"

type CartItem = {
  id: string
  cantidad: number
  producto: {
    id: string
    nombre: string
    precio: number
  } | null
}

export function CartClient({ cartItems }: { cartItems: CartItem[] }) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const handleUpdateQuantity = (itemId: string, cantidad: number) => {
    startTransition(async () => {
      await updateCartQuantity(itemId, cantidad)
      router.refresh()
    })
  }

  const handleRemove = (itemId: string) => {
    startTransition(async () => {
      await removeFromCart(itemId)
      router.refresh()
    })
  }

  return (
    <>
      {cartItems.map((item) => (
        <div key={item.id} className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-card rounded-lg border border-border">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-secondary rounded-lg flex items-center justify-center flex-shrink-0">
            <Package className="w-8 h-8 md:w-10 md:h-10 text-muted-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-foreground truncate">{item.producto?.nombre}</h4>
            <p className="text-sm md:text-base text-primary font-semibold">${item.producto?.precio.toFixed(2)}</p>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <button 
              onClick={() => handleUpdateQuantity(item.id, item.cantidad - 1)}
              disabled={isPending}
              className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center bg-secondary rounded-lg hover:bg-secondary/80 transition-colors disabled:opacity-50"
            >
              <Minus className="w-4 h-4 text-foreground" />
            </button>
            <span className="w-8 text-center font-medium text-foreground">{item.cantidad}</span>
            <button 
              onClick={() => handleUpdateQuantity(item.id, item.cantidad + 1)}
              disabled={isPending}
              className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center bg-secondary rounded-lg hover:bg-secondary/80 transition-colors disabled:opacity-50"
            >
              <Plus className="w-4 h-4 text-foreground" />
            </button>
          </div>
          <button 
            onClick={() => handleRemove(item.id)}
            disabled={isPending}
            className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors disabled:opacity-50 hidden md:block"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      ))}
    </>
  )
}
