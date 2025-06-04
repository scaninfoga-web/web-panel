import TxnSubmissionForm, {
  TxnFormValues,
} from '@/components/common/TxnSubmissionForm';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { post } from '@/lib/api';
import { DialogDescription } from '@radix-ui/react-dialog';
import React from 'react';
import { Form } from 'react-hook-form';
import { toast } from 'sonner';

interface TxnTableProps {
  txn_id: string;
  amount: number;
  status: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  populateTableData: () => void;
}

export const TxnModal: React.FC<TxnTableProps> = ({
  isOpen,
  txn_id,
  amount,
  status,
  setIsOpen,
  populateTableData,
}) => {
  const handleFormSubmit = async (data: TxnFormValues) => {
    try {
      if (status === 'rejected') {
        await post('/api/payments/updateTxnToFailed', data);
        toast.success('Transaction updated to failed');
        populateTableData();
        return;
      }
      await post('/api/payments/updateTxnToSuccess', data);
      toast.success('Transaction updated to success');
      populateTableData();
      setIsOpen(false);
    } catch (err) {
      toast.error('Something went wrong');
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && setIsOpen(false)}>
      <DialogContent className="fixed left-[50%] top-[50%] w-full max-w-md translate-x-[-50%] translate-y-[-50%] rounded-xl bg-black p-4 shadow-md shadow-gray-500">
        <DialogHeader className="space-y-2">
          <h3 className="text-lg font-semibold text-white">
            Transaction Details
          </h3>
        </DialogHeader>

        <DialogDescription>
          <TxnSubmissionForm
            status={status}
            txn_id={txn_id}
            amount={amount}
            onSubmit={handleFormSubmit}
          />
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default TxnModal;
