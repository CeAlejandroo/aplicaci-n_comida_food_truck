import Link from "next/link"
import { LogoWithText } from "@/components/logo"
import { MobileNav } from "@/components/mobile-nav"
import { ShoppingBag, ClipboardList, User, MapPin } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Mobile View */}
      <div className="md:hidden flex flex-col min-h-screen pb-20">
        <header className="flex-1 flex flex-col items-center justify-center p-8">
          <LogoWithText size="lg" />
          <p className="text-muted-foreground text-center mt-4">
            Comida rapida a domicilio
          </p>
        </header>

        <div className="px-6 space-y-4">
          <Link
            href="/menu"
            className="flex items-center justify-center gap-3 w-full bg-primary text-primary-foreground py-4 rounded-lg font-medium"
          >
            <ShoppingBag className="w-5 h-5" />
            Ver Menu
          </Link>
          <Link
            href="/pedido"
            className="flex items-center justify-center gap-3 w-full bg-secondary text-foreground py-4 rounded-lg font-medium"
          >
            <ClipboardList className="w-5 h-5" />
            Mis Pedidos
          </Link>
          <Link
            href="/login"
            className="flex items-center justify-center gap-3 w-full border border-border text-foreground py-4 rounded-lg font-medium"
          >
            <User className="w-5 h-5" />
            Iniciar Sesion
          </Link>
        </div>

        <MobileNav />
      </div>

      {/* Desktop View */}
      <div className="hidden md:block">
        <header className="bg-card border-b border-border">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <LogoWithText size="sm" />
            </div>
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
              <Link
                href="/login"
                className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity"
              >
                Iniciar Sesion
              </Link>
            </nav>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-4 text-balance">
                Tu comida favorita, directo a tu puerta
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Disfruta de la mejor comida rapida de la ciudad con entrega a domicilio rapida y segura.
              </p>
              <div className="flex gap-4">
                <Link
                  href="/menu"
                  className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
                >
                  Ver Menu
                </Link>
                <Link
                  href="/registro"
                  className="border border-border text-foreground px-8 py-3 rounded-lg font-medium hover:bg-secondary transition-colors"
                >
                  Registrarse
                </Link>
              </div>
            </div>
            <div className="bg-secondary rounded-2xl p-8 flex items-center justify-center aspect-square">
              <LogoWithText size="lg" />
            </div>
          </div>

          <section className="mt-16">
            <h2 className="text-2xl font-bold text-foreground mb-8">Como funciona</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShoppingBag className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">1. Elige tu comida</h3>
                <p className="text-muted-foreground">Explora nuestro menu y selecciona tus platillos favoritos</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">2. Confirma tu direccion</h3>
                <p className="text-muted-foreground">Indica donde quieres recibir tu pedido</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ClipboardList className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">3. Recibe tu pedido</h3>
                <p className="text-muted-foreground">Espera comodamente mientras llevamos tu comida</p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
