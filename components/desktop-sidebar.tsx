"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, ShoppingBag, ClipboardList, User, LogOut } from "lucide-react"
import { LogoWithText } from "./logo"

const navItems = [
  { href: "/", icon: Home, label: "Inicio" },
  { href: "/menu", icon: ShoppingBag, label: "Menu" },
  { href: "/carrito", icon: ShoppingBag, label: "Carrito" },
  { href: "/pedido", icon: ClipboardList, label: "Mis Pedidos" },
  { href: "/cuenta", icon: User, label: "Mi Cuenta" },
]

export function DesktopSidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden md:flex flex-col w-64 min-h-screen bg-card border-r border-border">
      <div className="p-6 flex justify-center">
        <LogoWithText size="sm" />
      </div>
      
      <nav className="flex-1 px-4">
        <ul className="space-y-2">
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
          <span>Cerrar Sesion</span>
        </Link>
      </div>
    </aside>
  )
}
