'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { CreditCard, Plus, Calendar, IndianRupee } from 'lucide-react';
import PaymentModal from './PaymentModal';

interface WalletWidgetProps {
  credits: number;
  onTopUp: () => void;
}

export const WalletWidget = ({ credits, onTopUp }: WalletWidgetProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);

  // Mock transaction data - in a real app this would come from your backend
  const lastTransaction = {
    date: 'Dec 15, 2024',
    amount: 1000,
    type: 'Top-up',
  };

  const handleBtnClick = () => {
    console.log('HANDLE BTN CLICK');
    setIsOpen(false);
    setPaymentModalOpen(true);
  };

  console.log('PAYMEND MODAL: ', paymentModalOpen);

  return (
    <>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <button className="hover:bg-gray-750 flex cursor-pointer items-center gap-2 rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 transition-colors">
            <CreditCard className="h-4 w-4 text-teal-500" />
            <span className="text-sm font-medium text-white">{credits}</span>
            <span className="text-xs text-gray-400">credits</span>
          </button>
        </PopoverTrigger>
        <PopoverContent
          className="w-64 border-gray-700 bg-gray-800 p-4 text-white"
          align="start"
        >
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-teal-500" />
              <span className="font-medium text-white">Credit Balance</span>
            </div>

            <div className="text-2xl font-bold text-white">
              {credits} credits
            </div>

            <div className="border-t border-gray-700 pt-3">
              <h4 className="mb-2 text-sm font-medium text-gray-300">
                Last Transaction
              </h4>
              <div className="space-y-2 rounded-lg bg-gray-900 p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-3 w-3 text-gray-400" />
                    <span className="text-sm text-gray-400">
                      {lastTransaction.date}
                    </span>
                  </div>
                  <span className="rounded bg-teal-500/10 px-2 py-1 text-xs text-teal-400">
                    {lastTransaction.type}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <IndianRupee className="h-3 w-3 text-gray-400" />
                  <span className="text-sm font-medium text-white">
                    +{lastTransaction.amount}
                  </span>
                </div>
              </div>
            </div>

            <Button
              onClick={handleBtnClick}
              className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 text-white hover:from-teal-600 hover:to-emerald-600"
            >
              <Plus className="mr-2 h-4 w-4" />
              Top Up Credits
            </Button>
          </div>
        </PopoverContent>
      </Popover>
      <PaymentModal
        isOpen={paymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
      />
    </>
  );
};
