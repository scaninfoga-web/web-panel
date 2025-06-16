import { Button } from '@/components/ui/button';
import { BreachInfoType } from '@/types/BreachInfo';
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogPortal,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { IconMailSearch, IconNumber } from '@tabler/icons-react';

interface PageProps {
  label: 'Email' | '+91 Number' | 'Number';
  setExtraData: React.Dispatch<
    React.SetStateAction<
      {
        value: string;
        type: string;
        data: BreachInfoType;
      }[]
    >
  >;
}
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
function isValidNumber(
  input: string,
  label: 'Email' | '+91 Number' | 'Number',
) {
  const mobileRegex = /^(?:\+91[\-\s]?)?[5-9]\d{9}$/;
  input = input.replace(/\s/g, '');
  const isValid = mobileRegex.test(input);

  if (isValid && label === '+91 Number') {
    if (input.length === 10) {
      input = '+91' + input;
    }
  }
  return {
    isValid,
    fixedNumber: input,
  };
}

export default function AddMoreBreachButton({
  label,
  setExtraData,
}: PageProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isValidInput, setIsValidInput] = useState(false);

  function onClose() {
    setIsOpen(false);
  }

  const handleSubmit = async () => {};

  return (
    <div className="flex w-full items-center justify-center">
      <Button
        onClick={() => setIsOpen(true)}
        className="max-w-64 bg-slate-700 text-white hover:bg-slate-700/50 hover:text-white/70"
      >
        Add More {label} ?
      </Button>

      {/* popUp */}
      <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DialogPortal>
          <DialogContent className="min-[400px] flex min-w-[800px] flex-col border-slate-800 p-10 text-white shadow-2xl shadow-slate-800 backdrop-blur-3xl">
            <DialogTitle className="text-3xl font-bold text-emerald-500">
              Add More {label}
            </DialogTitle>
            <DialogHeader className="mt-4 space-y-2 rounded-full">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-teal-700 to-emerald-700">
                  {label === 'Email' ? (
                    <IconMailSearch className="h-5 w-5" />
                  ) : (
                    <IconNumber className="h-5 w-5" />
                  )}
                </div>
              </div>
            </DialogHeader>

            <div className="relative mt-4 flex min-h-full flex-col items-center overflow-hidden">
              <div
                className={cn(
                  'flex w-full transition-transform duration-500 ease-in-out',
                )}
              >
                <div className="flex min-w-full flex-col space-y-10">
                  <Input
                    id="firstInput"
                    placeholder="Enter mobile no"
                    className="w-full border border-neutral-700"
                  />
                  <div className="min-w-full">
                    <Button
                      className="w-full bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20"
                      disabled={isValidInput}
                      onClick={handleSubmit}
                    >
                      Click to Continue
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    </div>
  );
}
