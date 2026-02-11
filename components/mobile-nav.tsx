"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, ShoppingBag, ClipboardList, User } from "lucide-react"

const navItems = [
  { href: "/", icon: Home, label: "Inicio" },
  { href: "/menu", icon: ShoppingBag, label: "Menu" },
  { href: "/pedido", icon: ClipboardList, label: "Pedido" },
  { href: "/cuenta", icon: User, label: "Cuenta" },
]

export function MobileNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border md:hidden z-50">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
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
              <span className="text-xs">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
