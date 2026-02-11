"use client"

interface CategoryButtonProps {
  label: string
  isActive?: boolean
  onClick?: () => void
}

export function CategoryButton({ label, isActive, onClick }: CategoryButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 rounded-lg font-medium transition-colors whitespace-nowrap ${
        isActive
          ? "bg-primary text-primary-foreground"
          : "bg-secondary text-foreground hover:bg-primary/10"
      }`}
    >
      {label}
    </button>
  )
}
