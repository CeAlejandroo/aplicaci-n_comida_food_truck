import { Package, ClipboardList, Users, TrendingUp } from "lucide-react"
import Link from "next/link"

const stats = [
  { label: "Pedidos hoy", value: "12", icon: ClipboardList, color: "bg-blue-100 text-blue-600" },
  { label: "Productos activos", value: "24", icon: Package, color: "bg-green-100 text-green-600" },
  { label: "Repartidores", value: "5", icon: Users, color: "bg-purple-100 text-purple-600" },
  { label: "Ventas del dia", value: "$3,450", icon: TrendingUp, color: "bg-primary/20 text-primary" },
]

const recentOrders = [
  { id: "ORD-012", cliente: "Maria Garcia", total: 285, status: "preparacion" },
  { id: "ORD-011", cliente: "Carlos Lopez", total: 150, status: "en_camino" },
  { id: "ORD-010", cliente: "Ana Martinez", total: 95, status: "entregado" },
  { id: "ORD-009", cliente: "Pedro Sanchez", total: 320, status: "entregado" },
]

const statusLabels: Record<string, { label: string; color: string }> = {
  recibido: { label: "Recibido", color: "bg-blue-100 text-blue-800" },
  preparacion: { label: "Preparando", color: "bg-yellow-100 text-yellow-800" },
  en_camino: { label: "En camino", color: "bg-primary/20 text-primary" },
  entregado: { label: "Entregado", color: "bg-green-100 text-green-800" },
}

export default function AdminDashboardPage() {
  return (
    <div className="p-4 md:p-8">
      <header className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Bienvenido al panel de administracion</p>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-card rounded-lg border border-border p-4 md:p-6">
            <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center mb-3`}>
              <stat.icon className="w-5 h-5" />
            </div>
            <p className="text-2xl md:text-3xl font-bold text-foreground">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      <section className="bg-card rounded-lg border border-border">
        <div className="p-4 md:p-6 border-b border-border flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Pedidos recientes</h2>
          <Link href="/admin/pedidos" className="text-sm text-primary font-medium hover:underline">
            Ver todos
          </Link>
        </div>
        <div className="divide-y divide-border">
          {recentOrders.map((order) => (
            <div key={order.id} className="p-4 md:p-6 flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">{order.id}</p>
                <p className="text-sm text-muted-foreground">{order.cliente}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusLabels[order.status].color}`}>
                  {statusLabels[order.status].label}
                </span>
                <span className="font-semibold text-foreground hidden md:block">${order.total.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
