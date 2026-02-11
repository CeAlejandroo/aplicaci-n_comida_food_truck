"use client"

import { useState } from "react"
import { Plus, User, Phone, Package, X } from "lucide-react"

const repartidores = [
  { id: 1, name: "Juan Repartidor", phone: "555 111 2222", pedidosHoy: 5, active: true },
  { id: 2, name: "Maria Repartidora", phone: "555 333 4444", pedidosHoy: 3, active: true },
  { id: 3, name: "Carlos Delivery", phone: "555 555 6666", pedidosHoy: 0, active: false },
  { id: 4, name: "Ana Express", phone: "555 777 8888", pedidosHoy: 7, active: true },
]

export default function AdminRepartidoresPage() {
  const [showModal, setShowModal] = useState(false)

  return (
    <div className="p-4 md:p-8">
      <header className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Repartidores</h1>
          <p className="text-muted-foreground">Gestiona el equipo de entregas</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
        >
          <Plus className="w-5 h-5" />
          Agregar repartidor
        </button>
      </header>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {repartidores.map((rep) => (
          <div key={rep.id} className="bg-card rounded-lg border border-border p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{rep.name}</h3>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Phone className="w-3 h-3" />
                    {rep.phone}
                  </p>
                </div>
              </div>
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                rep.active ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"
              }`}>
                {rep.active ? "Activo" : "Inactivo"}
              </span>
            </div>
            
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Package className="w-4 h-4" />
                <span className="text-sm">{rep.pedidosHoy} pedidos hoy</span>
              </div>
              <button className="text-sm text-primary font-medium hover:underline">
                Ver detalles
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Repartidor Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-card rounded-lg border border-border w-full max-w-md">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">Agregar repartidor</h2>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-secondary rounded-lg transition-colors">
                <X className="w-5 h-5 text-foreground" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Nombre completo
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Nombre del repartidor"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Telefono
                </label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="555 000 0000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="email@ejemplo.com"
                />
              </div>
            </div>
            <div className="p-4 border-t border-border flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 border border-border text-foreground py-3 rounded-lg font-medium hover:bg-secondary transition-colors"
              >
                Cancelar
              </button>
              <button className="flex-1 bg-primary text-primary-foreground py-3 rounded-lg font-medium hover:opacity-90 transition-opacity">
                Agregar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
