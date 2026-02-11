import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { LogoWithText } from "@/components/logo"
import { MobileNav } from "@/components/mobile-nav"
import { getProfile, updateProfile } from "@/app/actions/auth"
import { redirect } from "next/navigation"

export default async function EditarCuentaPage() {
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
            <Link href="/cuenta" className="p-2 -ml-2">
              <ArrowLeft className="w-6 h-6 text-foreground" />
            </Link>
            <h1 className="text-lg font-semibold text-foreground">Administrar perfil</h1>
            <div className="w-10" />
          </div>
        </header>

        <div className="p-4">
          <p className="text-muted-foreground text-sm mb-6">Actualiza tu informacion de perfil</p>

          <form action={updateProfile} className="space-y-4">
            <div>
              <label htmlFor="nombre" className="block text-sm font-medium text-foreground mb-2">
                Nombre completo
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                defaultValue={profile.nombre || ''}
                required
                className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <div>
              <label htmlFor="telefono" className="block text-sm font-medium text-foreground mb-2">
                Numero de telefono
              </label>
              <input
                type="tel"
                id="telefono"
                name="telefono"
                defaultValue={profile.telefono || ''}
                required
                className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <div>
              <label htmlFor="direccion" className="block text-sm font-medium text-foreground mb-2">
                Direccion de entrega
              </label>
              <input
                type="text"
                id="direccion"
                name="direccion"
                defaultValue={profile.direccion || ''}
                required
                className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Guardar cambios
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

        <main className="max-w-2xl mx-auto px-6 py-8">
          <div className="flex items-center gap-4 mb-8">
            <Link href="/cuenta" className="p-2 -ml-2 hover:bg-secondary rounded-lg transition-colors">
              <ArrowLeft className="w-6 h-6 text-foreground" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Administrar perfil</h1>
              <p className="text-muted-foreground">Actualiza tu informacion de perfil</p>
            </div>
          </div>

          <div className="bg-card rounded-lg border border-border p-8">
            <form action={updateProfile} className="space-y-6">
              <div>
                <label htmlFor="nombre-desktop" className="block text-sm font-medium text-foreground mb-2">
                  Nombre completo
                </label>
                <input
                  type="text"
                  id="nombre-desktop"
                  name="nombre"
                  defaultValue={profile.nombre || ''}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div>
                <label htmlFor="telefono-desktop" className="block text-sm font-medium text-foreground mb-2">
                  Numero de telefono
                </label>
                <input
                  type="tel"
                  id="telefono-desktop"
                  name="telefono"
                  defaultValue={profile.telefono || ''}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div>
                <label htmlFor="direccion-desktop" className="block text-sm font-medium text-foreground mb-2">
                  Direccion de entrega
                </label>
                <input
                  type="text"
                  id="direccion-desktop"
                  name="direccion"
                  defaultValue={profile.direccion || ''}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <Link
                  href="/cuenta"
                  className="flex-1 border border-border text-foreground text-center py-3 rounded-lg font-medium hover:bg-secondary transition-colors"
                >
                  Cancelar
                </Link>
                <button
                  type="submit"
                  className="flex-1 bg-primary text-primary-foreground py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
                >
                  Guardar cambios
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  )
}
