import { cn } from "@/lib/utils"

interface CustomProgressProps {
  value: number
  className?: string
  variant?: "default" | "warning" | "danger"
}

export function CustomProgress({
  value,
  className,
  variant = "default",
}: CustomProgressProps) {
  return (
    <div className={cn("h-2 w-full overflow-hidden rounded-full bg-slate-800", className)}>
      <div
        className={cn(
          "h-full transition-all",
          {
            "bg-emerald-500": variant === "default",
            "bg-amber-500": variant === "warning",
            "bg-red-500": variant === "danger",
          }
        )}
        style={{ width: `${value}%` }}
      />
    </div>
  )
}
