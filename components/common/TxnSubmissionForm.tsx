'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider, useWatch } from 'react-hook-form';
import { z } from 'zod';
import { FormInput } from '../ui/form-input';
import { Button } from '@/components/ui/button'; // fix import if incorrect
import { post } from '@/lib/api';
import { toast } from 'sonner';
import { useState } from 'react';
import { AxiosError } from 'axios';

const txnFormSchema = z.object({
  txn_id: z.string().nonempty('Transaction ID is required'),
  amount: z.coerce.number().positive('Amount must be a positive number'),
  comment: z.string().optional(),
});

export type TxnFormValues = z.infer<typeof txnFormSchema>;

interface FormProviderProps {
  txn_id?: string;
  amount?: number;
  status?: string;
  onSubmit?: (data: TxnFormValues) => void;
  onClose?: () => void;
}

const TxnSubmissionForm: React.FC<FormProviderProps> = ({
  txn_id,
  amount,
  status,
  onSubmit,
  onClose,
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<TxnFormValues>({
    resolver: zodResolver(txnFormSchema),
    defaultValues: {
      txn_id: txn_id ? txn_id : '',
      amount: amount ? amount : 0.0,
      comment: '',
    },
  });

  // Watch the amount field
  const watchedAmount = useWatch({ control: form.control, name: 'amount' });
  const reducedAmount = watchedAmount
    ? (watchedAmount * 0.82).toFixed(2)
    : '0.00';

  const membershipDetail = () => {
    if (watchedAmount >= 59000 && watchedAmount < 236000) {
      return (
        <p className="text-sm text-gray-400">
          You are also eligible for a{' '}
          <strong className="text-slate-300">Silver</strong> membership
        </p>
      );
    }
    if (watchedAmount >= 236000 && watchedAmount < 1180000) {
      return (
        <p className="text-sm text-gray-400">
          You are also eligible for a{' '}
          <strong className="text-yellow-300">Gold</strong> membership
        </p>
      );
    }
    if (watchedAmount >= 118000) {
      return (
        <p className="text-sm text-gray-400">
          You are also eligible for a{' '}
          <strong className="text-blue-300">Platinum</strong> membership
        </p>
      );
    }
  };

  const handleFormSubmit = async (data: TxnFormValues) => {
    setLoading(true);
    if (onSubmit) {
      onSubmit(data);
      return;
    }

    try {
      await post('/api/payments/postTxn', data);
      toast.success('Transaction submitted successfully');
      if (onClose) onClose();
    } catch (e) {
      if (e instanceof AxiosError) {
        toast.error(
          e?.response?.data?.responseStatus?.message ||
            'Unable to post transaction',
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(handleFormSubmit)}
          className="mt-4 space-y-4"
        >
          <FormInput
            form={form}
            name="txn_id"
            label="Transaction ID"
            placeholder="Enter transaction ID"
          />
          <FormInput
            form={form}
            name="amount"
            label="Amount"
            placeholder="Enter amount"
          />
          {/* Show reduced amount */}
          {watchedAmount > 0 && (
            <p className="text-sm text-gray-400">
              You will get{' '}
              <span className="font-semibold text-white">{reducedAmount}</span>{' '}
              credits in your wallet
            </p>
          )}
          {membershipDetail()}
          {status && status === 'rejected' && (
            <FormInput form={form} name="comment" label="Comment" />
          )}
          <Button type="submit" className="w-full" loading={loading}>
            Submit
          </Button>
        </form>
      </FormProvider>
    </section>
  );
};

export default TxnSubmissionForm;
