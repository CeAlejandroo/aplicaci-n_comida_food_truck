import { Check, Clock, Truck, Package } from "lucide-react"

type OrderStatusType = "recibido" | "preparacion" | "en_camino" | "entregado"

interface OrderStatusProps {
  currentStatus: OrderStatusType
}

const statusSteps = [
  { key: "recibido", label: "Recibido", icon: Check },
  { key: "preparacion", label: "En preparacion", icon: Clock },
  { key: "en_camino", label: "En camino", icon: Truck },
  { key: "entregado", label: "Entregado", icon: Package },
]

export function OrderStatus({ currentStatus }: OrderStatusProps) {
  const currentIndex = statusSteps.findIndex((step) => step.key === currentStatus)

  return (
    <div className="space-y-4">
      {statusSteps.map((step, index) => {
        const isCompleted = index <= currentIndex
        const isCurrent = index === currentIndex
        const Icon = step.icon

        return (
          <div key={step.key} className="flex items-center gap-4">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                isCompleted
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground"
              }`}
            >
              <Icon className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <p
                className={`font-medium ${
                  isCurrent ? "text-primary" : isCompleted ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {step.label}
              </p>
              {isCurrent && (
                <p className="text-sm text-muted-foreground">Estado actual</p>
              )}
            </div>
            {isCompleted && index < currentIndex && (
              <Check className="w-5 h-5 text-primary" />
            )}
          </div>
        )
      })}
    </div>
  )
}
