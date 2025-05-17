import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface DashboardCardProps {
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

export function DashboardCard({
  title,
  children,
  icon,
  className,
}: DashboardCardProps) {
  return (
    <Card
      className={cn(
        'relative overflow-hidden',
        'bg-[#0e1421]/30 backdrop-blur-xl',
        'border border-white/10',
        'before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/5 before:to-transparent',
        'shadow-lg transition-all duration-300 hover:shadow-xl',
        className,
      )}
    >
      <CardContent className="relative space-y-2 p-4">
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
  value: React.ReactElement | string;
}

export function InfoText({ label, value }: InfoTextProps) {
  // return <p className="text-sm text-gray-400">{value}</p>;
  return (
    <div className="flex items-center justify-between gap-x-8">
      <p className="whitespace-nowrap text-sm text-white">{label}</p>
      <div className="whitespace-nowrap break-all text-sm text-gray-400">
        {value}
      </div>
    </div>
  );
}

interface StatusBadgeProps {
  status: string;
  variant?: 'default' | 'outline' | 'destructive';
  className?: string;
}

export function StatusBadge({
  status,
  variant = 'default',
  className,
}: StatusBadgeProps) {
  return (
    <Badge
      variant={variant}
      // className={
      //   variant === 'outline'
      //     ? 'border-emerald-500 text-emerald-500'
      //     : variant === "outline-danger" ? 'border-red-500 text-red-500' : 'bg-emerald-500 text-black'
      // }

      className={cn(
        {
          'border-emerald-500 text-emerald-500': variant === 'outline',
          'border-red-500 text-red-500': variant === 'destructive',
          'bg-emerald-500 text-black': variant === 'default',
        },
        className,
      )}
    >
      {status}
    </Badge>
  );
}
