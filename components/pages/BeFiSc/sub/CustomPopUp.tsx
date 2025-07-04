import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogPortal,
  DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

interface PageProps {
  triggerElement: React.ReactNode;
  dialogTitle: string;
  children: React.ReactNode;
}

export default function CustomPopUp({
  triggerElement,
  dialogTitle,
  children,
}: PageProps) {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  return (
    <div>
      <div role="button" onClick={() => setIsOpen(true)}>
        {triggerElement}
      </div>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
          <DialogPortal>
            <DialogContent className="min-[400px] flex min-w-[800px] flex-col border-slate-800 bg-[#0e1421]/30 p-10 text-white shadow-2xl shadow-slate-800 backdrop-blur-3xl">
              <DialogTitle className="text-3xl font-bold text-emerald-500">
                {dialogTitle}
              </DialogTitle>

              <div className="relative mt-4 flex min-h-full flex-col items-center overflow-hidden">
                <div
                  className={cn(
                    'flex w-full transition-transform duration-500 ease-in-out',
                  )}
                >
                  {children}
                </div>
              </div>
            </DialogContent>
          </DialogPortal>
        </Dialog>
      )}
    </div>
  );
}
