import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface DashboardCardProps {
  notifytitle?: string | null;
  notifyStyle?: string;
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  titleBig?: boolean;
}

export function DashboardCard({
  notifytitle,
  notifyStyle,
  title,
  children,
  icon,
  className,
  titleBig = true,
}: DashboardCardProps) {
  return (
    <Card
      className={cn(
        'p-2',
        'relative overflow-hidden',
        'bg-[#0e1421]/30 backdrop-blur-xl',
        'border border-white/10',
        'shadow-lg transition-all duration-300 hover:shadow-xl',
        className,
      )}
    >
      <CardContent className="relative space-y-2 p-4">
        {title.length > 0 && (
          <div className="flex items-center">
            {notifytitle && (
              <span className="absolute -top-1 right-0 animate-pulse rounded-2xl border border-red-400 px-3 py-0.5 text-sm text-red-400 transition-opacity hover:opacity-75">
                suspicous
              </span>
            )}
            {icon}
            {title.length > 0 && (
              <h2
                className={cn(
                  'mb-2 mt-2 font-semibold text-emerald-500',
                  titleBig ? 'text-2xl' : 'text-xl',
                )}
              >
                {title}
              </h2>
            )}
          </div>
        )}
        <div className="flex flex-col">
          {children}
          {notifytitle && (
            <Button className="mt-4 px-4 py-1" variant={'default'}>
              {notifytitle}
            </Button>
          )}
        </div>
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
      <div className="whitespace-nowrap text-sm text-white">{label}</div>
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
