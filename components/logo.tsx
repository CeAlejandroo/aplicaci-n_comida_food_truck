export function Logo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizes = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-32 h-32",
  }

  return (
    <div className={`${sizes[size]} relative`}>
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Octagon outline */}
        <polygon
          points="30,5 70,5 95,30 95,70 70,95 30,95 5,70 5,30"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-foreground"
        />
        {/* Inner geometric pattern */}
        <g className="text-foreground" fill="currentColor">
          {/* Center diamond */}
          <polygon points="50,25 65,50 50,75 35,50" fill="none" stroke="currentColor" strokeWidth="1.5" />
          {/* Top triangle */}
          <polygon points="50,20 40,35 60,35" fill="currentColor" />
          {/* Bottom triangle */}
          <polygon points="50,80 40,65 60,65" fill="currentColor" />
          {/* Left triangle */}
          <polygon points="20,50 35,40 35,60" fill="currentColor" />
          {/* Right triangle */}
          <polygon points="80,50 65,40 65,60" fill="currentColor" />
          {/* Center lines */}
          <line x1="50" y1="35" x2="50" y2="65" stroke="currentColor" strokeWidth="1" />
          <line x1="35" y1="50" x2="65" y2="50" stroke="currentColor" strokeWidth="1" />
        </g>
      </svg>
    </div>
  )
}

export function LogoWithText({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <Logo size={size} />
      <div className="text-center">
        <h1 className="text-lg font-semibold tracking-wide text-foreground">LA QUINTA</h1>
        <p className="text-sm tracking-widest text-muted-foreground">ESTACION</p>
      </div>
    </div>
  )
}
