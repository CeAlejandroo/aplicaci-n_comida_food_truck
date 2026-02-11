import Link from "next/link"
import { ArrowLeft, Package } from "lucide-react"
import { LogoWithText } from "@/components/logo"
import { MobileNav } from "@/components/mobile-nav"
import { OrderStatus } from "@/components/order-status"

const pedidoData = {
  id: "ORD-001",
  fecha: "02 Feb 2026",
  status: "en_camino" as const,
  items: [
    { id: 1, name: "Hamburguesa Clasica", price: 85, quantity: 2 },
    { id: 2, name: "Tacos al Pastor", price: 45, quantity: 1 },
    { id: 3, name: "Refresco", price: 25, quantity: 2 },
  ],
  direccion: "Calle Principal 123, Col. Centro",
  subtotal: 265,
  envio: 30,
  total: 295,
}

export default function PedidoDetailPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Mobile View */}
      <div className="md:hidden pb-20">
        <header className="sticky top-0 bg-background border-b border-border p-4 z-40">
          <div className="flex items-center justify-between">
            <Link href="/pedido" className="p-2 -ml-2">
              <ArrowLeft className="w-6 h-6 text-foreground" />
            </Link>
            <h1 className="text-lg font-semibold text-foreground">Seguimiento de pedido</h1>
            <div className="w-10" />
          </div>
        </header>

        <div className="p-4 space-y-6">
          <div className="text-center">
            <p className="text-muted-foreground text-sm">Pedido {pedidoData.id}</p>
            <p className="text-muted-foreground text-sm">{pedidoData.fecha}</p>
          </div>

          <section className="bg-card rounded-lg border border-border p-4">
            <h2 className="font-semibold text-foreground mb-4">Estado del pedido</h2>
            <OrderStatus currentStatus={pedidoData.status} />
          </section>

          <section>
            <h2 className="font-semibold text-foreground mb-4">Productos</h2>
            <div className="space-y-3">
              {pedidoData.items.map((item) => (
                <div key={item.id} className="flex items-center gap-3 p-3 bg-card rounded-lg border border-border">
                  <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center flex-shrink-0">
                    <Package className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-foreground text-sm truncate">{item.name}</h4>
                    <p className="text-xs text-muted-foreground">x{item.quantity}</p>
                  </div>
                  <span className="font-semibold text-foreground text-sm">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-card rounded-lg border border-border p-4">
            <h2 className="font-semibold text-foreground mb-2">Direccion de entrega</h2>
            <p className="text-muted-foreground text-sm">{pedidoData.direccion}</p>
          </section>

          <section className="bg-card rounded-lg border border-border p-4">
            <div className="space-y-2">
              <div className="flex justify-between text-foreground text-sm">
                <span>Subtotal</span>
                <span>${pedidoData.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-foreground text-sm">
                <span>Envio</span>
                <span>${pedidoData.envio.toFixed(2)}</span>
              </div>
              <div className="border-t border-border pt-2 mt-2">
                <div className="flex justify-between text-lg font-semibold text-foreground">
                  <span>Total</span>
                  <span>${pedidoData.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </section>
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
          <div className="flex items-center gap-4 mb-8">
            <Link href="/pedido" className="p-2 -ml-2 hover:bg-secondary rounded-lg transition-colors">
              <ArrowLeft className="w-6 h-6 text-foreground" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Pedido {pedidoData.id}</h1>
              <p className="text-muted-foreground">{pedidoData.fecha}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <section className="bg-card rounded-lg border border-border p-6">
                <h2 className="text-lg font-semibold text-foreground mb-6">Estado del pedido</h2>
                <OrderStatus currentStatus={pedidoData.status} />
              </section>

              <section className="bg-card rounded-lg border border-border p-6">
                <h2 className="text-lg font-semibold text-foreground mb-2">Direccion de entrega</h2>
                <p className="text-muted-foreground">{pedidoData.direccion}</p>
              </section>
            </div>

            <div className="bg-card rounded-lg border border-border p-6">
              <h2 className="text-lg font-semibold text-foreground mb-6">Productos</h2>
              <div className="space-y-4 mb-6">
                {pedidoData.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center flex-shrink-0">
                      <Package className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-foreground text-sm">{item.name}</h4>
                      <p className="text-xs text-muted-foreground">x{item.quantity}</p>
                    </div>
                    <span className="font-semibold text-foreground">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-border pt-4 space-y-2">
                <div className="flex justify-between text-foreground">
                  <span>Subtotal</span>
                  <span>${pedidoData.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-foreground">
                  <span>Envio</span>
                  <span>${pedidoData.envio.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xl font-semibold text-foreground pt-2">
                  <span>Total</span>
                  <span>${pedidoData.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
