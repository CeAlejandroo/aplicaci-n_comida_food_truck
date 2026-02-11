"use client"

import { Package } from "lucide-react"

interface ProductCardProps {
  name: string
  price: number
  description?: string
  onAdd?: () => void
  disabled?: boolean
}

export function ProductCard({ name, price, description, onAdd, disabled }: ProductCardProps) {
  return (
    <div className="bg-card rounded-lg p-4 border border-border">
      <div className="aspect-square bg-secondary rounded-lg flex items-center justify-center mb-3">
        <Package className="w-12 h-12 text-muted-foreground" />
      </div>
      <h3 className="font-medium text-foreground">{name}</h3>
      {description && (
        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{description}</p>
      )}
      <div className="flex items-center justify-between mt-3">
        <span className="font-semibold text-foreground">${price.toFixed(2)}</span>
        <button
          onClick={onAdd}
          disabled={disabled}
          className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Agregar
        </button>
      </div>
    </div>
  )
}

export function ProductCardSmall({ name, price, quantity }: { name: string; price: number; quantity: number }) {
  return (
    <div className="flex items-center gap-3 p-3 bg-card rounded-lg border border-border">
      <div className="w-16 h-16 bg-secondary rounded-lg flex items-center justify-center flex-shrink-0">
        <Package className="w-8 h-8 text-muted-foreground" />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-foreground truncate">{name}</h4>
        <p className="text-sm text-muted-foreground">Cantidad: {quantity}</p>
      </div>
      <span className="font-semibold text-foreground">${(price * quantity).toFixed(2)}</span>
    </div>
  )
}
