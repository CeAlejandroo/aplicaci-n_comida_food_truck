import { User, Mail, Phone, MapPin, Clock } from "lucide-react"

export default function AdminPerfilPage() {
  return (
    <div className="p-4 md:p-8">
      <header className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">Estado del pedido</h1>
        <p className="text-muted-foreground">Configuracion del restaurante y perfil</p>
      </header>

      <div className="grid md:grid-cols-2 gap-8">
        <section className="bg-card rounded-lg border border-border p-6">
          <h2 className="text-lg font-semibold text-foreground mb-6">Mi pedido</h2>
          
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center">
                <User className="w-10 h-10 text-muted-foreground" />
              </div>
              <div>
                <p className="font-semibold text-foreground text-lg">Admin Restaurant</p>
                <p className="text-muted-foreground">Administrador</p>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-border">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="text-foreground">admin@laquintaestacion.com</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Telefono</p>
                  <p className="text-foreground">555 999 8888</p>
                </div>
              </div>
            </div>
          </div>

          <button className="w-full mt-6 bg-primary text-primary-foreground py-3 rounded-lg font-medium hover:opacity-90 transition-opacity">
            Editar perfil
          </button>
        </section>

        <section className="bg-card rounded-lg border border-border p-6">
          <h2 className="text-lg font-semibold text-foreground mb-6">Datos del restaurante</h2>
          
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Nombre del restaurante
              </label>
              <input
                type="text"
                defaultValue="La Quinta Estacion"
                className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Direccion
              </label>
              <div className="relative">
                <input
                  type="text"
                  defaultValue="Av. Central 500, Centro"
                  className="w-full px-4 py-3 pl-10 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Telefono del restaurante
              </label>
              <div className="relative">
                <input
                  type="tel"
                  defaultValue="555 123 4567"
                  className="w-full px-4 py-3 pl-10 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Horario de atencion
              </label>
              <div className="relative">
                <input
                  type="text"
                  defaultValue="10:00 AM - 10:00 PM"
                  className="w-full px-4 py-3 pl-10 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Costo de envio
              </label>
              <input
                type="number"
                defaultValue="30"
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
        </section>
      </div>
    </div>
  )
}
