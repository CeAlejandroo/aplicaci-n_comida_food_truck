"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Package, ClipboardList, Users, User, LogOut } from "lucide-react"
import { LogoWithText } from "./logo"

const navItems = [
  { href: "/admin", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/productos", icon: Package, label: "Productos" },
  { href: "/admin/pedidos", icon: ClipboardList, label: "Pedidos" },
  { href: "/admin/repartidores", icon: Users, label: "Repartidores" },
  { href: "/admin/perfil", icon: User, label: "Configuracion" },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden md:flex flex-col w-64 min-h-screen bg-card border-r border-border">
      <div className="p-6 flex justify-center border-b border-border">
        <LogoWithText size="sm" />
      </div>
      
      <nav className="flex-1 px-4 py-6">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4 px-4">
          Administracion
        </p>
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-secondary"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-border">
        <Link
          href="/login"
          className="flex items-center gap-3 px-4 py-3 text-muted-foreground hover:text-foreground transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Cerrar sesion</span>
        </Link>
      </div>
    </aside>
  )
}

export function AdminMobileNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border md:hidden z-50">
      <div className="flex justify-around items-center h-16">
        {navItems.slice(0, 4).map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-1 px-4 py-2 ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-xs">{item.label.split(" ")[0]}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
