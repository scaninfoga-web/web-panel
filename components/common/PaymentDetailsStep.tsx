import { Button } from '@/components/ui/button';
import { Copy, ArrowLeft, QrCode, Building } from 'lucide-react';
import Image from 'next/image';
import { toast } from 'sonner';

interface PaymentDetailsStepProps {
  paymentMethod: 'qr' | 'bank' | null;
  onNext: () => void;
  onBack: () => void;
}

const PaymentDetailsStep = ({
  paymentMethod,
  onNext,
  onBack,
}: PaymentDetailsStepProps) => {
  console.log('PaymentDetailsStep - paymentMethod:', paymentMethod);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`);
  };

  const bankDetails = {
    bankName: 'Kotak Mahindra Bank',
    accountNumber: '7622004401',
    ifsc: 'KKBK0002875',
    accountName: 'SCANINFOGA SOLUTIONS PRIVATE LIMITED',
    // swiftCode: 'SECBGB2L',
  };

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

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="mb-2 text-lg font-medium text-white">
          {paymentMethod === 'qr' ? 'Scan QR Code' : 'Bank Transfer Details'}
        </h3>
        <p className="text-sm text-gray-400">
          {paymentMethod === 'qr'
            ? 'Use your mobile banking app to scan and pay'
            : 'Use the details below to make your payment'}
        </p>
      </div>

      {paymentMethod === 'qr' ? (
        <div className="space-y-4">
          <div className="flex justify-center">
            <div className="flex h-48 w-48 items-center justify-center rounded-lg bg-white p-4">
              <div className="flex h-full w-full flex-col items-center justify-center rounded bg-gray-900">
                {/* <QrCode className="mb-2 h-16 w-16 text-teal-500" /> */}
                <Image
                  src="/images/scaninfoga_qr.jpeg"
                  alt="qr"
                  height={500}
                  width={200}
                />
                {/* <p className="text-center text-xs text-gray-400">QR Code</p> */}
                {/* <p className="text-xs text-gray-500">₹1,000</p> */}
              </div>
            </div>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-400">
              Scan this QR code with your banking app to pay desired amount
            </p>
          </div>
        </div>
      ) : (
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
                      copyToClipboard(
                        bankDetails.accountNumber,
                        'Account number',
                      )
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
                    onClick={() =>
                      copyToClipboard(bankDetails.ifsc, 'IFSC Code')
                    }
                    className="h-6 w-6 p-0 hover:bg-gray-700"
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center">
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
              {/* 
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">SWIFT Code:</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm text-white">
                    {bankDetails.swiftCode}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      copyToClipboard(bankDetails.swiftCode, 'SWIFT code')
                    }
                    className="h-6 w-6 p-0 hover:bg-gray-700"
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              </div> */}
            </div>
          </div>

          <div className="rounded-lg border border-teal-500/20 bg-teal-500/10 p-3">
            <p className="text-center text-sm text-teal-400">
              <strong>Amount to Pay:</strong> ₹5,000 (Minimum)
            </p>
          </div>
        </div>
      )}

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
