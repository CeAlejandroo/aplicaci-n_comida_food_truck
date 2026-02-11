import Link from "next/link"
import { ArrowLeft, Package, ChevronRight } from "lucide-react"
import { LogoWithText } from "@/components/logo"
import { MobileNav } from "@/components/mobile-nav"

const pedidos = [
  { id: "ORD-001", fecha: "02 Feb 2026", total: 265, status: "en_camino", items: 4 },
  { id: "ORD-002", fecha: "01 Feb 2026", total: 150, status: "entregado", items: 2 },
  { id: "ORD-003", fecha: "28 Ene 2026", total: 320, status: "entregado", items: 5 },
]

const statusLabels: Record<string, { label: string; color: string }> = {
  recibido: { label: "Recibido", color: "bg-blue-100 text-blue-800" },
  preparacion: { label: "En preparacion", color: "bg-yellow-100 text-yellow-800" },
  en_camino: { label: "En camino", color: "bg-primary/20 text-primary" },
  entregado: { label: "Entregado", color: "bg-green-100 text-green-800" },
}

export default function PedidoPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Mobile View */}
      <div className="md:hidden pb-20">
        <header className="sticky top-0 bg-background border-b border-border p-4 z-40">
          <div className="flex items-center justify-between">
            <Link href="/" className="p-2 -ml-2">
              <ArrowLeft className="w-6 h-6 text-foreground" />
            </Link>
            <h1 className="text-lg font-semibold text-foreground">Mis Pedidos</h1>
            <div className="w-10" />
          </div>
        </header>

        <div className="p-4 space-y-4">
          {pedidos.map((pedido) => (
            <Link
              key={pedido.id}
              href={`/pedido/${pedido.id}`}
              className="block bg-card rounded-lg border border-border p-4"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-foreground">{pedido.id}</h3>
                  <p className="text-sm text-muted-foreground">{pedido.fecha}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusLabels[pedido.status].color}`}>
                  {statusLabels[pedido.status].label}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Package className="w-4 h-4" />
                  <span className="text-sm">{pedido.items} productos</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-foreground">${pedido.total.toFixed(2)}</span>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <MobileNav />
      </div>

      {/* Desktop View */}
      <div className="hidden md:block">
        <header className="bg-card border-b border-border">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link href="/">
              <LogoWithText size="sm" />
            </Link>
            <nav className="flex items-center gap-6">
              <Link href="/menu" className="text-foreground hover:text-primary transition-colors">
                Menu
              </Link>
              <Link href="/pedido" className="text-primary font-medium">
                Mis Pedidos
              </Link>
              <Link href="/cuenta" className="text-foreground hover:text-primary transition-colors">
                Mi Cuenta
              </Link>
            </nav>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-6 py-8">
          <h1 className="text-3xl font-bold text-foreground mb-8">Mis Pedidos</h1>

          <div className="space-y-4">
            {pedidos.map((pedido) => (
              <Link
                key={pedido.id}
                href={`/pedido/${pedido.id}`}
                className="flex items-center gap-6 bg-card rounded-lg border border-border p-6 hover:border-primary/50 transition-colors"
              >
                <div className="w-16 h-16 bg-secondary rounded-lg flex items-center justify-center flex-shrink-0">
                  <Package className="w-8 h-8 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-semibold text-foreground">{pedido.id}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusLabels[pedido.status].color}`}>
                      {statusLabels[pedido.status].label}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{pedido.fecha} - {pedido.items} productos</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xl font-semibold text-foreground">${pedido.total.toFixed(2)}</span>
                  <ChevronRight className="w-6 h-6 text-muted-foreground" />
                </div>
              </Link>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
