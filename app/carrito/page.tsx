import Link from "next/link"
import { ArrowLeft, Package } from "lucide-react"
import { LogoWithText } from "@/components/logo"
import { MobileNav } from "@/components/mobile-nav"
import { getCart } from "@/app/actions/cart"
import { CartClient } from "./cart-client"

export default async function CarritoPage() {
  const cartItems = await getCart()

  const subtotal = cartItems.reduce((acc, item) => acc + (item.producto?.precio || 0) * item.cantidad, 0)
  const envio = cartItems.length > 0 ? 30 : 0
  const total = subtotal + envio

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile View */}
      <div className="md:hidden pb-20">
        <header className="sticky top-0 bg-background border-b border-border p-4 z-40">
          <div className="flex items-center justify-between">
            <Link href="/menu" className="p-2 -ml-2">
              <ArrowLeft className="w-6 h-6 text-foreground" />
            </Link>
            <h1 className="text-lg font-semibold text-foreground">Mi pedido</h1>
            <div className="w-10" />
          </div>
        </header>

        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 text-center min-h-[50vh]">
            <Package className="w-16 h-16 text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold text-foreground mb-2">Tu carrito esta vacio</h2>
            <p className="text-muted-foreground mb-6">Agrega productos del menu</p>
            <Link href="/menu" className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium">
              Ver menu
            </Link>
          </div>
        ) : (
          <div className="p-4 space-y-4">
            <CartClient cartItems={cartItems} />

            <div className="bg-card rounded-lg border border-border p-4 mt-6">
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
            </div>

            <Link
              href="/checkout"
              className="block w-full bg-primary text-primary-foreground text-center py-4 rounded-lg font-medium"
            >
              Confirmar pedido
            </Link>
          </div>
        )}

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
          <h1 className="text-3xl font-bold text-foreground mb-8">Mi pedido</h1>

          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 text-center">
              <Package className="w-20 h-20 text-muted-foreground mb-4" />
              <h2 className="text-2xl font-semibold text-foreground mb-2">Tu carrito esta vacio</h2>
              <p className="text-muted-foreground mb-6">Agrega productos del menu</p>
              <Link href="/menu" className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-medium">
                Ver menu
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-4">
                <CartClient cartItems={cartItems} />
              </div>

              <div className="bg-card rounded-lg border border-border p-6 h-fit">
                <h2 className="text-lg font-semibold text-foreground mb-4">Resumen</h2>
                <div className="space-y-3">
                  <div className="flex justify-between text-foreground">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-foreground">
                    <span>Envio</span>
                    <span>${envio.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-border pt-3 mt-3">
                    <div className="flex justify-between text-xl font-semibold text-foreground">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                <Link
                  href="/checkout"
                  className="block w-full bg-primary text-primary-foreground text-center py-3 rounded-lg font-medium mt-6 hover:opacity-90 transition-opacity"
                >
                  Confirmar pedido
                </Link>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
