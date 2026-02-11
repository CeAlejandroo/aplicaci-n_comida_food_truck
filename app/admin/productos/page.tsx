"use client"

import { useState } from "react"
import { Plus, Pencil, Trash2, Package, X } from "lucide-react"

const categories = [
  { id: "hamburguesas", label: "Hamburguesas" },
  { id: "tacos", label: "Tacos" },
  { id: "pizzas", label: "Pizzas" },
  { id: "bebidas", label: "Bebidas" },
  { id: "postres", label: "Postres" },
]

const products = [
  { id: 1, name: "Hamburguesa Clasica", price: 85, category: "hamburguesas", active: true },
  { id: 2, name: "Hamburguesa BBQ", price: 95, category: "hamburguesas", active: true },
  { id: 3, name: "Hamburguesa Doble", price: 120, category: "hamburguesas", active: true },
  { id: 4, name: "Tacos al Pastor", price: 45, category: "tacos", active: true },
  { id: 5, name: "Tacos de Bistec", price: 50, category: "tacos", active: false },
  { id: 6, name: "Pizza Pepperoni", price: 150, category: "pizzas", active: true },
]

export default function AdminProductosPage() {
  const [showModal, setShowModal] = useState(false)
  const [filterCategory, setFilterCategory] = useState("todos")

  const filteredProducts = filterCategory === "todos" 
    ? products 
    : products.filter(p => p.category === filterCategory)

  return (
    <div className="p-4 md:p-8">
      <header className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Gestion de productos</h1>
          <p className="text-muted-foreground">Administra el menu del restaurante</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
        >
          <Plus className="w-5 h-5" />
          Agregar producto
        </button>
      </header>

      <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setFilterCategory("todos")}
          className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
            filterCategory === "todos"
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-foreground"
          }`}
        >
          Todos
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setFilterCategory(cat.id)}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
              filterCategory === cat.id
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-foreground"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Mobile List */}
      <div className="md:hidden space-y-3">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-card rounded-lg border border-border p-4">
            <div className="flex items-start gap-3">
              <div className="w-16 h-16 bg-secondary rounded-lg flex items-center justify-center flex-shrink-0">
                <Package className="w-8 h-8 text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-foreground">{product.name}</h3>
                <p className="text-sm text-muted-foreground capitalize">{product.category}</p>
                <p className="text-primary font-semibold">${product.price.toFixed(2)}</p>
              </div>
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                product.active ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"
              }`}>
                {product.active ? "Activo" : "Inactivo"}
              </span>
            </div>
            <div className="flex gap-2 mt-4">
              <button className="flex-1 flex items-center justify-center gap-2 bg-secondary text-foreground py-2 rounded-lg text-sm font-medium">
                <Pencil className="w-4 h-4" />
                Editar
              </button>
              <button className="flex items-center justify-center gap-2 bg-destructive/10 text-destructive px-4 py-2 rounded-lg text-sm font-medium">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-card rounded-lg border border-border overflow-hidden">
        <table className="w-full">
          <thead className="bg-secondary">
            <tr>
              <th className="text-left p-4 font-medium text-foreground">Producto</th>
              <th className="text-left p-4 font-medium text-foreground">Categoria</th>
              <th className="text-left p-4 font-medium text-foreground">Precio</th>
              <th className="text-left p-4 font-medium text-foreground">Estado</th>
              <th className="text-right p-4 font-medium text-foreground">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredProducts.map((product) => (
              <tr key={product.id}>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center">
                      <Package className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <span className="font-medium text-foreground">{product.name}</span>
                  </div>
                </td>
                <td className="p-4 text-muted-foreground capitalize">{product.category}</td>
                <td className="p-4 font-semibold text-foreground">${product.price.toFixed(2)}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    product.active ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"
                  }`}>
                    {product.active ? "Activo" : "Inactivo"}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
                      <Pencil className="w-5 h-5 text-foreground" />
                    </button>
                    <button className="p-2 hover:bg-destructive/10 rounded-lg transition-colors">
                      <Trash2 className="w-5 h-5 text-destructive" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Product Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-card rounded-lg border border-border w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">Edit Producto</h2>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-secondary rounded-lg transition-colors">
                <X className="w-5 h-5 text-foreground" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Product Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Nombre del producto"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Producto imagen
                </label>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                  <Package className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Arrastra o selecciona una imagen</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Categoria
                  </label>
                  <select className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Precio
                  </label>
                  <input
                    type="number"
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Descripcion
                </label>
                <textarea
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                  placeholder="Descripcion del producto"
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
                Guardar producto
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
