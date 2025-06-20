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
import {
  IconMailSearch,
  IconNumber,
  IconPhoneFilled,
} from '@tabler/icons-react';
import { isValidIndianMobileNumber } from '../BeFiSc';
import { toast } from 'sonner';

interface PageProps {
  label: 'Email' | 'Number';
  setExtraData: React.Dispatch<
    React.SetStateAction<
      {
        value: string;
        type: string;
        data: BreachInfoType | null;
      }[]
    >
  >;
}
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export default function AddMoreBreachButton({
  label,
  setExtraData,
}: PageProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isValidInput, setIsValidInput] = useState(false);
  const [input, setInput] = useState('');

  function onClose() {
    setIsOpen(false);
  }

  function handleValid(input: string) {
    if (label === 'Email' && input?.length > 0) {
      setIsValidInput(isValidEmail(input));
    }
    if (label === 'Number' && input?.length > 0) {
      setIsValidInput(isValidIndianMobileNumber(input).result);
    }
  }

  const handleSubmit = async () => {
    toast.success('Goode');
  };

  return (
    <div className="flex w-full items-center justify-center">
      <Button
        onClick={() => setIsOpen(true)}
        className="max-w-64 bg-slate-700 text-white hover:bg-slate-700/50 hover:text-white/70"
      >
        Search {label} ?
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
                    <IconPhoneFilled className="h-5 w-5" />
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
                  <div className="flex flex-col space-y-2">
                    <Input
                      id="firstInput"
                      value={input}
                      type={label === 'Email' ? 'email' : 'number'}
                      placeholder={`Enter ${label}`}
                      onChange={(e) => {
                        setInput(e.target.value);
                        handleValid(e.target.value);
                      }}
                      className="w-full border border-neutral-700 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    />

                    {!isValidInput && input.length > 0 && (
                      <p className="pl-1 text-sm font-medium text-red-500">
                        Enter valid {label?.toLowerCase()}
                      </p>
                    )}
                  </div>
                  <div className="min-w-full">
                    <Button
                      className="w-full bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20"
                      disabled={!isValidInput}
                      onClick={handleSubmit}
                    >
                      Search {label}
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
