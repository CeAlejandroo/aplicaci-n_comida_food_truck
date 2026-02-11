import Link from "next/link"
import { CheckCircle } from "lucide-react"
import { LogoWithText } from "@/components/logo"

export default function PedidoConfirmadoPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        
        <h1 className="text-2xl font-bold text-foreground mb-2">Pedido confirmado</h1>
        <p className="text-muted-foreground mb-2">Tu pedido ha sido recibido</p>
        <p className="text-lg font-semibold text-foreground mb-8">Numero de pedido: ORD-001</p>

        <div className="bg-card rounded-lg border border-border p-6 w-full max-w-md mb-8">
          <h2 className="font-semibold text-foreground mb-4">Proximos pasos</h2>
          <ul className="text-left space-y-3 text-muted-foreground">
            <li className="flex gap-3">
              <span className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 text-primary text-sm font-medium">1</span>
              <span>Estamos preparando tu pedido</span>
            </li>
            <li className="flex gap-3">
              <span className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 text-primary text-sm font-medium">2</span>
              <span>Un repartidor lo llevara a tu direccion</span>
            </li>
            <li className="flex gap-3">
              <span className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 text-primary text-sm font-medium">3</span>
              <span>Paga en efectivo al recibir</span>
            </li>
          </ul>
        </div>

        <div className="space-y-3 w-full max-w-md">
          <Link
            href="/pedido/ORD-001"
            className="block w-full bg-primary text-primary-foreground text-center py-4 rounded-lg font-medium"
          >
            Seguir pedido
          </Link>
          <Link
            href="/"
            className="block w-full border border-border text-foreground text-center py-4 rounded-lg font-medium"
          >
            Volver al inicio
          </Link>
        </div>
      </div>

      <footer className="p-6 flex justify-center">
        <LogoWithText size="sm" />
      </footer>
    </div>
  )
}
