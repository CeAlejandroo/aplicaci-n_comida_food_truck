"use client"

import { useState } from "react"
import { Package, ChevronDown, User } from "lucide-react"

const pedidos = [
  { id: "ORD-012", cliente: "Maria Garcia", direccion: "Calle 1 #123, Centro", total: 285, status: "recibido", items: 3 },
  { id: "ORD-011", cliente: "Carlos Lopez", direccion: "Av. Principal 456, Norte", total: 150, status: "preparacion", items: 2 },
  { id: "ORD-010", cliente: "Ana Martinez", direccion: "Blvd. Sur 789, Poniente", total: 95, status: "en_camino", repartidor: "Juan Repartidor", items: 1 },
  { id: "ORD-009", cliente: "Pedro Sanchez", direccion: "Calle 5 #321, Centro", total: 320, status: "entregado", repartidor: "Maria Repartidora", items: 4 },
]

const repartidores = [
  { id: 1, name: "Juan Repartidor" },
  { id: 2, name: "Maria Repartidora" },
  { id: 3, name: "Carlos Delivery" },
]

const statusOptions = [
  { value: "recibido", label: "Recibido" },
  { value: "preparacion", label: "En preparacion" },
  { value: "en_camino", label: "En camino" },
  { value: "entregado", label: "Entregado" },
]

const statusLabels: Record<string, { label: string; color: string }> = {
  recibido: { label: "Recibido", color: "bg-blue-100 text-blue-800" },
  preparacion: { label: "Preparando", color: "bg-yellow-100 text-yellow-800" },
  en_camino: { label: "En camino", color: "bg-primary/20 text-primary" },
  entregado: { label: "Entregado", color: "bg-green-100 text-green-800" },
}

export default function AdminPedidosPage() {
  const [filterStatus, setFilterStatus] = useState("todos")
  const [showAssignModal, setShowAssignModal] = useState<string | null>(null)

  const filteredPedidos = filterStatus === "todos"
    ? pedidos
    : pedidos.filter(p => p.status === filterStatus)

  return (
    <div className="p-4 md:p-8">
      <header className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">Pedidos</h1>
        <p className="text-muted-foreground">Gestiona los pedidos entrantes</p>
      </header>

      <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setFilterStatus("todos")}
          className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
            filterStatus === "todos"
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-foreground"
          }`}
        >
          Todos
        </button>
        {statusOptions.map((status) => (
          <button
            key={status.value}
            onClick={() => setFilterStatus(status.value)}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
              filterStatus === status.value
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-foreground"
            }`}
          >
            {status.label}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filteredPedidos.map((pedido) => (
          <div key={pedido.id} className="bg-card rounded-lg border border-border p-4 md:p-6">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-semibold text-foreground">{pedido.id}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusLabels[pedido.status].color}`}>
                    {statusLabels[pedido.status].label}
                  </span>
                </div>
                <p className="text-foreground">{pedido.cliente}</p>
                <p className="text-sm text-muted-foreground">{pedido.direccion}</p>
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <Package className="w-4 h-4" />
                    {pedido.items} productos
                  </span>
                  <span className="font-semibold text-foreground">${pedido.total.toFixed(2)}</span>
                </div>
                {pedido.repartidor && (
                  <p className="text-sm text-primary mt-2 flex items-center gap-1">
                    <User className="w-4 h-4" />
                    Repartidor: {pedido.repartidor}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2 md:w-48">
                <div className="relative">
                  <select
                    defaultValue={pedido.status}
                    className="w-full appearance-none px-4 py-2 pr-10 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    {statusOptions.map((status) => (
                      <option key={status.value} value={status.value}>
                        {status.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                </div>
                
                {pedido.status !== "entregado" && !pedido.repartidor && (
                  <button
                    onClick={() => setShowAssignModal(pedido.id)}
                    className="w-full bg-primary text-primary-foreground py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
                  >
                    Asignar repartidor
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Assign Delivery Modal */}
      {showAssignModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-card rounded-lg border border-border w-full max-w-md">
            <div className="p-4 border-b border-border">
              <h2 className="text-lg font-semibold text-foreground">Asignar repartidor</h2>
              <p className="text-sm text-muted-foreground">Pedido {showAssignModal}</p>
            </div>
            <div className="p-4 space-y-3">
              {repartidores.map((rep) => (
                <button
                  key={rep.id}
                  className="w-full flex items-center gap-3 p-4 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-colors text-left"
                >
                  <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <span className="font-medium text-foreground">{rep.name}</span>
                </button>
              ))}
            </div>
            <div className="p-4 border-t border-border">
              <button
                onClick={() => setShowAssignModal(null)}
                className="w-full border border-border text-foreground py-3 rounded-lg font-medium hover:bg-secondary transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
