import Link from "next/link"
import { ArrowLeft, User, MapPin, Phone, Mail, ChevronRight, LogOut } from "lucide-react"
import { LogoWithText } from "@/components/logo"
import { MobileNav } from "@/components/mobile-nav"
import { getProfile, signOut } from "@/app/actions/auth"
import { redirect } from "next/navigation"

export default async function CuentaPage() {
  const profile = await getProfile()

  if (!profile) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile View */}
      <div className="md:hidden pb-20">
        <header className="sticky top-0 bg-background border-b border-border p-4 z-40">
          <div className="flex items-center justify-between">
            <Link href="/" className="p-2 -ml-2">
              <ArrowLeft className="w-6 h-6 text-foreground" />
            </Link>
            <h1 className="text-lg font-semibold text-foreground">Mi cuenta</h1>
            <div className="w-10" />
          </div>
        </header>

        <div className="p-4 space-y-6">
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-3">
              <User className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-xl font-semibold text-foreground">{profile.nombre}</h2>
            <p className="text-muted-foreground">{profile.email}</p>
          </div>

          <section className="bg-card rounded-lg border border-border divide-y divide-border">
            <Link href="/cuenta/editar" className="flex items-center gap-4 p-4">
              <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground">Editar perfil</p>
                <p className="text-sm text-muted-foreground">Actualiza tu informacion</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </Link>
            
            <div className="flex items-center gap-4 p-4">
              <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                <MapPin className="w-5 h-5 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground">Direccion de entrega</p>
                <p className="text-sm text-muted-foreground truncate">{profile.direccion}</p>
              </div>
            </div>

            <Link href="/pedido" className="flex items-center gap-4 p-4">
              <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                <Phone className="w-5 h-5 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground">Historial de pedidos</p>
                <p className="text-sm text-muted-foreground">Ver todos mis pedidos</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </Link>
          </section>

          <form action={signOut}>
            <button
              type="submit"
              className="flex items-center justify-center gap-2 w-full border border-destructive text-destructive py-3 rounded-lg font-medium"
            >
              <LogOut className="w-5 h-5" />
              Cerrar sesion
            </button>
          </form>
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
              <Link href="/pedido" className="text-foreground hover:text-primary transition-colors">
                Mis Pedidos
              </Link>
              <Link href="/cuenta" className="text-primary font-medium">
                Mi Cuenta
              </Link>
            </nav>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-6 py-8">
          <h1 className="text-3xl font-bold text-foreground mb-8">Mi cuenta</h1>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card rounded-lg border border-border p-6 text-center">
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-12 h-12 text-primary" />
              </div>
              <h2 className="text-xl font-semibold text-foreground mb-1">{profile.nombre}</h2>
              <p className="text-muted-foreground mb-4">{profile.email}</p>
              <Link
                href="/cuenta/editar"
                className="inline-block bg-primary text-primary-foreground px-6 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity"
              >
                Editar perfil
              </Link>
            </div>

            <div className="md:col-span-2 space-y-4">
              <div className="bg-card rounded-lg border border-border p-6">
                <h3 className="font-semibold text-foreground mb-4">Informacion de contacto</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="text-foreground">{profile.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Telefono</p>
                      <p className="text-foreground">{profile.telefono}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Direccion de entrega</p>
                      <p className="text-foreground">{profile.direccion}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Link
                  href="/pedido"
                  className="flex-1 bg-secondary text-foreground text-center py-3 rounded-lg font-medium hover:bg-secondary/80 transition-colors"
                >
                  Ver historial de pedidos
                </Link>
                <form action={signOut}>
                  <button
                    type="submit"
                    className="flex items-center justify-center gap-2 px-6 py-3 border border-destructive text-destructive rounded-lg font-medium hover:bg-destructive/10 transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                    Cerrar sesion
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
