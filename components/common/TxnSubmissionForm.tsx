// "use client"

// import { zodResolver } from '@hookform/resolvers/zod';
// import {
//     Form,
//     useForm,
//   } from 'react-hook-form';

//   import { date, z } from 'zod';
// import { FormInput } from '../ui/form-input';
// import { Button } from 'react-day-picker';

//   const txnFormSchema = z.object({
//     txn_id: z.string().nonempty("Transaction ID is required"),
//     amount: z.coerce.number().positive("Amount must be a positive number"),
//   });

//   type txnFormValues = z.infer<typeof txnFormSchema>;

// const TxnSubmissionForm = () => {
//     const form = useForm<txnFormValues>({
//         resolver: zodResolver(txnFormSchema),
//         defaultValues: {
//           txn_id: '',
//           amount: 0.00,
//         },
//       });

//       const onSubmit = (data: txnFormValues) => {
//         // Handle form submission here
//         console.log(data);
//       };
//   return (
//     <>
//     <section>
//         <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//         <FormInput
//               form={form}
//               name="txn_id"
//               label="Transaction ID"
//               placeholder="Enter transaction ID"
//             />
//             <FormInput
//               form={form}
//               name="amount"
//               label="Amount"
//               placeholder="Enter amount"
//               />
//               <Button type="submit" className="w-full">
//                 Submit
//               </Button>
//             </form>
//             </Form>
//     </section>
//     </>
//   );
// }

// export default TxnSubmissionForm;

'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';
import { z } from 'zod';
import { FormInput } from '../ui/form-input';
import { Button } from '@/components/ui/button'; // fix import if incorrect
import { post } from '@/lib/api';
import { toast } from 'sonner';
import { useState } from 'react';

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
  const [loading, setLoading] = useState<boolean>(false); // add loading state

  const form = useForm<TxnFormValues>({
    resolver: zodResolver(txnFormSchema),
    defaultValues: {
      txn_id: txn_id ? txn_id : '',
      amount: amount ? amount : 0.0,
      comment: '',
    },
  });

  const handleFormSubmit = async (data: TxnFormValues) => {
    setLoading(true);
    if (onSubmit) {
      onSubmit(data);
      return;
    }

    // await new Promise(resolve => setTimeout(resolve, 5000));
    // setLoading(false);
    try {
      await post('/api/payments/postTxn', data);
      toast.success('Transaction submitted successfully');
      if (onClose) onClose();
    } catch (e) {
      console.log('ERROR ejhge: ', e);
      toast.error('Error submitting transaction.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(handleFormSubmit)}
          className="space-y-4"
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
