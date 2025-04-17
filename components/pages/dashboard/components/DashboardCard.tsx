import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface DashboardCardProps {
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

export function DashboardCard({ title, children, icon, className }: DashboardCardProps) {
  return (
    <Card className={cn(
      "relative overflow-hidden",
      "bg-[#0e1421]/30 backdrop-blur-xl",
      "border border-white/10",
      "before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/5 before:to-transparent",
      "shadow-lg hover:shadow-xl transition-all duration-300",
      className
    )}>
      <CardContent className="relative p-4 space-y-2">
        <div className="flex items-center gap-2">
          {icon}
          <h2 className="text-lg font-semibold text-emerald-500">{title}</h2>
        </div>
        {children}
      </CardContent>
    </Card>
  );
}

interface InfoTextProps {
  label: string;
  value: string;
}

export function InfoText({ label, value }: InfoTextProps) {
  return <p className="text-sm text-gray-400">{value}</p>;
}

interface StatusBadgeProps {
  status: string;
  variant?: "default" | "outline";
}

export function StatusBadge({ status, variant = "default" }: StatusBadgeProps) {
  return (
    <Badge 
      variant={variant} 
      className={variant === "outline" ? "border-emerald-500 text-emerald-500" : "bg-emerald-500 text-black"}
    >
      {status}
    </Badge>
  );
}