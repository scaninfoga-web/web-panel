import { DialogContent, DialogTitle } from '@radix-ui/react-dialog';
import {
  Dialog,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
} from '../ui/dialog';
import {
  DashboardCard,
  InfoText,
} from '../pages/dashboard/components/DashboardCard';
import { useState } from 'react';
import { CreditCard } from 'lucide-react';
import { cn } from '@/lib/utils';
import PaymentMethod from './PaymentMethod';
import PaymentDetailsStep from './PaymentDetailsStep';
import PaymentConfirmationStep from './PaymentConfirmationStep';

type PaymentModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const stepTitles = {
  method: 'Select Payment Method',
  details: 'Payment Details',
  confirmation: 'Confirmat Transaction',
};

const stepNumbers = {
  method: 1,
  details: 2,
  confirmation: 3,
};

type Step = 'method' | 'details' | 'confirmation';
type PaymentMethodProps = 'qr' | 'bank';

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState<Step>('method');
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<PaymentMethodProps | null>(null);

  const nextStep = () => {
    if (currentStep === 'method') {
      if (selectedPaymentMethod) {
        setCurrentStep('details');
      }
    } else if (currentStep === 'details') {
      setCurrentStep('confirmation');
    }
  };
  const prevStep = () => {
    if (currentStep === 'details') {
      setCurrentStep('method');
    } else if (currentStep === 'confirmation') {
      setCurrentStep('details');
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogPortal>
        <DialogTitle className="text-3xl font-bold text-emerald-500"></DialogTitle>
        <DialogOverlay className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" />
        <DialogContent className="fixed left-[50%] top-[50%] z-50 w-full max-w-md translate-x-[-50%] translate-y-[-50%] rounded-xl bg-black p-4 text-white shadow-md shadow-gray-500 backdrop-blur-0">
          <DialogHeader className="space-y-2">
            <div className="mt-2 font-semibold text-red-500">
              Note: 18% GST is applicable on your transactions.
            </div>
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-teal-500 to-emerald-500">
                <CreditCard className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">
                  {stepTitles[currentStep]}
                </h2>
                <div>
                  <p className="text-sm text-gray-400">
                    Step {stepNumbers[currentStep]} of 3
                  </p>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="h-2 w-full rounded-full bg-gray-800">
              <div
                className={cn(
                  'h-2 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 transition-all duration-500',
                  currentStep === 'method' && 'w-1/3',
                  currentStep === 'details' && 'w-2/3',
                  currentStep === 'confirmation' && 'w-full',
                )}
              />
            </div>
          </DialogHeader>

          <div className="min-h-400px relative overflow-hidden">
            <div
              className={cn(
                'flex w-full transition-transform duration-500 ease-in-out',
                currentStep === 'method' && 'translate-x-0',
                currentStep === 'details' && '-translate-x-full',
                currentStep === 'confirmation' && '-translate-x-[200%]',
              )}
            >
              <div className="w-full flex-shrink-0">
                <PaymentMethod
                  paymentMethod={selectedPaymentMethod}
                  setPaymentMethod={setSelectedPaymentMethod}
                  onNext={nextStep}
                />
              </div>

              <div className="w-full flex-shrink-0">
                <PaymentDetailsStep
                  paymentMethod={selectedPaymentMethod}
                  onNext={nextStep}
                  onBack={prevStep}
                />
              </div>
              <div className="w-full flex-shrink-0">
                <PaymentConfirmationStep
                  onClose={onClose}
                  onNext={nextStep}
                  onBack={prevStep}
                  //  paymentMethod={selectedPaymentMethod}
                  //  onNext={nextStep}
                  //  onBack={prevStep}
                />
              </div>
            </div>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default PaymentModal;
