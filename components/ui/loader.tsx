import { Loader2 } from 'lucide-react';

export function Loader() {
  return (
    <div className="flex h-screen items-center justify-center p-12">
      <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
    </div>
  );
}
