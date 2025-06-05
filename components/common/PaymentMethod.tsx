import { Button } from '@/components/ui/button';
import { QrCode, Banknote } from 'lucide-react';

interface PaymentMethodStepProps {
  paymentMethod: 'qr' | 'bank' | null;
  setPaymentMethod: (method: 'qr' | 'bank') => void;
  onNext: () => void;
}

const PaymentMethod = ({
  paymentMethod,
  setPaymentMethod,
  onNext,
}: PaymentMethodStepProps) => {
  const handleMethodSelect = (method: 'qr' | 'bank') => {
    setPaymentMethod(method);
  };

  const handleNext = () => {
    if (paymentMethod) {
      onNext();
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="my-2 text-lg font-medium text-white">
          Select Your Payment Method
        </h3>
        <p className="text-sm text-gray-400">
          Choose how you'd like to complete your payment
        </p>
      </div>

      <div className="space-y-3">
        <button
          onClick={() => handleMethodSelect('qr')}
          className={`w-full rounded-lg border-2 p-4 text-left transition-all duration-200 ${
            paymentMethod === 'qr'
              ? 'border-teal-500 bg-teal-500/10'
              : 'border-gray-700 hover:border-gray-600'
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                paymentMethod === 'qr' ? 'bg-teal-500' : 'bg-gray-700'
              }`}
            >
              <QrCode className="h-5 w-5 text-white" />
            </div>
            <div>
              <h4 className="font-medium text-white">Scan QR Code</h4>
              <p className="text-sm text-gray-400">Quick and secure payment</p>
            </div>
          </div>
        </button>

        <button
          onClick={() => handleMethodSelect('bank')}
          className={`w-full rounded-lg border-2 p-4 text-left transition-all duration-200 ${
            paymentMethod === 'bank'
              ? 'border-teal-500 bg-teal-500/10'
              : 'border-gray-700 hover:border-gray-600'
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                paymentMethod === 'bank' ? 'bg-teal-500' : 'bg-gray-700'
              }`}
            >
              <Banknote className="h-5 w-5 text-white" />
            </div>
            <div>
              <h4 className="font-medium text-white">Bank Transfer</h4>
              <p className="text-sm text-gray-400">
                Direct bank account payment
              </p>
            </div>
          </div>
        </button>
      </div>

      <Button
        onClick={handleNext}
        disabled={!paymentMethod}
        className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 font-medium text-white hover:from-teal-600 hover:to-emerald-600"
      >
        Continue to Payment
      </Button>
    </div>
  );
};

export default PaymentMethod;
