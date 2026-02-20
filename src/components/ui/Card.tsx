import * as React from "react"
import { cn } from "@/src/lib/utils"

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("rounded-lg bg-bg-card shadow-md p-6 border border-white/5", className)}
      {...props}
    />
  )
)
Card.displayName = "Card"

export { Card }
