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
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { formatDate } from '@/lib/utils';
import { toast } from 'sonner';
import { Loader } from '../ui/loader';
import { fetchWalletBalance } from '@/redux/walletSlice';
import { IconRefresh } from '@tabler/icons-react';

interface WalletWidgetProps {
  credits: number;
  walletLoading: boolean;
  onTopUp: () => void;
}

export const WalletWidget = ({
  credits,
  onTopUp,
  walletLoading,
}: WalletWidgetProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const wallet = useSelector((state: RootState) => state.wallet);
  const { isPendingTxn } = useSelector((state: RootState) => state.wallet);
  const dispatch = useDispatch<AppDispatch>();

  // Mock transaction data - in a real app this would come from your backend
  const lastTransaction = {
    date: wallet?.lastSuccessTxnDate
      ? formatDate(wallet?.lastSuccessTxnDate)
      : '---',
    amount: wallet?.lastSuccessTxnAmount || '---',
    type: 'Top-up',
  };

  const handleBtnClick = () => {
    if (isPendingTxn) {
      toast.error(
        'Cannot initiate a transaction when a transaciton is in pending state',
      );
      return;
    }
    setIsOpen(false);
    setPaymentModalOpen(true);
  };

  return (
    <>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="default"
            className="hover:bg-gray-750 flex cursor-pointer items-center gap-2 rounded-2xl border border-gray-700 bg-gray-800 px-3 py-2 transition-colors"
            onClick={() => setIsOpen(true)}
          >
            <CreditCard className="h-4 w-4 text-teal-500" />
            {walletLoading ? (
              <Loader className="max-w-20 p-0" />
            ) : (
              <span className="flex items-center text-sm font-medium text-white">
                {credits}
                <span className="pl-1 text-center text-xs text-slate-400">
                  credits
                </span>
              </span>
            )}
            <span
              role="button"
              onClick={(e) => {
                e.stopPropagation();
                dispatch(fetchWalletBalance());
              }}
              className="group"
            >
              <IconRefresh className="h-4 w-4 text-slate-400 transition-all duration-150 group-hover:scale-105 group-hover:text-emerald-500" />
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="relative -left-4 top-4 w-72 border-gray-700 bg-[#060b17] p-4 text-white backdrop-blur-md"
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

            <Button onClick={handleBtnClick} className="w-full">
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
