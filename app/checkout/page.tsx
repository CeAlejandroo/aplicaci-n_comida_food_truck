"use client"

import Link from "next/link"
import { ArrowLeft, Package } from "lucide-react"
import { LogoWithText } from "@/components/logo"

const cartItems = [
  { id: 1, name: "Hamburguesa Clasica", price: 85, quantity: 2 },
  { id: 2, name: "Tacos al Pastor", price: 45, quantity: 1 },
  { id: 3, name: "Refresco", price: 25, quantity: 2 },
]

export default function CheckoutPage() {
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const envio = 30
  const total = subtotal + envio

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile View */}
      <div className="md:hidden pb-8">
        <header className="sticky top-0 bg-background border-b border-border p-4 z-40">
          <div className="flex items-center justify-between">
            <Link href="/carrito" className="p-2 -ml-2">
              <ArrowLeft className="w-6 h-6 text-foreground" />
            </Link>
            <h1 className="text-lg font-semibold text-foreground">Confirmar pedido</h1>
            <div className="w-10" />
          </div>
        </header>

        <div className="p-4 space-y-6">
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-4">Direccion de entrega</h2>
            <div className="bg-card rounded-lg border border-border p-4">
              <input
                type="text"
                placeholder="Calle y numero"
                className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground mb-3 focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <input
                type="text"
                placeholder="Colonia"
                className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground mb-3 focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <input
                type="text"
                placeholder="Referencias (opcional)"
                className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-4">Resumen del pedido</h2>
            <div className="space-y-3">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-3 p-3 bg-card rounded-lg border border-border">
                  <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center flex-shrink-0">
                    <Package className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-foreground text-sm truncate">{item.name}</h4>
                    <p className="text-xs text-muted-foreground">x{item.quantity}</p>
                  </div>
                  <span className="font-semibold text-foreground">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-card rounded-lg border border-border p-4">
            <div className="space-y-2">
              <div className="flex justify-between text-foreground">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-foreground">
                <span>Envio</span>
                <span>${envio.toFixed(2)}</span>
              </div>
              <div className="border-t border-border pt-2 mt-2">
                <div className="flex justify-between text-lg font-semibold text-foreground">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </section>

          <div className="bg-secondary/50 rounded-lg p-4">
            <p className="text-sm text-muted-foreground text-center">
              Pago contra entrega en efectivo
            </p>
          </div>

          <Link
            href="/pedido/confirmado"
            className="block w-full bg-primary text-primary-foreground text-center py-4 rounded-lg font-medium"
          >
            Confirmar y pedir
          </Link>
        </div>
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
              <Link href="/pedido" className="text-foreground hover:text-primary transition-colors">
                Mis Pedidos
              </Link>
              <Link href="/cuenta" className="text-foreground hover:text-primary transition-colors">
                Mi Cuenta
              </Link>
            </nav>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-6 py-8">
          <h1 className="text-3xl font-bold text-foreground mb-8">Confirmar pedido</h1>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <section>
                <h2 className="text-lg font-semibold text-foreground mb-4">Direccion de entrega</h2>
                <div className="bg-card rounded-lg border border-border p-6 space-y-4">
                  <input
                    type="text"
                    placeholder="Calle y numero"
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  <input
                    type="text"
                    placeholder="Colonia"
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  <input
                    type="text"
                    placeholder="Referencias (opcional)"
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-foreground mb-4">Metodo de pago</h2>
                <div className="bg-card rounded-lg border border-border p-6">
                  <div className="flex items-center gap-3">
                    <input type="radio" id="efectivo" name="pago" checked readOnly className="w-5 h-5 text-primary" />
                    <label htmlFor="efectivo" className="text-foreground">Pago en efectivo contra entrega</label>
                  </div>
                </div>
              </section>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-foreground mb-4">Resumen del pedido</h2>
              <div className="bg-card rounded-lg border border-border p-6">
                <div className="space-y-4 mb-6">
                  {cartItems.map((item) => (
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
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-foreground">
                    <span>Envio</span>
                    <span>${envio.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xl font-semibold text-foreground pt-2">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <Link
                  href="/pedido/confirmado"
                  className="block w-full bg-primary text-primary-foreground text-center py-3 rounded-lg font-medium mt-6 hover:opacity-90 transition-opacity"
                >
                  Confirmar y pedir
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
