import Link from "next/link"
import { LogoWithText } from "@/components/logo"
import { signUp } from "@/app/actions/auth"

export default function RegistroPage({
  searchParams,
}: {
  searchParams: { error?: string }
}) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="flex justify-center mb-8">
            <LogoWithText size="md" />
          </div>

          <div className="bg-card rounded-lg p-6 border border-border">
            <h2 className="text-xl font-semibold text-foreground mb-6 text-center">
              Crear una cuenta
            </h2>

            {searchParams.error && (
              <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                <p className="text-sm text-destructive text-center">{searchParams.error}</p>
              </div>
            )}

            <form action={signUp} className="space-y-4">
              <div>
                <label htmlFor="nombre" className="block text-sm font-medium text-foreground mb-2">
                  Nombre completo
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Juan Perez"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Correo electronico
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="tu@correo.com"
                />
              </div>

              <div>
                <label htmlFor="telefono" className="block text-sm font-medium text-foreground mb-2">
                  Telefono
                </label>
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="555 123 4567"
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
                  required
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Calle, numero, colonia"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                  Contrasena
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  minLength={6}
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="********"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
              >
                Registrarse
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-muted-foreground">
                Ya tienes cuenta?{" "}
                <Link href="/login" className="text-primary font-medium hover:underline">
                  Inicia sesion
                </Link>
              </p>
            </div>
          </div>

          <div className="mt-4 text-center">
            <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
              Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
