'use client';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { Copy, ArrowLeft, CreditCard, Building } from 'lucide-react';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { FormInput } from '../ui/form-input';
import { useEffect, useState } from 'react';
// @ts-ignore
import { load } from '@cashfreepayments/cashfree-js';
import { useSelector } from 'react-redux';
import { post } from '@/lib/api';
import { AxiosError } from 'axios';

interface PaymentDetailsStepProps {
  paymentMethod: 'card' | 'bank' | null;
  onNext: () => void;
  onBack: () => void;
  onClose: () => void;
}

const txnFormSchema = z.object({
  // txn_id: z.string().nonempty('Transaction ID is required'),
  amount: z.coerce.number().positive('Amount must be a positive number'),
  // comment: z.string().optional(),
});

export type TxnFormValues = z.infer<typeof txnFormSchema>;

const PaymentDetailsStep = ({
  paymentMethod,
  onNext,
  onBack,
  onClose,
}: PaymentDetailsStepProps) => {
  console.log('PaymentDetailsStep - paymentMethod:', paymentMethod);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`);
  };

  const form = useForm<TxnFormValues>({
    resolver: zodResolver(txnFormSchema),
    defaultValues: {
      // txn_id: txn_id ? txn_id : '',
      amount: 0.0,
      // comment: '',
    },
  });

  const [loading, setLoading] = useState(false);
  const [cashfree, setCashfree] = useState<any>(null);

  const bankDetails = {
    bankName: 'Kotak Mahindra Bank',
    accountNumber: '7622004401',
    ifsc: 'KKBK0002875',
    accountName: 'SCANINFOGA SOLUTIONS PRIVATE LIMITED',
  };

  // ✅ Load SDK when component mounts
  useEffect(() => {
    const initializeCashfree = async () => {
      try {
        const cashfreeInstance = await load({
          mode: 'production', // Change to 'sandbox' if testing
        });
        console.log('Cashfree SDK initialized.');
        setCashfree(cashfreeInstance);
      } catch (error) {
        console.error('Error loading Cashfree SDK:', error);
      }
    };

    initializeCashfree();
  }, []);

  const token = useSelector((state: any) => state.user.token);

  const launchCashfreeCheckout = (paymentSessionId: string) => {
    try {
      console.log(
        'Launching Cashfree checkout with session ID:',
        paymentSessionId,
      );

      cashfree.checkout({
        paymentSessionId,
        redirectTarget: '_self', // ✅ Can also use '_blank', '_modal', or a DOM element
      });
    } catch (error: any) {
      console.error('Error launching Cashfree checkout:', error);
      alert('Failed to load payment window: ' + error.message);
    }
  };

  const initiatePayment = async () => {
    if (!form.getValues('amount') || form.getValues('amount') <= 0) {
      alert('Enter a valid amount.');
      return;
    }

    if (!cashfree) {
      alert('Cashfree SDK is not loaded yet.');
      return;
    }

    setLoading(true);
    try {
      const data = await post(
        '/api/payments/initiate-payment',
        { amount: form.getValues('amount') },
        token,
      );
      launchCashfreeCheckout(data.responseData.paymentSessionId);
    } catch (e) {
      console.log('ERROR: ', e);
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

  const handleFormSubmit = () => {};

  const watchedAmount = useWatch({ control: form.control, name: 'amount' });
  const reducedAmount = watchedAmount
    ? (watchedAmount * 0.8).toFixed(2)
    : '0.00';

  // If no payment method is selected, show a fallback
  if (!paymentMethod) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="mb-2 text-lg font-medium text-white">
            No Payment Method Selected
          </h3>
          <p className="text-sm text-gray-400">
            Please go back and select a payment method
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            onClick={onBack}
            variant="outline"
            className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-800"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>
      </div>
    );
  }

  // Handle card payment method - show processing message and close
  if (paymentMethod === 'card') {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <FormProvider {...form}>
            <form
              onSubmit={form.handleSubmit(handleFormSubmit)}
              className="mt-4 space-y-4"
            >
              <FormInput
                form={form}
                name="amount"
                label="Amount"
                placeholder="Enter amount"
              />

              {watchedAmount > 0 && (
                <p className="text-sm text-gray-400">
                  You will get{' '}
                  <span className="font-semibold text-white">
                    {reducedAmount}
                  </span>{' '}
                  credits in your wallet
                </p>
              )}
            </form>
          </FormProvider>
        </div>

        <div className="space-y-4">
          {/* <div className="flex justify-center">
            <div className="flex h-32 w-32 items-center justify-center rounded-lg bg-gradient-to-r from-teal-500 to-emerald-500">
              <CreditCard className="h-16 w-16 text-white" />
            </div>
          </div> */}

          <div className="rounded-lg border border-teal-500/20 bg-teal-500/10 p-4">
            <h4 className="mb-2 font-medium text-teal-400">
              Payment Features:
            </h4>
            <ul className="space-y-1 text-sm text-gray-300">
              <li>• Instant credit to your account</li>
              <li>• Secure payment processing</li>
              <li>• Support for UPI, Debit & Credit Cards</li>
              <li className="text-orange-400">• 2% platform fee applies</li>
            </ul>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-400">
              You will be redirected to complete your payment securely
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            onClick={onBack}
            variant="outline"
            className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-800"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button
            onClick={initiatePayment}
            className="flex-1 bg-gradient-to-r from-teal-500 to-emerald-500 font-medium text-white hover:from-teal-600 hover:to-emerald-600"
            loading={loading}
          >
            Proceed to Payment Gateway
          </Button>
        </div>
      </div>
    );
  }

  // Handle bank transfer method
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="mb-2 text-lg font-medium text-white">
          Bank Transfer Details
        </h3>
        <p className="text-sm text-gray-400">
          Use the details below to make your payment
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-3 rounded-lg bg-gray-800 p-4">
          <div className="mb-3 flex items-center gap-2">
            <Building className="h-5 w-5 text-teal-500" />
            <span className="font-medium text-white">Bank Details</span>
          </div>

          <div className="grid gap-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Bank Name:</span>
              <div className="flex items-center">
                <span className="text-sm text-white">
                  {bankDetails.bankName}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    copyToClipboard(bankDetails.bankName, 'Bank name')
                  }
                  className="h-6 w-6 p-0 hover:bg-gray-700"
                >
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Account Number:</span>
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm text-white">
                  {bankDetails.accountNumber}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    copyToClipboard(bankDetails.accountNumber, 'Account number')
                  }
                  className="h-6 w-6 p-0 hover:bg-gray-700"
                >
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">IFSC Code:</span>
              <div className="flex items-center gap-1">
                <span className="font-mono text-sm text-white">
                  {bankDetails.ifsc}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(bankDetails.ifsc, 'IFSC Code')}
                  className="h-6 w-6 p-0 hover:bg-gray-700"
                >
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Account Name:</span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-white">
                  {bankDetails.accountName}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    copyToClipboard(bankDetails.accountName, 'Account name')
                  }
                  className="h-6 w-6 p-0 hover:bg-gray-700"
                >
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-blue-500/20 bg-blue-500/10 p-3">
          <p className="text-center text-sm text-blue-400">
            <strong>No additional fees</strong> • May take 24 hours to provide
            credit
          </p>
        </div>

        <div className="rounded-lg border border-teal-500/20 bg-teal-500/10 p-3">
          <p className="text-center text-sm text-teal-400">
            <strong>Amount to Pay:</strong> ₹5,000 (Minimum)
          </p>
        </div>
      </div>

      <div className="flex gap-3">
        <Button
          onClick={onBack}
          variant="outline"
          className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-800"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button
          onClick={onNext}
          className="flex-1 bg-gradient-to-r from-teal-500 to-emerald-500 font-medium text-white hover:from-teal-600 hover:to-emerald-600"
        >
          Proceed to Confirm
        </Button>
      </div>
    </div>
  );
};

export default PaymentDetailsStep;
